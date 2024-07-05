"use client";

import AppContext from "./AppContext";
import { useState } from "react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [stage, setStage] = useState<string>("welcome");
  const [amount, setAmount] = useState<number>(600.0);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [editing, setEditing] = useState(false);

  return (
    <AppContext.Provider
      value={{
        stage,
        setStage,
        amount,
        setAmount,
        cardNumber,
        setCardNumber,
        expiry,
        setExpiry,
        cvv,
        setCvv,
        name,
        setName,
        zip,
        setZip,
        editing,
        setEditing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
