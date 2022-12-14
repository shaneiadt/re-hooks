![JS coverage](./badges/code_coverage.svg)

# Use-Re-Hooks

Potentially "Useful React hooks"!

- [useGeolocation](https://github.com/shaneiadt/re-hooks/blob/master/src/useGeolocation/index.tsx)
- [useWebWorker](https://github.com/shaneiadt/re-hooks/blob/master/src/useWebWorker/index.tsx)
- [useNotification](https://github.com/shaneiadt/re-hooks/blob/master/src/useNotification/index.tsx)
- [useFile](https://github.com/shaneiadt/re-hooks/blob/master/src/useFile/index.tsx)
- [useClipboard](https://github.com/shaneiadt/re-hooks/blob/master/src/useClipboard/index.tsx)
- [useRandomNumber](https://github.com/shaneiadt/re-hooks/blob/master/src/useRandomNumber/index.tsx)
- [usePipe](https://github.com/shaneiadt/re-hooks/blob/master/src/usePipe/index.tsx)
- [useCompose](https://github.com/shaneiadt/re-hooks/blob/master/src/useCompose/index.tsx)
- [useEllipsis](https://github.com/shaneiadt/re-hooks/blob/master/src/useEllipsis/index.tsx)
- [useMeasurePerformance](https://github.com/shaneiadt/re-hooks/blob/master/src/useMeasurePerformance/index.tsx)
- [useSlugify](https://github.com/shaneiadt/re-hooks/blob/master/src/useSlugify/index.tsx)
- [useCase](https://github.com/shaneiadt/re-hooks/blob/master/src/useCase/index.tsx)
- [useColor](https://github.com/shaneiadt/re-hooks/blob/master/src/useColor/index.tsx)

## Usage

### useGeolocation

```javascript
export const App = () => {
  const error = (err: GeolocationPositionError) => {
    console.error(err);
  };

  const [location, setlocation] = useState<GeoPosition>();

  useGeolocation({ success: setlocation, error });

  return (
    <>
      <p>Longitude: {location?.coords.longitude}</p>
      <p>Latitude: {location?.coords.latitude}</p>
    </>
  );
};
```