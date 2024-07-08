import React from "react";
import Image from "next/image";

type IconsProps = {
  type: "error" | "success" | "card";
  cardType?: string;
};

/**
 * Icons component
 *
 * Displays the appropriate icon based on the type.
 *
 * @param {Object} props - Component props
 * @param {string} props.type - The type of the icon ("error", "success", or "card")
 * @param {string} [props.cardType] - The type of the card (e.g., visa, mastercard, amex, discover), required if type is "card"
 *
 * @returns {JSX.Element} The Icons component
 */
const Icons: React.FC<IconsProps> = ({ type, cardType }) => {
  const cardIcons: { [key: string]: string } = {
    visa: "/cedar-payment-flow/visa.svg",
    mastercard: "/cedar-payment-flow/mastercard.svg",
    amex: "/cedar-payment-flow/amex.svg",
    discover: "/cedar-payment-flow/discover.svg",
  };

  switch (type) {
    case "card":
      return cardType ? (
        <Image
          src={cardIcons[cardType]}
          alt={`${cardType} icon`}
          className="h-8 w-8"
          width={10}
          height={10}
        />
      ) : (
        <span className="text-custom-dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
        </span>
      );

    case "error":
      return (
        <span className="icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-custom-error-red"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </span>
      );

    case "success":
      return (
        <span className="icon-wrapper success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-custom-success-green"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </span>
      );

    default:
      return null;
  }
};

export default Icons;
