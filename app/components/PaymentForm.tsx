import React, { FC, FormEvent, ChangeEvent, useContext, useRef } from "react";
import validator from "validator";
import InputField from "./InputField";
import AppContext, { AppContextType } from "../AppContext";

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
 * PaymentForm component
 *
 * Manages the input and validation of payment information.
 *
 * @param {Object} props - Component props
 * @param {string} props.classes - Additional CSS classes for the form
 * @returns {JSX.Element} The PaymentForm component
 */
const PaymentForm: FC<PaymentFormProps> = ({ classes }) => {
	const context = useContext(AppContext) as AppContextType;
	const errorContext = context.error as PaymentError;
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
		setError,
	} = context;

	// Create refs for each input field
	const cardNumberRef = useRef<HTMLInputElement>(null);
	const expiryRef = useRef<HTMLInputElement>(null);
	const cvvRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const zipRef = useRef<HTMLInputElement>(null);

	/**
	 * Validators for the PaymentForm component.
	 * The cardNumber function uses the isCreditCard method from the validator package to validate the card number.
	 * The expiry function validates the expiry date by checking if the month is between 1 and 12 and the year is greater than the current year.
	 * The cvv function validates the CVV by checking if it is 3 or 4 digits long and contains only numbers.
	 * The name function validates the name by checking if it contains only alphabetic characters.
	 * The zip function validates the zip code by checking if it is a valid US postal code.
	 *
	 * @typedef {Object} PaymentError - The error object for payment form validation.
	 * @property {string} cardNumber - The card number validation error.
	 * @property {string} expiry - The expiry date validation error.
	 * @property {string} cvv - The CVV validation error.
	 * @property {string} name - The name validation error.
	 * @property {string} zip - The ZIP code validation error.
	 *
	 * @typedef {Object} Validators - The validators object for payment form fields.
	 * @property {(value: string) => boolean} cardNumber - The validator for card number field.
	 * @property {(value: string) => boolean} expiry - The validator for expiry date field.
	 * @property {(value: string) => boolean} cvv - The validator for CVV field.
	 * @property {(value: string) => boolean} name - The validator for name field.
	 * @property {(value: string) => boolean} zip - The validator for ZIP code field.
	 *
	 * @type {Validators} validators - The validators object for payment form fields.
	 */
	const validators: Record<keyof PaymentError, (value: string) => boolean> = {
		cardNumber: validator.isCreditCard,
		expiry: (value) => {
			const [month, year] = value.split("/").map((item) => item.trim());
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
				return (
					expiryYear > currentYear ||
					(expiryYear === currentYear && expiryMonth >= currentMonth)
				);
			}
			return false;
		},
		cvv: (value) => {
			const isAmex = cardNumber
				? validator.isCreditCard(cardNumber, { provider: "amex" })
				: false;
			return isAmex
				? validator.isLength(value, { min: 4, max: 4 }) &&
						validator.isNumeric(value)
				: validator.isLength(value, { min: 3, max: 3 }) &&
						validator.isNumeric(value);
		},
		name: (value) => validator.isAlpha(value.replace(/ /g, "")),
		zip: (value) => validator.isPostalCode(value, "US"),
	};

	/**
	 * Handles changes to the input fields and performs validation.
	 *
	 * @param type The type of the input field.
	 * @param value The value of the input field.
	 */
	const handleFieldChange = (
		type: keyof PaymentError,
		value: string,
		nextFieldRef?: React.RefObject<HTMLInputElement>
	): void => {
		let formattedValue = value;

		if (type === "expiry" && value.length === 2) {
			formattedValue = value + "/";
		}

		const setStateFunctions: Record<
			keyof PaymentError,
			React.Dispatch<React.SetStateAction<string | undefined>>
		> = {
			cardNumber: setCardNumber!,
			expiry: setExpiry!,
			cvv: setCvv!,
			name: setName!,
			zip: setZip!,
		};

		setStateFunctions[type](formattedValue);

		const newError = !validators[type](formattedValue);
		setError((prevError) => ({ ...prevError, [type]: newError }));

		// Move focus to the next field if validation passes
		if (!newError && nextFieldRef?.current) {
			nextFieldRef.current.focus();
		}
	};

	/**
	 * Handles key down events for the expiry date field to manage deletion.
	 *
	 * @param e The keyboard event.
	 */
	const handleExpiryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		if (
			(e.key === "Backspace" || e.key === "Delete") &&
			target.selectionStart === 3 &&
			target.value[2] === "/"
		) {
			e.preventDefault();
			setExpiry(target.value.slice(0, 2));
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

		(Object.keys(validators) as Array<keyof PaymentError>).forEach((field) => {
			if (!validators[field](context[field] as string)) {
				newError[field] = true;
			}
		});

		if (Object.keys(newError).length === 0) {
			setError({});
			setEditing?.(false);
		} else {
			setError(newError);
		}
	};

	return (
		<form
			id="PaymentForm"
			onSubmit={handleSubmit}
			className={`space-y-4 ${classes}`}
		>
			<InputField
				id="cardNumber"
				label="Card number"
				value={cardNumber ?? ""}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleFieldChange("cardNumber", e.target.value, expiryRef)
				}
				error={errorContext.cardNumber ?? false}
				ariaLabel="Card number"
				validationFunc={validators.cardNumber}
				ref={cardNumberRef}
			/>
			<div className="flex space-x-4">
				<InputField
					id="expiry"
					classes="flex-1"
					label="Expires (MM/YY)"
					value={expiry ?? ""}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						handleFieldChange("expiry", e.target.value, cvvRef)
					}
					onKeyDown={handleExpiryKeyDown}
					error={errorContext.expiry ?? false}
					ariaLabel="Expiration date"
					validationFunc={validators.expiry}
					ref={expiryRef}
				/>
				<InputField
					id="cvv"
					classes="flex-1"
					label="Security code (CVV)"
					value={cvv ?? ""}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						handleFieldChange("cvv", e.target.value, nameRef)
					}
					error={errorContext.cvv ?? false}
					ariaLabel="CVV"
					validationFunc={validators.cvv}
					ref={cvvRef}
				/>
			</div>
			<InputField
				id="name"
				label="Name on card"
				value={name ?? ""}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleFieldChange("name", e.target.value, zipRef)
				}
				error={errorContext.name ?? false}
				ariaLabel="Name on card"
				validationFunc={validators.name}
				ref={nameRef}
			/>
			<InputField
				id="zip"
				label="Zip code"
				value={zip ?? ""}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleFieldChange("zip", e.target.value)
				}
				error={errorContext.zip ?? false}
				ariaLabel="Zip code"
				validationFunc={validators.zip}
				ref={zipRef}
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
