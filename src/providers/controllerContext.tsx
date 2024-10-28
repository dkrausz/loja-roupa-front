import {createContext, useState} from "react";
import {api} from "../services/api";

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
}

export type Product = {
  name: string;
  description: string;
  img: string;
  price: number;
};

export const ControllerContext = createContext({} as IControllerContext);

export const ControllerContextProvider = ({children}: IControllerProviderProps) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [ShowLoginModal, setShowLogintModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const getProducts = async () => {
    const {data} = await api.get("/products");
    console.log(data.data);
    setProductList(data.data);
  };

  //prettier-ignore
  return (
  <ControllerContext.Provider value={{ShowLoginModal,setShowLogintModal,showTemplateModal,setShowTemplateModal,getProducts,productList}}>
    {children}
  </ControllerContext.Provider>
  )
};
