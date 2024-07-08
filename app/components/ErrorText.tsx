import React, { FC } from "react";

interface ErrorTextProps {
  type: "invalid" | "empty";
  id?: string;
}

const handleInvalidErrorText = (id: string): string => {
  switch (id) {
    case "cardNumber":
      return "Invalid card number.";
    case "expiry":
      return "Invalid expiry date.";
    case "cvv":
      return "Invalid CVV.";
    case "zip":
      return "Invalid ZIP code.";
    default:
      return "Invalid input.";
  }
};

const ErrorText: FC<ErrorTextProps> = ({ type, id }) => {
  return (
    <span className="mt-2 block text-custom-error-red">
      {type === "invalid" && handleInvalidErrorText(id!)}
      {type === "empty" && "This field is required."}
    </span>
  );
};

export default ErrorText;
