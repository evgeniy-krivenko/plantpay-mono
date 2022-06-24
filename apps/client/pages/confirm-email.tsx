import { wrapper } from '../store';
import { commonServerProps } from '../ssr/commonServerProps';
import MainLayout from '../layouts/MainLayout/MainLayout';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import $api from '../http';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { isEmailConfirmedSelector } from '../store/reducers/auth/selectors';
import Link from 'next/link';
import Image from 'next/image';
import { Preloader } from '@plantpay-mono/ui';

const SuccessMessage = (): JSX.Element => (
  <>
    <div className="confirm-email__success-icon">
      <Image src="/check.svg" width="48" height="48" />
    </div>
    Ваш адрес почты подтвержден, вы будете переадресованы на{' '}
    <Link href="/">
      <a className="confirm-email__link">главную</a>
    </Link>{' '}
    через 15 секунд
  </>
);

function ConfirmEmail(): JSX.Element {
  const router = useRouter();
  const [response, setResponse] = useState<ReactNode>();
  const isEmailConfirmed = useTypeSelector(isEmailConfirmedSelector);

  useEffect(() => {
    const { query } = router;
    if (isEmailConfirmed) {
      setResponse('Ваш электронный адрес уже подтвержден');
      return;
    }

    if ('token' in query) {
      const { token } = query;
      $api
        .post('/auth/confirm-email', { token })
        .then(() => {
          setResponse(SuccessMessage);
          setTimeout(() => router.push('/'), 30000);
        })
        .catch((e) => setResponse(e.response?.message));
    } else {
      router.push('/404');
    }
  }, []);

  if (!response) return <Preloader />;

  return (
    <MainLayout title="Подтверждение регистрации">
      <p className="confirm-email__text">{response}</p>
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }): Promise<any> => {
  await commonServerProps(store)({ req, res });
});

export default ConfirmEmail;
