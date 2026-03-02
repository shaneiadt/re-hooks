export const mockNavigatorGeolocation = (geolocation: {
  clearWatch?: () => void;
  getCurrentPosition?: () => void;
  watchPosition?: () => void;
}) => {
  Object.defineProperty(globalThis.navigator, "geolocation", {
    configurable: true,
    value: geolocation,
  });
};
