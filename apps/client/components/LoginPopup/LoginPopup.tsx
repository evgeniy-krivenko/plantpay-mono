import { MainPopup } from '@plantpay-mono/ui';
import { FC, useCallback, useEffect } from 'react';
import styles from './LoginPopup.module.scss';
import { Input } from '@plantpay-mono/ui';
import { Button } from '@plantpay-mono/ui';
import { useRouter } from 'next/router';
import { SIGN_UP_URL } from '../../configs/popups';
import { useForm } from 'react-hook-form';
import { ISignIn } from '@plantpay-mono/types';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useSignInMutation } from '../../store/reducers/auth/authApi';
import { authSelector } from '../../store/reducers/auth/authReducer';

interface LoginPopupProps {
  isOpened: boolean;
  onClose?: () => void;
}

export const LoginPopup: FC<LoginPopupProps> = ({ isOpened }) => {
  const router = useRouter();
  const [signIn, { isLoading, error }] = useSignInMutation();
  const { isAuth } = useTypeSelector(authSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>();

  const onSubmit = (data: ISignIn): void => {
    signIn(data);
  };

  const goOnSigUpPopup = useCallback(() => {
    router.push(SIGN_UP_URL);
  }, [router]);

  const onClosePopup = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (isAuth) {
      onClosePopup();
    }
  }, [isAuth]);

  return (
    <MainPopup
      className={styles.container}
      isOpened={isOpened}
      title="Войдите или зарегистрируйтесь"
      onClose={onClosePopup}
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.input}
          id="email"
          name="email"
          placeholder="Почта"
          type="text"
          error={errors.email}
          {...register('email', {
            required: { value: true, message: '* Обязательное поле' },
            pattern: { value: /.+@.+\..+/i, message: 'Введите валидный e-mail' },
          })}
        />
        <Input
          className={styles.input}
          id="password"
          name="password"
          placeholder="Пароль"
          type={'password'}
          {...register('password')}
        />
        <Button
          className={styles.button}
          text="Войти"
          size="m"
          appearance="primary"
          type="submit"
          isLoading={isLoading}
        />
        <Button
          className={styles.button}
          text="Регистрация"
          size="m"
          appearance="white"
          onClickButton={goOnSigUpPopup}
          role="link"
        />
        {error && <div className={styles.error}>{error.message}</div>}
      </form>
    </MainPopup>
  );
};
