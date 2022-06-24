import { MainPopup } from '@plantpay-mono/ui';
import { FC, useCallback, useEffect, useRef } from 'react';
import styles from './SignUpPopup.module.scss';
import { Input } from '@plantpay-mono/ui';
import Button from '../Button/Button';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ISignUp } from '@plantpay-mono/types';
import { SIGN_IN_URL } from '../../configs/popups';
import { useSignUpMutation } from '../../store/reducers/auth/authApi';

interface LoginPopupProps {
  isOpened: boolean;
  onClose?: () => void;
}

export const SignUpPopup: FC<LoginPopupProps> = ({ isOpened }) => {
  const [signUp, { isLoading, error, isSuccess }] = useSignUpMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>();

  const onSubmit = (data: ISignUp): void => {
    signUp(data);
  };

  const goOnSignInPopup = useCallback(() => {
    router.push(SIGN_IN_URL);
  }, [router]);

  const onClosePopup = useCallback(() => {
    router.push(router.pathname);
  }, [router]);

  useEffect(() => {
    if (isSuccess) {
      onClosePopup();
    }
  }, [isSuccess]);

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
          id="name"
          name="name"
          placeholder="Имя *"
          type="text"
          error={errors.name}
          {...register('name', {
            required: { value: true, message: '* Обязательное поле' },
          })}
        />
        <Input
          className={styles.input}
          id="surname"
          name="surname"
          placeholder="Фамилия *"
          type="text"
          error={errors.surname}
          {...register('surname', {
            required: { value: true, message: '* Обязательное поле' },
          })}
        />
        <Input
          className={styles.input}
          id="email"
          name="email"
          placeholder="Почта *"
          type="email"
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
          placeholder="Придумайте пароль *"
          type="password"
          error={errors.password}
          {...register('password', {
            required: { value: true, message: '* Обязательное поле' },
            minLength: { value: 8, message: 'Минимум 8 символов' },
          })}
        />
        <Button
          className={styles.button}
          text="Регистрация"
          size="m"
          type="submit"
          appearance="primary"
          isLoading={isLoading}
        />
        <Button className={styles.button} text="Войти" size="m" appearance="white" onClickButton={goOnSignInPopup} />
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </MainPopup>
  );
};
