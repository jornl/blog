import { createContext } from "react";

export const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  return (
    <FormContext.Provider value={{}}>
      {children}
    </FormContext.Provider>
  );
};
