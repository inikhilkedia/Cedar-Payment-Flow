import React, { FC, useState, FormEvent, ChangeEvent, useContext } from "react";
import validator from "validator";
import InputField from "./InputField";
import AppContext from "../AppContext";

interface PaymentFormProps {
  classes: string;
}

interface PaymentError {
  cardNumber?: boolean;
  expiry?: boolean;
  cvv?: boolean;
  name?: boolean;
  zip?: boolean;
}

/**
 *
 * @param number
 * @returns boolean value indicating if the card number is valid or not valid based on the Luhn algorithm and the card type (Visa, MasterCard, etc.) and the length of the card number (13-19 digits) and the card number pattern (e.g., 4[0-9]{12}(?:[0-9]{3})? for Visa, 5[1-5][0-9]{14} for MasterCard, etc.) and the card number checksum. The card number is valid if it passes all these checks. The card number is invalid if it fails any of these checks. The card number is required. The card number is invalid if it is not a valid credit card number. The card number is invalid if it is not a valid credit card number.
 */
const validateCardNumber = (number: string): boolean => {
  return validator.isCreditCard(number);
};

/**
 *
 * @param expiry
 * @returns boolean value indicating if the expiry date is valid or not valid based on the month and year of the expiry date. The expiry date is valid if it is in the future. The expiry date is invalid if it is in the past. The expiry date is required. The expiry date is invalid if it is not a valid expiry date. The expiry date is invalid if it is not a valid expiry date.
 */
const validateExpiry = (expiry: string): boolean => {
  const [month, year] = expiry.split("/").map((item) => item.trim());
  if (
    month &&
    year &&
    validator.isInt(month, { min: 1, max: 12 }) &&
    validator.isInt(year, { min: 0 })
  ) {
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expiryYear = parseInt(year, 10);
    const expiryMonth = parseInt(month, 10);
    if (
      expiryYear > currentYear ||
      (expiryYear === currentYear && expiryMonth >= currentMonth)
    ) {
      return true;
    }
  }
  return false;
};

/**
 *
 * @param cvv
 * @returns boolean value indicating if the CVV is valid or not valid based on the length of the CVV (3-4 digits) and the CVV pattern (e.g., [0-9]{3,4}). The CVV is valid if it passes all these checks. The CVV is invalid if it fails any of these checks. The CVV is required. The CVV is invalid if it is not a valid CVV. The CVV is invalid if it is not a valid CVV.
 */
const validateCvv = (cvv: string): boolean => {
  return (
    validator.isLength(cvv, { min: 3, max: 4 }) && validator.isNumeric(cvv)
  );
};

/**
 *
 * @param name
 * @returns boolean value indicating if the name is valid or not valid based on the name pattern (e.g., [a-zA-Z ]+). The name is valid if it passes all these checks. The name is invalid if it fails any of these checks. The name is required. The name is invalid if it is not a valid name. The name is invalid if it is not a valid name.
 */
const validateName = (name: string): boolean => {
  return validator.isAlpha(name.replace(/ /g, ""));
};

/**
 *
 * @param zip
 * @returns boolean value indicating if the ZIP code is valid or not valid based on the ZIP code pattern (e.g., [0-9]{5}). The ZIP code is valid if it passes all these checks. The ZIP code is invalid if it fails any of these checks. The ZIP code is required. The ZIP code is invalid if it is not a valid ZIP code. The ZIP code is invalid if it is not a valid ZIP code.
 */
const validateZip = (zip: string): boolean => {
  return validator.isPostalCode(zip, "US");
};

/**
 * PaymentForm component
 *
 * Manages the input and validation of payment information.
 *
 * @param {Object} props - Component props
 * @param {string} props.classes - Additional CSS classes for the form
 * @returns {JSX.Element} The PaymentForm component
 */
