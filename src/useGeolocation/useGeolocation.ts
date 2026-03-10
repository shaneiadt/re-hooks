import { useCallback, useEffect, useState } from "react";

export type GEOLOCATION_STATUS =
  | "IDLE"
  | "UNSUPPORTED"
  | "ERROR"
  | "PENDING"
  | "SUCCESS";

export interface GeolocationPositionError {
  code: number;
  message: string;
}

export interface GeoPosition {
  coords: {
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number;
    longitude: number;
    speed: number | null;
  };
  timestamp: number;
}

export interface UseGelocationProps {
  success: (pos: any) => void;
  error?: (err: GeolocationPositionError) => void;
}

/**
 * Requests the user's current geolocation and tracks request status.
 *
 * The hook invokes the provided callbacks for success and error responses from
 * the Geolocation API.
 *
 * @param props - Success and optional error callbacks
 * @returns The current geolocation request status
 *
 * @example
 * ```ts
 * const { STATUS } = useGeolocation({
 *   success: (position) => console.log(position.coords.latitude),
 *   error: (err) => console.error(err.message),
 * });
 * ```
 */
export const useGeolocation = ({
  success,
  error,
}: Readonly<UseGelocationProps>) => {
  const [status, setStatus] = useState<GEOLOCATION_STATUS>("IDLE");

  const successCallback = useCallback(
    (position: GeoPosition): void => {
      setStatus("SUCCESS");
      success(position);
    },
    [success],
  );

  const errorCallback = useCallback(
    (err: GeolocationPositionError): void => {
      setStatus("ERROR");

      if (error) error(err);
    },
    [error],
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      return setStatus("UNSUPPORTED");
    }

    setStatus("PENDING");
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, [successCallback, errorCallback]);

  return {
    STATUS: status,
  };
};
