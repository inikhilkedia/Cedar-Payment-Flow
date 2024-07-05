import React from "react";
import Image from "next/image";

type CardIconProps = {
  cardType: string;
};

/**
 * CardIcon component
 *
 * Displays the appropriate credit card icon based on the card type.
 *
 * @param {Object} props - Component props
 * @param {string} props.cardType - The type of the card (e.g., visa, mastercard, amex, discover)
 *
 * @returns {JSX.Element} The CardIcon component
 */
const CardIcon: React.FC<CardIconProps> = ({ cardType }) => {
  const cardIcons: { [key: string]: string } = {
    visa: "/visa.svg", // replace with your Visa icon path
    mastercard: "/mastercard.svg", // replace with your MasterCard icon path
    amex: "/amex.svg", // replace with your Amex icon path
    discover: "/discover.svg", // replace with your Discover icon path
  };

  return (
    <>
      {cardType && (
        <Image
          src={cardIcons[cardType]}
          alt={`${cardType} icon`}
          className="h-8 w-8"
          width={10}
          height={10}
        />
      )}
    </>
  );
};

export default CardIcon;
