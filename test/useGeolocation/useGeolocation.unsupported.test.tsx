import * as React from 'react';
import { render } from '@testing-library/react';

import { useGeolocation } from '../../src';

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

  it('should render an UNSUPPORTED status', () => {
    const { getByText } = render(
      <HookTester success={success} error={error} />
    );

    expect(getByText('UNSUPPORTED')).toBeTruthy();
  });
});
