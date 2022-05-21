import { MainPopup } from '@plantpay-mono/ui';
import { FC, useCallback, useRef } from 'react';
import styles from './SignUpPopup.module.scss';
import { Input } from '@plantpay-mono/ui';
import Button from '../Button/Button';
import { useRouter } from 'next/router';

interface LoginPopupProps {
  isOpened: boolean;
  onClose?: () => void;
}

export const SignUpPopup: FC<LoginPopupProps> = ({ isOpened }) => {
  const router = useRouter();
  const ref = useRef();
  const passwordRef = useRef();

  const onClosePopup = useCallback(() => {
    router.push(router.pathname);
  }, [router]);

  return (
    <MainPopup
      className={styles.container}
      isOpened={isOpened}
      title="Войдите или зарегистрируйтесь"
      onClose={onClosePopup}
    >
      <form className={styles.form}>
        <Input className={styles.input} id="name" name="name" placeholder="Имя *" type="text" ref={ref} />
        <Input className={styles.input} id="surname" name="surname" placeholder="Фамилия *" type="text" ref={ref} />
        <Input className={styles.input} id="email" name="email" placeholder="Почта *" type="email" ref={ref} />
        <Input
          className={styles.input}
          id="password"
          name="password"
          placeholder="Придумайте пароль *"
          type="password"
          ref={passwordRef}
        />
        <Button className={styles.button} text="Регистрация" size="m" appearance="primary" />
        <Button className={styles.button} text="Войти" size="m" appearance="white" onClickButton={router.back} />
      </form>
    </MainPopup>
  );
};
