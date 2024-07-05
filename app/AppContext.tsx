import { createContext } from "react";

interface AppContextType {
  stage: string | null;
  setStage: React.Dispatch<React.SetStateAction<string>> | null;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>> | null;
  cardNumber: string | null;
  setCardNumber: React.Dispatch<React.SetStateAction<string>> | null;
  expiry: string | null;
  setExpiry: React.Dispatch<React.SetStateAction<string>>;
  cvv: string | null;
  setCvv: React.Dispatch<React.SetStateAction<string>> | null;
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string>> | null;
  zip: string | null;
  setZip: React.Dispatch<React.SetStateAction<string>> | null;
  editing: boolean | null;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: AppContextType = {
  stage: "welcome", //  "payinfo" | "reviewpay" | "thankyou"
  setStage: null,
  amount: 600.0,
  setAmount: null,
  cardNumber: null,
  setCardNumber: null,
  expiry: null,
  setExpiry: () => {},
  cvv: null,
  setCvv: null,
  name: null,
  setName: null,
  zip: null,
  setZip: null,
  editing: false,
  setEditing: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export default AppContext;
