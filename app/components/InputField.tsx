import React, { ChangeEvent, FC } from "react";
import ErrorIcon from "./ErrorIcon";
import SuccessIcon from "./SuccessIcon";

interface InputFieldProps {
  id: string;
  classes?: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error: boolean;
  ariaLabel: string;
  validationFunc: (value: string) => boolean;
}

const handleInvalidErrorText = (id: string) => {
  switch (id) {
    case "cardNumber":
      return "Invalid card number.";
    case "expiry":
      return "Invalid expiry date.";
    case "cvv":
      return "Invalid CVV.";
    case "zip":
      return "Invalid ZIP code.";
  }
};

interface ErrorTextProps {
  type: string;
  id?: string;
}

const ErrorText: FC<ErrorTextProps> = ({ type, id }) => {
  return (
    <span className="error-text text-custom-error-red">
      {type === "invalid" && handleInvalidErrorText(id!)}
      {type === "empty" && "This field is required."}
    </span>
  );
};

const InputField: FC<InputFieldProps> = ({
  id,
  classes,
  label,
  value,
  onChange,
  onKeyDown,
  error,
  ariaLabel,
  validationFunc,
}) => {
  return (
    <div className={`form-group ${classes}`}>
      <label
        htmlFor={id}
        className="mb-1 block font-bold text-gray-700 max-[385px]:text-sm"
      >
        {label}
      </label>
      <div className="input-wrapper">
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className={`w-full rounded border px-3 py-2 text-custom-dark ${
            error ? "border-custom-error-red" : "border-custom-medium-gray"
          }`}
          aria-label={ariaLabel}
        />
        {error ? <ErrorIcon /> : validationFunc(value) ? <SuccessIcon /> : null}
      </div>
      {value.length && error ? (
        <ErrorText type="invalid" id={id} />
      ) : value.length === 0 && error ? (
        <ErrorText type="empty" id={id} />
      ) : null}
    </div>
  );
};

export default InputField;
