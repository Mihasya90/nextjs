// import { google } from "googleapis";
import React, { useEffect } from "react";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";
import { compose } from "redux";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";

const useStyles = makeStyles(theme => ({
  row: { margin: "20px 0" }
}));

function Summary(props) {
  const { google, address, checkin, checkout } = props;
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.row}>
        Check-in: {moment(checkin).format("YYYY-MM-DD HH:mm")}
      </Typography>
      <Typography className={classes.row}>
        Check-out: {moment(checkout).format("YYYY-MM-DD HH:mm")}
      </Typography>
      <Typography className={classes.row}>
        Address: {address && address.formatted_address}
      </Typography>

      {address && (
        <Map
          google={google}
          zoom={14}
          style={{ width: "600px", height: "600px" }}
          initialCenter={
            address && address.geometry && address.geometry.location
          }
        >
          <Marker
            name={address && address.vicinity}
            placeId={address && address.place_id}
          />
          <InfoWindow>
            <div>
              <h1>{address && address.formatted_address}</h1>
            </div>
          </InfoWindow>
        </Map>
      )}
    </div>
  );
}

export default compose(
  connect(({ API_KEY, address, checkin, checkout }) => ({
    API_KEY,
    address,
    checkin,
    checkout
  })),
  GoogleApiWrapper(({ API_KEY }) => ({ apiKey: API_KEY }))
)(Summary);
