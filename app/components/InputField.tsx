import React, { ChangeEvent, FC } from "react";
import ErrorText from "./ErrorText";
import Icons from "./Icons";
import { getCardType } from "../utils/cardType";

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

const InputField: FC<InputFieldProps> = ({
  id,
  classes = "",
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
      <div className="relative flex items-center">
        {id === "cardNumber" && (
          <span className="absolute left-3 flex items-center">
            <Icons type="card" cardType={getCardType?.(value ?? "")} />
          </span>
        )}
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className={`w-full rounded border px-3 py-2 text-custom-dark ${
            error ? "border-custom-error-red" : "border-custom-medium-gray"
          } ${id === "cardNumber" ? "pl-12" : ""} pr-10`}
          aria-label={ariaLabel}
        />
        <span className="absolute right-3 flex items-center">
          {error ? (
            <Icons type="error" />
          ) : validationFunc(value) ? (
            <Icons type="success" />
          ) : null}
        </span>
      </div>
      {value.length > 0 && error ? (
        <ErrorText type="invalid" id={id} />
      ) : value.length === 0 && error ? (
        <ErrorText type="empty" id={id} />
      ) : null}
    </div>
  );
};

export default InputField;