const PaymentForm: FC<PaymentFormProps> = ({ classes }) => {
  const context = useContext(AppContext);
  const {
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
    setEditing,
  } = context;
  /**
   *	@type {AppContextType}
   */
  const [error, setError] = useState<PaymentError>({}); // error state

  /**
   * Handles changes to the input fields and performs validation.
   *
   * @param type The type of the input field.
   * @param value The value of the input field.
   */
  const handleFieldChange = (type: string, value: string): void => {
    const newError: PaymentError = {};
    let formattedValue = value;

    switch (type) {
      case "cardNumber":
        setCardNumber?.(value);
        if (!validateCardNumber(value)) {
          newError.cardNumber = true;
        }
        setError({ ...newError, cardNumber: newError.cardNumber });
        break;
      case "expiry":
        if (value.length === 2) {
          formattedValue = value + "/";
        }
        setExpiry(formattedValue);
        break;
      case "cvv":
        setCvv?.(value);
        if (!validateCvv(value)) {
          newError.cvv = true;
        }
        setError({ ...error, cvv: newError.cvv });
        break;
      case "name":
        setName?.(value);
        if (!validateName(value)) {
          newError.name = true;
        }
        setError({ ...error, name: newError.name });
        break;
      case "zip":
        setZip?.(value);
        if (!validateZip(value)) {
          newError.zip = true;
        }
        setError({ ...error, zip: newError.zip });
        break;
      default:
        break;
    }
  };

  /**
   * Handles key down events for the expiry date field to manage deletion.
   *
   * @param e The keyboard event.
   */
  const handleExpiryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Backspace" || e.key === "Delete") {
      const { selectionStart, value } = target;
      if (selectionStart === 3 && value[2] === "/") {
        e.preventDefault();
        setExpiry(value.slice(0, 2));
      }
    }
  };

  /**
   * Handles form submission and performs final validation.
   *
   * @param event The form submission event.
   */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newError: PaymentError = {};
    if (!validateCardNumber(cardNumber!)) {
      newError.cardNumber = true;
    }
    if (!validateExpiry(expiry!)) {
      newError.expiry = true;
    }
    if (!validateCvv(cvv!)) {
      newError.cvv = true;
    }
    if (!validateName(name!)) {
      newError.name = true;
    }
    if (!validateZip(zip!)) {
      newError.zip = true;
    }
    if (Object.keys(newError).length === 0) {
      setError({});
      setEditing(false);
    } else {
      setError(newError);
    }
  };

  return (
    <form
      id="PaymentForm"
      onSubmit={handleSubmit}
      className={`space-y-4 ${classes!}`}
    >
      <InputField
        id="cardNumber"
        label="Card number"
        value={cardNumber!}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFieldChange("cardNumber", e.target.value)
        }
        error={error.cardNumber!}
        ariaLabel="Card number"
        validationFunc={validateCardNumber}
      />
      <div className="flex space-x-4">
        <InputField
          id="expiry"
          classes="flex-1"
          label="Expires (MM/YY)"
          value={expiry!}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFieldChange("expiry", e.target.value)
          }
          onKeyDown={handleExpiryKeyDown}
          error={error.expiry!}
          ariaLabel="Expiration date"
          validationFunc={validateExpiry}
        />
        <InputField
          id="cvv"
          classes="flex-1"
          label="Security code (CVV)"
          value={cvv!}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFieldChange("cvv", e.target.value)
          }
          error={error.cvv!}
          ariaLabel="CVV"
          validationFunc={validateCvv}
        />
      </div>
      <InputField
        id="name"
        label="Name on card"
        value={name!}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFieldChange("name", e.target.value)
        }
        error={error.name!}
        ariaLabel="Name on card"
        validationFunc={validateName}
      />
      <InputField
        id="zip"
        label="Zip code"
        value={zip!}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFieldChange("zip", e.target.value)
        }
        error={error.zip!}
        ariaLabel="Zip code"
        validationFunc={validateZip}
      />
      <button
        type="submit"
        className="mt-8 w-full rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Continue
      </button>
    </form>
  );
};

export default PaymentForm;
