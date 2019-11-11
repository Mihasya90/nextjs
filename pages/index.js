import React from "react";
import Button from "@material-ui/core/Button";
import moment from "moment";
import DatePicker from "../components/DatePicker";
import { connect } from "react-redux";
import Router from "next/router";

function Step1(props) {
  const { dispatch, checkin } = props;
  const MINIMUM_DATE = moment()
    .add(2, "hours")
    .toDate();

  const onCheckinChange = date => {
    dispatch({ type: "SET_CHECKIN", payload: date });
  };

  const onCheckoutChange = date => {
    dispatch({ type: "SET_CHECKOUT", payload: date });
  };

  function onSubmit(e) {
    e.preventDefault();
    Router.push("/address");
  }
  return (
    <form onSubmit={onSubmit}>
      <DatePicker
        title="Check-in"
        onChange={onCheckinChange}
        minValue={MINIMUM_DATE}
      />
      <DatePicker
        title="Check-out"
        onChange={onCheckoutChange}
        minValue={checkin}
      />
      <Button variant="contained" color="primary" type="submit">
        Next step
      </Button>
    </form>
  );
}

export default connect(({ checkin }) => ({ checkin }))(Step1);
