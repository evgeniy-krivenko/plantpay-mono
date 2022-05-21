export const GET_PARAMS = {
  popup: 'popup',
};

export const POPUPS_QUERY = {
  popup: {
    signIn: 'sign-in',
    signUp: 'sign-up',
  },
};

export const SIGN_IN_URL = joinParams(GET_PARAMS.popup, POPUPS_QUERY.popup.signIn);
export const SIGN_UP_URL = joinParams(GET_PARAMS.popup, POPUPS_QUERY.popup.signUp);

function joinParams(baseParam: string, additionalParam: string): string {
  return '?' + baseParam + '=' + additionalParam;
}
