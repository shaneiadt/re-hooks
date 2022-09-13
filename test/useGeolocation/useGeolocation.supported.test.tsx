import * as React from 'react';
import { render } from '@testing-library/react';

import { useGeolocation } from '../../src';
import { mockNavigatorGeolocation } from './mockNavigatorGeolocation';

const geolocation = {
  clearWatch: jest.fn(),
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

type Props = {
  success: (pos: any) => void;
  error?: (pos: any) => void;
};

const HookTester = ({ success, error }: Props) => {
  const { STATUS } = useGeolocation({ success, error });

  return <p>{STATUS}</p>;
};

const success = jest.fn();
const error = jest.fn();

describe('useGeolocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render an PENDING status', () => {
    mockNavigatorGeolocation(geolocation);

    const { getByText } = render(
      <HookTester success={success} error={error} />
    );

    expect(getByText('PENDING')).toBeTruthy();
  });

  it('should render an ERROR status & invoke the error function', async () => {
    geolocation.getCurrentPosition.mockImplementation((_success, rejected) =>
      rejected({
        code: '',
        message: '',
        PERMISSION_DENIED: '',
        POSITION_UNAVAILABLE: '',
        TIMEOUT: '',
      })
    );

    const { getByText } = render(
      <HookTester success={success} error={error} />
    );

    expect(getByText('ERROR')).toBeTruthy();
    expect(error).toBeCalled();
  });

  it('should render an SUCCESS status & invoke the success function', async () => {
    geolocation.getCurrentPosition.mockImplementation((success, _rejected) =>
      success({
        coords: {},
        timestamp: '',
      })
    );

    const { getByText } = render(
      <HookTester success={success} error={error} />
    );

    expect(getByText('SUCCESS')).toBeTruthy();
    expect(success).toBeCalled();
  });
});
