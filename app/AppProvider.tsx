"use client";

import React, { useState } from "react";
import AppContext from "./AppContext";

interface AppProviderProps {
  children: React.ReactNode;
}

interface PaymentError {
  cardNumber?: boolean;
  expiry?: boolean;
  cvv?: boolean;
  name?: boolean;
  zip?: boolean;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [stage, setStage] = useState<string>("welcome");
  const [amount, setAmount] = useState<number>(600.0);
  const [cardNumber, setCardNumber] = useState<string | undefined>("");
  const [expiry, setExpiry] = useState<string | undefined>("");
  const [cvv, setCvv] = useState<string | undefined>("");
  const [name, setName] = useState<string | undefined>("");
  const [zip, setZip] = useState<string | undefined>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [error, setError] = useState<PaymentError>({});

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
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
