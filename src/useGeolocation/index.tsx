import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (!navigator.geolocation) {
      return setStatus('UNSUPPORTED');
    }

    setStatus('PENDING');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const successCallback = (position: GeoPosition): void => {
    setStatus('SUCCESS');
    success(position);
  };

  const errorCallback = (err: GeolocationPositionError): void => {
    setStatus('ERROR');

    if (error) error(err);
  };

  return {
    STATUS,
  };
};
