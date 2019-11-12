import React, { useState, useContext } from "react";
import { placeIdMock } from "../mocks";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";
import TextField from "@material-ui/core/TextField";
import withStore from "../src/withStore";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  wrapper: { display: "flex" },
  button: {
    margin: theme.spacing(3)
  }
}));

function Address(props) {
  const { state, dispatch } = props;
  const { place_id, API_KEY } = state;
  const [place, setPlace] = useState("Kyiv");
  const classes = useStyles();
  const [error, setError] = useState(null);

  async function fetchAddress() {
    if (!place) return;
    const url1 = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY}&input=${encodeURI(
      place
    )}&inputtype=textquery&language=en`;
    let res;
    try {
      res = place === "Kyiv" ? placeIdMock : await fetch(url1);
      res = res.json ? await res.json() : res;
      if (res.status === "OK") {
        const place_id =
          res &&
          res.candidates &&
          res.candidates[0] &&
          res.candidates[0].place_id;
        dispatch({ type: "SET_PLACEID", payload: place_id });
      }
    } catch (error) {
      if (!error) return;
      setError((error && error.message) || error);
    }
  }

  function onNextStep() {
    Router.push("/summary");
  }
  return (
    <div>
      <div className={classes.wrapper}>
        <TextField
          id="standard-basic"
          className={classes.textField}
          label="Enter address"
          margin="normal"
          value={place}
          onChange={e => {
            setError(null);
            setPlace(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          onClick={place_id ? onNextStep : fetchAddress}
        >
          {place_id ? "Next step" : "Find"}
        </Button>
      </div>
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
}

export default withStore(Address);
