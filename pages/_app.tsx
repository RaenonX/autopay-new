import React from 'react';

import {AppProps} from 'next/app';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';

import '../styles/bootstrap.scss';
import '../styles/index.scss';
import '../styles/scrollbar.scss';


const NextApp = ({
  Component,
  pageProps: {session, ...pageProps},
}: AppProps) => (
  <>
    <Head>
      <title>RO 自動儲值系統</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    </Head>
    <React.StrictMode>
      <div id="body">
        <Container fluid className="h-100 p-0 position-relative">
          <Component {...pageProps}/>
        </Container>
      </div>
    </React.StrictMode>
  </>
);

export default NextApp;
