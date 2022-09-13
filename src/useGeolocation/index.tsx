import { useCallback, useEffect, useState } from 'react';

export type GEOLOCATION_STATUS =
  | 'IDLE'
  | 'UNSUPPORTED'
  | 'ERROR'
  | 'PENDING'
  | 'SUCCESS';

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

export interface useGelocationProps {
  success: (pos: any) => void;
  error?: (err: GeolocationPositionError) => void;
}

export const useGeolocation = ({ success, error }: useGelocationProps) => {
  const [STATUS, setStatus] = useState<GEOLOCATION_STATUS>('IDLE');

  const successCallback = useCallback(
    (position: GeoPosition): void => {
      setStatus('SUCCESS');
      success(position);
    },
    [success]
  );

  const errorCallback = useCallback(
    (err: GeolocationPositionError): void => {
      setStatus('ERROR');

      if (error) error(err);
    },
    [error]
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      return setStatus('UNSUPPORTED');
    }

    setStatus('PENDING');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, [successCallback, errorCallback]);

  return {
    STATUS,
  };
};
