import Head from "next/head";
import Nav from "../components/Nav";

//css

import "../css/style.css";
import "../css/form.css";
import "../css/login.css";
import "../css/layout.css";
import "../css/modal.css";
import "../css/order.css";
import "../css/navbar.css";

import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SoftGestion</title>
      </Head>
      <div className="wrapper" >
        <Nav />
        <div id="content">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
