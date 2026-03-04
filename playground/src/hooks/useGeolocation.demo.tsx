import { useCallback, useState } from "react";
import type { GeoPosition, GeolocationPositionError } from "use-re-hooks";
import { useGeolocation } from "use-re-hooks";

export const meta = {
  id: "useGeolocation",
  title: "useGeolocation",
  description: "Requests current browser geolocation and reports status.",
};

export default function UseGeolocationDemo() {
  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const success = useCallback((pos: GeoPosition) => {
    setPosition(pos);
    setErrorMessage(null);
  }, []);

  const error = useCallback((err: GeolocationPositionError) => {
    setErrorMessage(err.message);
  }, []);

  const { STATUS } = useGeolocation({ success, error });

  return (
    <div className="demo">
      <p>
        <strong>Status:</strong> <code>{STATUS}</code>
      </p>

      {position ? (
        <>
          <p>
            <strong>Latitude:</strong> <code>{position.coords.latitude}</code>
          </p>
          <p>
            <strong>Longitude:</strong> <code>{position.coords.longitude}</code>
          </p>
        </>
      ) : null}

      {errorMessage ? (
        <p>
          <strong>Error:</strong> <code>{errorMessage}</code>
        </p>
      ) : null}
    </div>
  );
}
