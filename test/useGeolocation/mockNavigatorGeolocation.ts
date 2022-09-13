export const mockNavigatorGeolocation = (geolocation: {
  clearWatch?: () => void;
  getCurrentPosition?: () => void;
  watchPosition?: () => void;
}) => {
  Object.defineProperty(global.navigator, 'geolocation', {
    configurable: true,
    value: geolocation,
  });
};
