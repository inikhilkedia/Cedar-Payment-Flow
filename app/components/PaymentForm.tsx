import React, { FC, FormEvent, ChangeEvent, useContext } from "react";
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

	/**
	 * Validators for each field in the form to ensure valid input data is entered by the user before submission of the form data to the server. The validators object is a record with the field name as the key and a function that takes a string value and returns a boolean value as the value. The function uses the validator library to validate the input data. The cardNumber field is validated using the isCreditCard method, the expiry field is validated using a custom function that checks if the input data is in the format MM/YY and if the expiry date is in the future, the cvv field is validated using a custom function that checks if the input data is a numeric value with a length of 3 or 4, the name field is validated using a custom function that checks if the input data is an alphabetic value with no spaces, and the zip field is validated using the isPostalCode method with the country code "US". The handleFieldChange function is used to update the state of the form fields and check if the input data is valid using the validators object. The handleExpiryKeyDown function is used to handle the keydown event for the expiry field and remove the "/" character when the user presses the backspace or delete key. The handleSubmit function is used to validate all the form fields and set the error state if any of the fields are invalid. If all the fields are valid, the error state is set to an empty object and the editing state is set to false to indicate that the form data is ready for submission to the server. The form component renders the input fields for the card number, expiry date, cvv, name, and zip code, and a submit button to continue to the next step in the payment process. The input fields are wrapped in a form element with the onSubmit event handler set to the handleSubmit function and the additional CSS classes passed as props to the component. The input fields are rendered using the InputField component with the appropriate props for the label, value, onChange, error, ariaLabel, and validationFunc. The submit button is rendered with the text "Continue" and a click event handler to submit the form data. The PaymentForm component returns the form element with the input fields and submit button. The PaymentForm component is used in the Payment component to render the payment form for the user to enter their payment information.
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
		cvv: (value) =>
			validator.isLength(value, { min: 3, max: 4 }) &&
			validator.isNumeric(value),
		name: (value) => validator.isAlpha(value.replace(/ /g, "")),
		zip: (value) => validator.isPostalCode(value, "US"),
	};

	/**
	 * Handles changes to the input fields and performs validation.
	 *
	 * @param type The type of the input field.
	 * @param value The value of the input field.
	 */
	const handleFieldChange = (type: keyof PaymentError, value: string): void => {
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
					handleFieldChange("cardNumber", e.target.value)
				}
				error={errorContext.cardNumber ?? false}
				ariaLabel="Card number"
				validationFunc={validators.cardNumber}
			/>
			<div className="flex space-x-4">
				<InputField
					id="expiry"
					classes="flex-1"
					label="Expires (MM/YY)"
					value={expiry ?? ""}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						handleFieldChange("expiry", e.target.value)
					}
					onKeyDown={handleExpiryKeyDown}
					error={errorContext.expiry ?? false}
					ariaLabel="Expiration date"
					validationFunc={validators.expiry}
				/>
				<InputField
					id="cvv"
					classes="flex-1"
					label="Security code (CVV)"
					value={cvv ?? ""}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						handleFieldChange("cvv", e.target.value)
					}
					error={errorContext.cvv ?? false}
					ariaLabel="CVV"
					validationFunc={validators.cvv}
				/>
			</div>
			<InputField
				id="name"
				label="Name on card"
				value={name ?? ""}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleFieldChange("name", e.target.value)
				}
				error={errorContext.name ?? false}
				ariaLabel="Name on card"
				validationFunc={validators.name}
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
