import React from 'react';

import Document, {Head, Html, Main, NextScript} from 'next/document';


type Props = {};

/**
 * Base react app document component.
 */
class NextDocument extends Document<Props> {
  /**
   * @inheritDoc
   */
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8"/>
          <meta
            name="description"
            content="RO 自動儲值系統"
          />
          <meta content="#1184c4" name="theme-color"/>

          <link href="/favicon.ico" rel="icon"/>
          <link href="/logo512.png" rel="apple-touch-icon"/>

          {/*
          manifest.json provides metadata used when your web app is installed on a user's mobile device or desktop.
          See https://developers.google.com/web/fundamentals/web-app-manifest/
          */}
          <link href="/manifest.json" rel="manifest"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default NextDocument;
