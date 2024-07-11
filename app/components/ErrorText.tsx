import React, { FC } from "react";

interface ErrorTextProps {
  type: "invalid" | "empty";
  id?: string;
}

const invalidErrorTexts: Record<string, string> = {
  cardNumber: "Invalid card number.",
  expiry: "Invalid expiry date.",
  cvv: "Invalid CVV.",
  zip: "Invalid ZIP code.",
};

const ErrorText: FC<ErrorTextProps> = ({ type, id }) => {
  return (
    <span className="mt-2 block text-custom-error-red">
      {type === "invalid" && invalidErrorTexts[id!]}
      {type === "empty" && "This field is required."}
    </span>
  );
};

export default ErrorText;
