import validator from "validator";

export const getCardType = (cardNumber: string): string => {
  if (validator.isCreditCard(cardNumber, { provider: 'visa' })) return 'visa';
  if (validator.isCreditCard(cardNumber, { provider: 'mastercard' })) return 'mastercard';
  if (validator.isCreditCard(cardNumber, { provider: 'amex' })) return 'amex';
  if (validator.isCreditCard(cardNumber, { provider: 'discover' })) return 'discover';
  return '';
};