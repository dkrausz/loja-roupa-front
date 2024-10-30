import {createContext, useContext, useEffect, useState} from "react";
import {api} from "../services/api";
import {TCreateClient} from "../components/form/registerClientForm/schema";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {TloginForm} from "../components/modais/loginModal/schema";
import {ControllerContext} from "./controllerContext";
import {TUpdateClient} from "../components/form/clientProfileForm/schema";

interface IClientProviderProps {
  children: React.ReactNode;
}

interface IClientContext {
  clientRegister: (clientData: TCreateClient) => Promise<void>;
  login: (clientData: TloginForm) => Promise<void>;
  activeClient: IClient | null;
  logoff: () => void;
  clientUpdate: (clientData: TUpdateClient) => Promise<void>;
}

interface IToastyMessage {
  status: string;
  message?: string;
}

interface IAddress {
  id: number;
  street: string;
  number: number;
  complement: string;
  zipCode: string;
  neighborhood: string;
  state: string;
  city: string;
  country: string;
  clientId: number;
}

export interface IClient {
  publicId: string;
  name: string;
  email: string;
  CPF: string;
  birthDate: Date;
  phone: string;
  address: IAddress[];
  StroreId: string;
}

export type TClient = IClient;

type errorAxios = {
  message?: string;
  errors?: string[];
};

const Msg = ({status, message}: IToastyMessage) => (
  <div>
    <p>{status}</p>
    <strong>{message}</strong>
  </div>
);

export const ClientContext = createContext({} as IClientContext);

export const ClientContextProvider = ({children}: IClientProviderProps) => {
  const {setShowTemplateModal} = useContext(ControllerContext);
  const [activeClient, setActiveClient] = useState<IClient | null>(null);
  const [clientToken, setClientToken] = useState("");
  const navigate = useNavigate();

  const login = async (clientData: TloginForm) => {
    try {
      const {data} = await api.post("/login", clientData);
      console.log(data.client);
      setActiveClient(data.client);
      localStorage.setItem("@TOKEN", data.token);
      localStorage.setItem("@CLIENTID", data.client.publicId);
      console.log(activeClient);
      setShowTemplateModal(false);
      const clientId = data.client.publicId;
      console.log(clientId);

      navigate("/");
    } catch (error) {
      const currentError = error as AxiosError<errorAxios>;
      toast.error("Ops!, algo deu errado");
      console.log(currentError);
    }
  };
  const logoff = () => {
    setActiveClient(null);
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@CLIENTID");
    setClientToken("");
    navigate("/");
    setShowTemplateModal(false);
  };

  const clientRegister = async (clientData: TCreateClient): Promise<void> => {
    const formatedDate = format(clientData.birthDate, "yyyy/MM/dd");

    const formatedCPF = clientData.CPF.replace(/[.-]/g, "");
    const payload = {...clientData, CPF: formatedCPF, birthDate: formatedDate};
    try {
      console.log(payload);
      const {data} = await api.post("/clients", payload);
      toast.success(<Msg status={"Cadastro efetuado com sucesso!"} />, {autoClose: 1500});
      console.log(data);

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const currentError = error as AxiosError<errorAxios>;
      console.log(currentError.response?.data.message);
      console.log(currentError.response?.data.errors);
      toast.error(
        <Msg
          status={"Ops! Algo deu errado"}
          message={
            currentError.response?.data.message
              ? currentError.response.data.message
              : currentError.response?.data.errors
                ? currentError.response?.data.errors[0]
                : ""
          }
        />,
        {autoClose: 3000},
      );
    }
  };

  const clientUpdate = async (clientData: TUpdateClient): Promise<void> => {
    let formatedDate;
    if (clientData.birthDate) {
      formatedDate = format(clientData?.birthDate, "yyyy/MM/dd");
    }

    const formatedCPF = clientData.CPF?.replace(/[.-]/g, "");
    const payload = {...clientData, CPF: formatedCPF, birthDate: formatedDate};
    try {
      console.log(payload);
      const {data} = await api.patch(`/clients/${activeClient?.publicId}`, payload, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      });

      toast.success(<Msg status={"Cadastro atualizado com sucesso!"} />, {autoClose: 1500});

      console.log(data);

      setTimeout(() => navigate("/"), 2000);
      autoLogin();
    } catch (error) {
      const currentError = error as AxiosError<errorAxios>;
      console.log(currentError.response?.data.message);
      console.log(currentError.response?.data.errors);
      toast.error(
        <Msg
          status={"Ops! Algo deu errado"}
          message={
            currentError.response?.data.message
              ? currentError.response.data.message
              : currentError.response?.data.errors
                ? currentError.response?.data.errors[0]
                : ""
          }
        />,
        {autoClose: 3000},
      );
    }
  };

  const autoLogin = async () => {
    const token = localStorage.getItem("@TOKEN");
    const id = localStorage.getItem("@CLIENTID");
    if (token) {
      setClientToken(token);
      console.log("autologin");

      try {
        const {data} = await api.get(`clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setActiveClient(data);

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);
  //prettier-ignore

  return (
  <ClientContext.Provider value={{clientRegister,login,activeClient,logoff,clientUpdate}}>
    {children}
  </ClientContext.Provider>
  )
};
