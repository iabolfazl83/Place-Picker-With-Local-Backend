import Places from './Places.jsx';
import {useEffect, useState} from "react";
import Error from "./Error.jsx";
import {fetchAvailablePlaces} from "../http.js";
import {sortPlacesByDistance} from "../loc.js";

export default function AvailablePlaces({onSelectPlace}) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        //google api is not blocked in Iran, you can uncomment this codes to enable the user location permission granting;

        // navigator.geolocation.getCurrentPosition(position => {
        //   const sortedPlaces = sortPlacesByDistance(
        //     places,
        //     position.coords.latitude,
        //     position.coords.longitude);

        // and change the "places" under this line to "sortedPlaces";
        setAvailablePlaces(places);
        setIsFetching(false);
        // });

      } catch (error) {
        setError({message: error.message || 'Could not fetch places please try again later.'});
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, [])

  if (error) return <Error title="an error occurred" message={error.message}/>;

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
