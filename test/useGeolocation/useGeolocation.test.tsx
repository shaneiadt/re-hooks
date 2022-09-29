import { renderHook } from '@testing-library/react';

import { useGeolocation } from '../../src';
import { mockNavigatorGeolocation } from './mockNavigatorGeolocation';

const geolocation = {
  clearWatch: jest.fn(),
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

const success = jest.fn();
const error = jest.fn();

describe('useGeolocation', () => {
  beforeEach(() => {
    geolocation.clearWatch.mockReset();
    geolocation.getCurrentPosition.mockReset();
    geolocation.watchPosition.mockReset();
  });

  it('should render an UNSUPPORTED status', () => {
    const {
      result: {
        current: { STATUS },
      },
    } = renderHook(() => useGeolocation({ success, error }));

    expect(STATUS).toEqual('UNSUPPORTED');
  });

  it('should render an PENDING status', () => {
    mockNavigatorGeolocation(geolocation);
    const {
      result: {
        current: { STATUS },
      },
    } = renderHook(() => useGeolocation({ success, error }));

    expect(STATUS).toEqual('PENDING');
  });

  it('should render an SUCCESS status', () => {
    geolocation.getCurrentPosition.mockImplementation((success, _rejected) =>
      success({
        coords: {},
        timestamp: '',
      })
    );
    const {
      result: {
        current: { STATUS },
      },
    } = renderHook(() => useGeolocation({ success, error }));

    expect(STATUS).toEqual('SUCCESS');
    expect(success).toBeCalled();
  });

  it('should render an ERROR status', () => {
    geolocation.getCurrentPosition.mockImplementation((_success, rejected) =>
      rejected({
        code: '',
        message: '',
        PERMISSION_DENIED: '',
        POSITION_UNAVAILABLE: '',
        TIMEOUT: '',
      })
    );
    const {
      result: {
        current: { STATUS },
      },
    } = renderHook(() => useGeolocation({ success, error }));

    expect(STATUS).toEqual('ERROR');
    expect(error).toBeCalled();
  });

  it('should render an ERROR status', () => {
    geolocation.getCurrentPosition.mockImplementation((_success, rejected) =>
      rejected({
        code: '',
        message: '',
        PERMISSION_DENIED: '',
        POSITION_UNAVAILABLE: '',
        TIMEOUT: '',
      })
    );
    const {
      result: {
        current: { STATUS },
      },
    } = renderHook(() => useGeolocation({ success, error }));

    expect(STATUS).toEqual('ERROR');
    expect(error).toBeCalled();
  });
});
