// pages/_app.js
import React, { useEffect } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import moment from "moment";
import Router from "next/router";
import Head from "next/head";

const reducer = (
  state = {
    step: 1,
    checkin: moment()
      .add(2, "hours")
      .toDate(),
    checkout: moment()
      .add(2, "hours")
      .toDate(),
    address: null,
    API_KEY: "AIzaSyBjJIxaPQbm98kX0At5rx62uphA0kvTT0M"
  },
  { type, payload }
) => {
  switch (type) {
    case "SET_CHECKIN":
      return { ...state, checkin: payload };
    case "SET_CHECKOUT":
      return { ...state, checkout: payload };
    case "SET_ADDRESS":
      return { ...state, address: payload };
    default:
      return state;
  }
};

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
const makeStore = (initialState, options) => {
  return createStore(reducer, initialState);
};

class MyApp extends App {
  componentDidMount() {
    Router.push("/");
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Head>
          <title>Reservation</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(makeStore)(MyApp);
