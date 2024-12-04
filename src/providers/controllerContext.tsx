import {createContext, useState} from "react";
import {api} from "../services/api";
import {AxiosError} from "axios";

// {
//   "publicId": "dd40d8d0-1ba9-4c59-9181-a5c960f38cf6",
//   "name": "Mega Store",
//   "CNPJ": "41984004000139",
//   "address": {
//     "street": "Av Paulista",
//     "number": 3258,
//     "complement": "4 andar",
//     "zipCode": "04710-000",
//     "neighborhood": "cerqueira cesar",
//     "state": "Sao Paulo",
//     "city": "Sao Paulo",
//     "country": "Brasil"
//   }
// }

interface IControllerProviderProps {
  children: React.ReactNode;
}

interface IControllerContext {
  ShowLoginModal: boolean;
  setShowLogintModal: React.Dispatch<React.SetStateAction<boolean>>;
  showTemplateModal: boolean;
  setShowTemplateModal: React.Dispatch<React.SetStateAction<boolean>>;
  getProducts: (page: number, perPage: number, productName?: string) => Promise<Product[]>;
  productList: Product[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getProductById: (id: string) => Promise<Product | null>;
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

  const getProducts = async (page: number, perPage: number, productName?: string) => {
    const route = `/products?page=${page}&perPage=${perPage}${productName ? `&searchProduct=${productName}` : ""}`;

    try {
      setIsLoading(true);
      const {data} = await api.get(route);

      setProductList(data.data);
      return data.data;
    } catch (error) {
      const currentError = error as AxiosError<errorType>;
      console.log(currentError);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      setIsLoading(true);
      const {data} = await api.get(`products/${id}`);

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
