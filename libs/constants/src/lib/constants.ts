export const dto = {
  INVALID_FORMAT: 'invalid format',
  MUST_BE_EMAIL: 'field must be email',
  WRONG_ROLE_TYPE: 'wrong role type',
  WRONG_ID_FORMAT: 'wrong id format',
  PRICE_POSITIVE: 'price must be positive number',
  maxLengthMessage: (length: number): string => `Max length ${length} symbol`,
  minLengthMessage: (length: number): string => `Min length ${length} symbol`,
  passLenMsg: (min: number, max: number): string => `Pass length should be between ${min} and ${max} symbol`,
  fieldLenMsg: (min: number, max: number): string => `Field length should be between ${min} and ${max} symbol`,
};

export const authException = {
  INCORRECT_CREDENTIALS: 'Incorrect credentials',
  USER_IS_NOT_EXISTS: 'Such user is not exists',
  TOKEN_HAS_BEEN_USED: 'Such token has been used',
  USER_IS_EXISTS: 'User with such email is exists',
};

export const cartException = {
  CART_OR_PRODUCT_NOT_FOUND: 'Cart or product not found',
};

export const PLANTPAY_CART_ID = 'plantpay-cart-id';
