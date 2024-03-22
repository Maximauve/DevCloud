import Head from 'next/head';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Swagger = () => {

  return (
      <>
        <Head>
          <title>Super api demo</title>
          <meta name="description" content="BrowserStack Demo API Swagger" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <SwaggerUI url="/api/doc" />
      </>
  );
};

export default Swagger;