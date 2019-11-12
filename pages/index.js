import Button from "@material-ui/core/Button";
import moment from "moment";
import DatePicker from "../components/DatePicker";
import Router from "next/router";
import withStore from "../src/withStore";

function Step1(props) {
  const { state, dispatch } = props;
  const { checkin } = state;

  const MINIMUM_DATE = moment()
    .add(2, "hours")
    .toDate();
  const CHECK_OUT_MINUTES_OFFSET = 5;

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
        minValue={moment(checkin)
          .add(CHECK_OUT_MINUTES_OFFSET, "minute")
          .toDate()}
      />
      <Button variant="contained" color="primary" type="submit">
        Next step
      </Button>
    </form>
  );
}

export default withStore(Step1);
