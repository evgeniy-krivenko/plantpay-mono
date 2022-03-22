import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../store';
// import '../styles/globals.scss';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(WrappedApp);
