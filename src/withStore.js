import React, { useContext } from "react";
import StoreContext from "../src/storeContext";

const withStore = Component => props => {
  const [state, dispatch] = useContext(StoreContext);
  const allProps = { ...props, state, dispatch };
  return <Component {...allProps} />;
};

export default withStore;
