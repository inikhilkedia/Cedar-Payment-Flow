# Cedar Payment Flow Take Home Assignment

Made with Next.js, Typescript, TailWind CSS & Validator API

## layout(/app/layout.tsx)

The layout.tsx file is responsible for setting up the root layout of your Next.js application. This component defines the global metadata, applies global styles, and wraps the application with AppProvider.

## Layout Component(/app/components/Layout.tsx)

The Layout.tsx file defines a common layout component that can be used across various parts of your Next.js application. This component sets up a consistent structure with a header and a main content area.

## Welcome Page (/app/Welcome/page.tsx)

The Page file is a client-side component responsible for displaying a welcome message and payment summary to the user. It uses the context provided by AppContext to manage state and actions within the application.

#### Functionality

- The Welcome component displays a welcome message, a summary of medical bills, and a “Pay total” button.
- It utilizes the context from AppContext to access the amount, setEditing, and setStage functions.

#### Context

- useContext(AppContext): Accesses the context provided by AppContext.
- amount: The total amount due, displayed to the user.
- setEditing: Function to set the editing state.
- setStage: Function to set the current stage of the process.

## PayAndReview Page (/app/PayAndReview/page.tsx)

The Page file is a client-side component responsible for handling the payment and review process. This component utilizes context to manage state and actions, provides a payment form, and allows users to review their payment information.

#### Context

- useContext(AppContext): Accesses the context provided by AppContext.
- amount: The total amount to be paid.
- cardNumber: The card number used for payment.
- editing: Boolean value indicating whether the payment information is being edited.
- setEditing: Function to set the editing state.
- setStage: Function to set the current stage of the process.

#### State

- paymentFormClass: CSS class for the payment form based on the editing state.
- reviewFragmentClass: CSS class for the review fragment based on the editing state.

#### Event Handlers

- useEffect: Updates the CSS classes for the payment form and review fragment based on the editing state.
- handleContinue: This function is not used directly in this component but is included for completeness.

## PayAndReview Page (/app/PayAndReview/page.tsx)

The page file is a client-side component responsible for handling the payment and review process. This component utilizes context to manage state and actions, provides a payment form, and allows users to review their payment information.

#### Context

- useContext(AppContext): Accesses the context provided by AppContext.
- amount: The total amount to be paid.
- cardNumber: The card number used for payment.
- editing: Boolean value indicating whether the payment information is being edited.
- setEditing: Function to set the editing state.
- setStage: Function to set the current stage of the process.

#### State

- paymentFormClass: CSS class for the payment form based on the editing state.
- reviewFragmentClass: CSS class for the review fragment based on the editing state.

#### Event Handlers

- useEffect: Updates the CSS classes for the payment form and review fragment based on the editing state.

## Components (/app/components)

### CardIcon Component (/app/components/CardIcon.tsx)

The CardIcon.tsx file is a component responsible for displaying the appropriate credit card icon based on the card type. This component uses the next/image component for optimized image handling.

### ErrorIcon Component (/app/components/ErrorIcon.tsx)

The ErrorIcon.tsx file is a component responsible for displaying an error icon using an SVG. This component uses Tailwind CSS for styling.

### SuccessIcon Component (/app/components/SuccessIcon.tsx)

The SuccessIcon.tsx file is a component responsible for displaying a success icon using an SVG. This component uses Tailwind CSS for styling.

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
- ErrorText: A component that displays error messages.
- InputField: The main input field component.

### PaymentForm Component (/app/components/PaymentForm.tsx)

The PaymentForm.tsx file is a component responsible for handling the input and validation of payment information. It includes various input fields for card details and performs client-side validation using the validator library.

#### Validation Functions

- validateCardNumber: Validates the card number using the Luhn algorithm.
- validateExpiry: Validates the expiry date.
- validateCvv: Validates the CVV.
- validateName: Validates the name on the card.
- validateZip: Validates the ZIP code.

#### Event Handlers

- handleFieldChange: Handles changes to the input fields and performs validation.
- handleExpiryKeyDown: Handles key down events for the expiry date field to manage deletion.
- handleSubmit: Handles form submission and performs final validation.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
