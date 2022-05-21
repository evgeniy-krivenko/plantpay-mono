import { fetchUser, signIn } from './thuks';
import { authActions } from './authReducer';

export default {
  fetchUser,
  signIn,
  ...authActions,
};
