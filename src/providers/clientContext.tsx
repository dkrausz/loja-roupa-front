import {createContext, useContext, useEffect, useState} from "react";
import {api} from "../services/api";
import {TCreateClient} from "../components/form/registerClientForm/schema";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {TloginForm} from "../components/modais/loginModal/schema";
import {ControllerContext, Product} from "./controllerContext";
import {TUpdateClient} from "../components/form/clientProfileForm/schema";

interface IClientProviderProps {
  children: React.ReactNode;
}

interface IClientContext {
  clientRegister: (clientData: TCreateClient) => Promise<void>;
  login: (clientData: TloginForm) => Promise<void>;
  activeClient: IClient | null;
  selectedAddress: IAddress | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
  logoff: () => void;
  clientUpdate: (clientData: TUpdateClient) => Promise<void>;
  registerAddress: (clientId: string, payload: Partial<IAddress>) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  addToCart: (newProduct: CartProduct) => void;
  // retriveCartOnLocalStorage: () => void;
  updateCart: (id: string, newQuantity: number) => void;
  deleteFromCart: (id: string) => void;
  cartList: CartProduct[];
  clearCart: () => void;
  sendNewOrder: (order: TOrderWithoutProducts) => Promise<void>;
  cartSize: number;
}

export enum paymentType {
  PIX = "PIX",
  CARTAO_CREDITO = "CARTAO_CREDITO",
  BOLETO = "BOLETO",
}

//export type PaymentType = keyof typeof paymentType;

export enum status {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DELIVERED = "DELIVERED",
}

export interface IOrder {
  paymentType: paymentType | null;
  status: status | null;
  discount: boolean;
  total: number;
  products: Product[];
}

export type TOrderWithoutProducts = Omit<IOrder, "products">;

export type CartProduct = Product & {
  quantity: number;
};

interface IToastyMessage {
  status: string;
  message?: string;
}

export interface IAddress {
  id: number;
  street: string;
  number: number;
  complement?: string | null;
  zipCode: string;
  neighborhood: string;
  state: string;
  city: string;
  country: string;
  clientId?: number | null;
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
  const cartLocal = localStorage.getItem("@CART");
  const cartProducts = cartLocal ? JSON.parse(cartLocal) : [];
  const {setShowTemplateModal, setIsLoading} = useContext(ControllerContext);
  const [activeClient, setActiveClient] = useState<IClient | null>(null);
  const [clientToken, setClientToken] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [cartList, setCartList] = useState<Array<CartProduct>>(cartProducts);
  const [cartSize, setCartSize] = useState(0);

  const navigate = useNavigate();

  const saveCartOnLocalStorage = (cartList: CartProduct[]) => {
    const stringCart = JSON.stringify(cartList);
    localStorage.setItem("@CART", stringCart);
  };

  const addToCart = (newProduct: CartProduct) => {
    const found = cartList.find((product) => product.publicId == newProduct.publicId);

    if (found) {
      const newQuantity = found.quantity + newProduct.quantity;
      updateCart(found.publicId, newQuantity);
    } else {
      setCartList(() => {
        return [...cartList, newProduct];
      });
    }
  };

  const updateCart = (id: string, newQuantity: number) => {
    setCartList(cartList.map((product) => (product.publicId === id ? {...product, quantity: newQuantity} : product)));
  };

  const deleteFromCart = (id: string) => {
    setCartList((products) => products.filter((product) => product.publicId != id));
  };

  const clearCart = () => {
    setCartList([]);
  };

  const updateCartSize = () => {
    const value = cartList.reduce((accumulator, item) => accumulator + item.quantity, 0);
    setCartSize(() => {
      return value;
    });
  };

  const sendNewOrder = async (order: TOrderWithoutProducts) => {
    const token = localStorage.getItem("@TOKEN");
    const newOrder: IOrder = {
      paymentType: order.paymentType,
      status: order.status,
      discount: order.discount,
      total: order.total,
      products: cartList,
    };
    if (token) {
      try {
        setIsLoading(true);
        // const {data} = await api.post("/orders", newOrder, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        toast.success(<Msg status={"Pedido efetuado com sucesso!"} />, {autoClose: 1500});
        clearCart();
      } catch (error) {
        const currentError = error as AxiosError<errorAxios>;
        toast.error("Ops!, algo deu errado");
        console.log(currentError);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Você precisa estar logado para efetuar a compra!");
    }
  };

  const login = async (clientData: TloginForm) => {
    try {
      setShowTemplateModal(false);
      setIsLoading(true);
      const {data} = await api.post("/login", clientData);

      setActiveClient(data.client);
      localStorage.setItem("@TOKEN", data.token);
      localStorage.setItem("@CLIENTID", data.client.publicId);
      //  navigate("/");
    } catch (error) {
      const currentError = error as AxiosError<errorAxios>;
      toast.error("Ops!, algo deu errado");
      console.log(currentError);
    } finally {
      setIsLoading(false);
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

  const registerAddress = async (clientId: string, payload: Partial<IAddress>) => {
    try {
      setIsLoading(true);
      await api.post(`/address/${clientId}`, payload);
      setTimeout(() => navigate("/clientProfile"), 2000);
      toast.success(<Msg status={"Cadastro efetuado com sucesso!"} />, {autoClose: 1500});
      autoLogin();
    } catch (error) {
      const currentError = error as AxiosError<errorAxios>;
      console.log(currentError);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAddress = async (id: number): Promise<void> => {
    console.log(activeClient?.address.find((address) => address.id === id));
  };

  const clientRegister = async (clientData: TCreateClient): Promise<void> => {
    const formatedDate = format(clientData.birthDate, "yyyy/MM/dd");

    const formatedCPF = clientData.CPF.replace(/[.-]/g, "");
    const payload = {...clientData, CPF: formatedCPF, birthDate: formatedDate};
    try {
      setIsLoading(true);
      const {data} = await api.post("/clients", payload);

      registerAddress(data.publicId, payload.address);
      //setTimeout(() => navigate("/"), 2000);
    } catch (error2) {
      const currentError2 = error2 as AxiosError<errorAxios>;
      console.log(currentError2.response?.data.message);
      console.log(currentError2.response?.data.errors);
      toast.error(
        <Msg
          status={"Ops! Algo deu errado"}
          message={
            currentError2.response?.data.message
              ? currentError2.response.data.message
              : currentError2.response?.data.errors
                ? currentError2.response?.data.errors[0]
                : ""
          }
        />,
        {autoClose: 3000},
      );
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);
      const {data} = await api.patch(`/clients/${activeClient?.publicId}`, payload, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      });

      toast.success(<Msg status={"Cadastro atualizado com sucesso!"} />, {autoClose: 1500});
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
    } finally {
      setIsLoading(false);
    }
  };

  const autoLogin = async () => {
    const token = localStorage.getItem("@TOKEN");
    const id = localStorage.getItem("@CLIENTID");

    if (token) {
      setClientToken(token);

      try {
        const {data} = await api.get(`clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setActiveClient(data);

        // navigate("/");
      } catch (error) {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@CLIENTID");
      }
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  useEffect(() => {
    updateCartSize();
    saveCartOnLocalStorage(cartList);
  }, [cartList]);

  //prettier-ignore

  return (
    <ClientContext.Provider
      value={{clientRegister, login, activeClient, logoff, clientUpdate, registerAddress, 
      selectedAddress, setSelectedAddress, deleteAddress, addToCart,updateCart,deleteFromCart,cartList,
      clearCart,sendNewOrder,cartSize}}>
      {children}
    </ClientContext.Provider>
  );
};
