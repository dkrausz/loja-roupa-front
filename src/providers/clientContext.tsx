import {createContext, useState} from "react";
import {api} from "../services/api";
import {TCreateClient} from "../components/form/registerClientForm/schema";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {TloginForm} from "../components/modais/loginModal/schema";

interface IClientProviderProps {
  children: React.ReactNode;
}

interface IClientContext {
  clientRegister: (clientData: TCreateClient) => Promise<void>;
  login: (clientData: TloginForm) => Promise<void>;
  activeClient: IClient | null;
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

interface IClient {
  publicId: string;
  name: string;
  email: string;
  CPF: string;
  birthDate: Date;
  phone: string;
  address: IAddress[];
  StroreId: string;
}

type errorAxios = {
  message: string;
};

const Msg = ({status, message}: IToastyMessage) => (
  <div>
    <p>{status}</p>
    <strong>{message}</strong>
  </div>
);

export const ClientContext = createContext({} as IClientContext);

export const ClientContextProvider = ({children}: IClientProviderProps) => {
  const [activeClient, setActiveClient] = useState<IClient | null>(null);
  const navigate = useNavigate();

  const saveLocalStorage = (data: string) => {
    localStorage.setItem("@TOKEN", data);
  };

  const login = async (clientData: TloginForm) => {
    try {
      const {data} = await api.post("/login", clientData);
      console.log(data.client);
      setActiveClient(data.client);
      saveLocalStorage(data.token);
      console.log(activeClient);

      navigate("/");
    } catch (error) {
      const currentError = error as AxiosError<errorAxios>;
      toast.error("Ops!, algo deu errado");
      console.log(currentError);
    }
  };

  const clientRegister = async (clientData: TCreateClient): Promise<void> => {
    const formatedDate = format(clientData.birthDate, "yyyy/MM/dd");

    const formatedCPF = clientData.CPF.replace(/[.-]/g, "");
    const payload = {...clientData, CPF: formatedCPF, birthDate: formatedDate};
    try {
      const {data} = await api.post("/clients", payload);
      toast.success(<Msg status={"Cadastro efetuado com sucesso!"} />, {autoClose: 1500});
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const currentError = error as AxiosError<errorAxios>;
      toast.error(<Msg status={"Ops! Algo deu errado"} message={currentError.response?.data.message} />, {autoClose: 3000});
    }
  };

  //prettier-ignore

  return (
  <ClientContext.Provider value={{clientRegister,login,activeClient}}>
    {children}
  </ClientContext.Provider>
  )
};
