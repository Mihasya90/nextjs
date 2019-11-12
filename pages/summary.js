// import { google } from "googleapis";
import React, { useEffect, useState } from "react";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import withStore from "../src/withStore";
import { compose } from "redux";
import { detailsMock } from "../mocks";

const useStyles = makeStyles(theme => ({
  row: { margin: "20px 0" }
}));

function Summary(props) {
  const { google, state, dispatch } = props;
  const { place_id, checkin, checkout, API_KEY } = state;
  const [address, setAddress] = useState();
  const classes = useStyles();
  const [error, setError] = useState(null);

  const fetchAddress = async place_id => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&place_id=${place_id}`;
    let details;
    try {
      details =
        place_id === "ChIJBUVa4U7P1EAR_kYBF9IxSXY"
          ? detailsMock
          : await fetch(url);
      details = details.json ? await details.json() : details;

      setAddress(details.result);
    } catch (error) {
      setError((error && error.message) || error);
    }
  };

  useEffect(() => {
    setError(null);
    if (!place_id) return;
    fetchAddress(place_id);
  }, [place_id]);

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
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
}

export default compose(
  withStore,
  GoogleApiWrapper(({ state }) => ({ apiKey: state.API_KEY }))
)(Summary);
