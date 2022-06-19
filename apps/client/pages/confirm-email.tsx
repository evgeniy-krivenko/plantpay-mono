import { NextThunkDispatch, wrapper } from '../store';
import { AxiosRequestHeaders } from 'axios';
import { commonServerProps } from '../ssr/commonServerProps';
import MainLayout from '../layouts/MainLayout/MainLayout';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import $api from '../http';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { isEmailConfirmedSelector } from '../store/reducers/auth/selectors';
import Link from 'next/link';

const SuccessMessage = (): JSX.Element => (
  <>
    Ваш адрес почты подтвержден, вы будете переадресованы на{' '}
    <Link href="/">
      <a className="confirm-email__link">главную</a>
    </Link>{' '}
    через 15 секунд
  </>
);

export function ConfirmEmail(): JSX.Element {
  const router = useRouter();
  const [response, setResponse] = useState<ReactNode>();
  const isEmailConfirmed = useTypeSelector(isEmailConfirmedSelector);

  useEffect(() => {
    const query = router;
    if (isEmailConfirmed) {
      setResponse('Ваш электронный адрес уже подтвержден');
      return;
    }

    if ('token' in query) {
      const { token } = query;
      $api
        .post('/confirm-email', { token })
        .then(() => {
          setResponse(SuccessMessage);
          setTimeout(() => router.push('/'), 30000);
        })
        .catch((e) => setResponse(e.response?.message));
    }
  }, []);

  return (
    <MainLayout title="Подтверждение регистрации">
      <p className="confirm-email__text">{response}</p>
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }): Promise<any> => {
  await commonServerProps(store)({ req, res });
});
