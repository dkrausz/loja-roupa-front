import {createContext, useState} from "react";
import {api} from "../services/api";
import {AxiosError} from "axios";

interface IControllerProviderProps {
  children: React.ReactNode;
}

interface IControllerContext {
  ShowLoginModal: boolean;
  setShowLogintModal: React.Dispatch<React.SetStateAction<boolean>>;
  showTemplateModal: boolean;
  setShowTemplateModal: React.Dispatch<React.SetStateAction<boolean>>;
  getProducts: () => Promise<void>;
  productList: Product[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getProductById: (id: string) => Promise<Product>;
}

export type Product = {
  publicId: string;
  name: string;
  description: string;
  img: string;
  price: number;
};

type errorType = {
  message?: string;
};

export const ControllerContext = createContext({} as IControllerContext);

export const ControllerContextProvider = ({children}: IControllerProviderProps) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [ShowLoginModal, setShowLogintModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    const {data} = await api.get("/products");

    setProductList(data.data);
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      setIsLoading(true);
      const {data} = await api.get(`products/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      const currentError = error as AxiosError<errorType>;
      console.log(currentError);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  //prettier-ignore
  return (
  <ControllerContext.Provider value={{ShowLoginModal,setShowLogintModal,showTemplateModal,setShowTemplateModal,getProducts,productList,isLoading,setIsLoading,getProductById}}>
    {children}
  </ControllerContext.Provider>
  )
};
