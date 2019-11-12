// pages/_app.js
import React, { useReducer, createContext } from "react";
import App from "next/app";
import moment from "moment";
import Router from "next/router";
import Head from "next/head";
import StoreContext from "../src/storeContext";

const initialState = {
  step: 1,
  checkin: moment()
    .add(2, "hours")
    .toDate(),
  checkout: moment()
    .add(2, "hours")
    .toDate(),
  address: null,
  API_KEY: "AIzaSyBjJIxaPQbm98kX0At5rx62uphA0kvTT0M"
};

function reducer(state, { type, payload }) {
  console.log(type, payload);
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
}

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

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
      <StoreProvider>
        <Head>
          <title>Reservation</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <Component {...pageProps} />
      </StoreProvider>
    );
  }
}

export default MyApp;
