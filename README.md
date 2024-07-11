
# Cedar Payment Flow Take Home Assignment


Made with Next.js, Typescript, TailWind CSS & Validator API

Test the app with these. [Test Credit Card Numbers](https://www.paypalobjects.com/en_GB/vhelp/paypalmanager_help/credit_card_numbers.htm)

Screenshot Legend:

- lg: 1024px
- md: 768px
- xs: 375px
  

## layout(/app/layout.tsx)

  

The layout.tsx file is responsible for setting up the root layout of your Next.js application. This component defines the global metadata, applies global styles, and wraps the application with AppProvider.

  

## Layout Component(/app/components/Layout.tsx)

  

The Layout.tsx file defines a common layout component that can be used across various parts of your Next.js application. This component sets up a consistent structure with a header and a main content area.

  

## Welcome Page (/app/Welcome/page.tsx)

  

The Page file is a client-side component responsible for displaying a welcome message and payment summary to the user. It uses the context provided by AppContext to manage state and actions within the application.

  

### Functionality

  

- The Welcome component displays a welcome message, a summary of medical bills, and a “Pay total” button.

- It utilizes the context from AppContext to access the amount, setEditing, and setStage functions.

  

### Context

  

- useContext(AppContext): Accesses the context provided by AppContext.

- amount: The total amount due, displayed to the user.

- setEditing: Function to set the editing state.

- setStage: Function to set the current stage of the process.

  

## PayAndReview Page (/app/PayAndReview/page.tsx)

  

The Page file is a client-side component responsible for handling the payment and review process. This component utilizes context to manage state and actions, provides a payment form, and allows users to review their payment information.

  

### Context

  

- useContext(AppContext): Accesses the context provided by AppContext.

- amount: The total amount to be paid.

- cardNumber: The card number used for payment.

- editing: Boolean value indicating whether the payment information is being edited.

- setEditing: Function to set the editing state.

- setStage: Function to set the current stage of the process.

  

### State

  

- paymentFormClass: CSS class for the payment form based on the editing state.

- reviewFragmentClass: CSS class for the review fragment based on the editing state.

  

### Event Handlers

  

- useEffect: Updates the CSS classes for the payment form and review fragment based on the editing state.

- handleContinue: This function is not used directly in this component but is included for completeness.

  

## PayAndReview Page (/app/PayAndReview/page.tsx)

  

The page file is a client-side component responsible for handling the payment and review process. This component utilizes context to manage state and actions, provides a payment form, and allows users to review their payment information.

  

### Context

  

- useContext(AppContext): Accesses the context provided by AppContext.

- amount: The total amount to be paid.

- cardNumber: The card number used for payment.

- editing: Boolean value indicating whether the payment information is being edited.

- setEditing: Function to set the editing state.

- setStage: Function to set the current stage of the process.

  

### State

  

- paymentFormClass: CSS class for the payment form based on the editing state.

- reviewFragmentClass: CSS class for the review fragment based on the editing state.

  

### Event Handlers

  

- useEffect: Updates the CSS classes for the payment form and review fragment based on the editing state.

  

## Components (/app/components)

  

### Icons Component (/app/components/Icons.tsx)

  

The Icons component is a versatile React component that displays different types of icons based on the provided type prop. It can render error, success, and credit card icons.

### ErrorText Componenet(/app/components/ErrorText.tsx)

The ErrorText component is a React functional component that displays error messages based on the provided type and id props. It is designed to show specific error messages for different form fields.

  

### InputField Component (/app/components/InputField.tsx)

  

The InputField.tsx file is a versatile input field component that can display error or success icons based on the validation state. It also provides appropriate error messages for invalid or empty input.

  

#### Properties

  

- id: A unique identifier for the input field.

- classes: Optional additional CSS classes for the input field.

- label: The label text for the input field.

- value: The current value of the input field.

- onChange: A function to handle changes to the input field.

- onKeyDown: Optional function to handle key down events in the input field.

- error: Boolean indicating whether there is an error with the input field.

- ariaLabel: The ARIA label for accessibility.

- validationFunc: A function to validate the input value.

  

#### Structure

  

- handleInvalidErrorText: A helper function to return appropriate error messages based on the input field ID.

- InputField: The main input field component.

  

### PaymentForm Component (/app/components/PaymentForm.tsx)

  

The PaymentForm component is a React functional component that manages the input and validation of payment information. It uses the validator library to validate various form fields such as card number, expiry date, CVV, name, and ZIP code.

  

#### Validation Logic

  

The PaymentForm component includes validation logic for various fields:

  

•  **Card Number:** Validated using validator.isCreditCard.

•  **Expiry Date:** Validated using a custom function to check the format MM/YY and ensure the date is in the future.

•  **CVV:** Validated using a custom function to check if it is a numeric value with a length of 3 or 4.

•  **Name:** Validated using a custom function to check if it is an alphabetic value with no spaces.

•  **ZIP Code:** Validated using validator.isPostalCode with the country code “US”.

  

#### Event Handlers

  

- handleFieldChange: Handles changes to the input fields and performs validation.

- handleExpiryKeyDown: Handles key down events for the expiry date field to manage deletion.

- handleSubmit: Handles form submission and performs final validation.

  

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

  

## Getting Started

  

First, run the development server:

  

```bash

npm  run  next

# or

yarn  next

# or

pnpm  next

# or

bun  next

```

  

Open [http://localhost:3000/cedar-payment-flow](http://localhost:3000/cedar-payment-flow) with your browser to see the result.

  

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

  

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
