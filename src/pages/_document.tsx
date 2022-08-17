import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta property="og:title" content="mote - 주식 계산기" />
          <meta property="og:url" content="https://mote.vercel.app/" />
          <meta property="og:description" content="수익과 수수료를 확인해 보세요!" />
          <meta
            property="og:image"
            content="https://user-images.githubusercontent.com/40762111/185186620-1b599404-be7e-408e-8522-2d21e4b3e57f.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="ko_KR" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
