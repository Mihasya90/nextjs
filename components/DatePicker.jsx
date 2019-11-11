import React, { useState, useEffect } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  row: {
    marginBottom: 20
  }
}));

export default function DatePicker(props) {
  const { title, onChange = () => {}, minValue } = props;
  const [date, setDate] = useState(minValue);
  //useStyles doesn't work if it is outside component during first load.

  const classes = useStyles();

  useEffect(() => {
    onChange(date);
  }, [date]);

  useEffect(() => {
    if (moment(minValue).isSameOrAfter(moment(date)))
      setDate(
        moment(minValue)
          .add(1, "minute")
          .toDate()
      );
  }, [minValue]);

  const onDateChange = date => {
    if (moment(date).isSameOrAfter(moment(minValue))) setDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Typography variant={"h6"}>{title}</Typography>
      <Grid container className={classes.row}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="Date"
          value={date}
          onChange={onDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          label="Time"
          value={date}
          onChange={onDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
