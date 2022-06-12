export const GET_PARAMS = {
  popup: 'popup',
};

export const POPUPS_QUERY = {
  popup: {
    signIn: 'sign-in',
    signUp: 'sign-up',
    addProduct: 'add-product',
  },
};

export const SIGN_IN_URL = joinParams(GET_PARAMS.popup, POPUPS_QUERY.popup.signIn);
export const SIGN_UP_URL = joinParams(GET_PARAMS.popup, POPUPS_QUERY.popup.signUp);
export const ADD_PRODUCT_URL = joinParams(GET_PARAMS.popup, POPUPS_QUERY.popup.addProduct);

function joinParams(baseParam: string, additionalParam: string): string {
  return '?' + baseParam + '=' + additionalParam;
}
