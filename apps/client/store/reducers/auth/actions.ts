import { fetchUser, signIn, signUp } from './thuks';
import { authActions } from './authReducer';

export default {
  fetchUser,
  signIn,
  signUp,
  ...authActions,
};
