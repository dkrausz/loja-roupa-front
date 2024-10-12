import { createContext } from 'react';

export const userContext = createContext({});

interface IUserProviderProps {
  children: React.ReactNode;
}

//prettier-ignore

export const userContextProvider = ({ children }: IUserProviderProps) => {
  return (
  <userContext.Provider value={{}}>
    {children}
  </userContext.Provider>
  )
};
