export const getCardType = (cardNumber: string): string => {
  const cardPatterns: { [key: string]: RegExp } = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  };

  for (const card in cardPatterns) {
    if (cardPatterns[card].test(cardNumber)) {
      return card;
    }
  }

  return '';
};