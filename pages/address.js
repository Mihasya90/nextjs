import React, { useState, useContext } from "react";
import { placeIdMock, detailsMock } from "../mocks";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";
import TextField from "@material-ui/core/TextField";
import withStore from "../src/withStore";

const useStyles = makeStyles(theme => ({
  wrapper: { display: "flex" },
  button: {
    margin: theme.spacing(3)
  }
}));

function Address(props) {
  const { state, dispatch } = props;
  const { address, API_KEY } = state;
  const [place, setPlace] = useState("Kyiv");
  const classes = useStyles();

  async function fetchAddress() {
    if (!place) return;
    const url1 = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY}&input=${encodeURI(
      place
    )}&inputtype=textquery&language=en`;
    // const res = await fetch(url);
    const res = placeIdMock;
    const place_id =
      res && res.candidates && res.candidates[0] && res.candidates[0].place_id;
    if (!place_id) return;
    const url2 = `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&place_id=${place_id}`;
    // const details = await fetch(url2);
    const details = detailsMock;
    dispatch({ type: "SET_ADDRESS", payload: details && details.result });
  }

  function onNextStep() {
    dispatch({ type: "SET_STEP", payload: 3 });
    Router.push("/summary");
  }
  return (
    <div className={classes.wrapper}>
      <TextField
        id="standard-basic"
        className={classes.textField}
        label="Enter address"
        margin="normal"
        value={place}
        onChange={e => setPlace(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        onClick={address ? onNextStep : fetchAddress}
      >
        {address ? "Next step" : "Find"}
      </Button>
    </div>
  );
}

export default withStore(Address);
