import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { useNotification } from '../../src';

const mockData = {
  title: 'MOCK TITLE',
  body: 'MOCK BODY',
  icon:
    'https://cdn.icon-icons.com/icons2/603/PNG/512/free_sales_badge_label_sticker_icon-icons.com_55980.png',
};

interface Props {
  title: string;
  body: string;
  icon?: string;
}

const HookTester = (data: Props) => {
  const { status, notify } = useNotification();

  return (
    <>
      <p>{status}</p>
      <button onClick={() => notify(data)}>Send Notification</button>
    </>
  );
};

describe('useNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should render UNSUPPORTED status`, () => {
    const { getByText } = render(<HookTester {...mockData} />);

    expect(getByText('UNSUPPORTED')).toBeTruthy();
  });

  it(`should render PENDING status`, async () => {
    globalThis.Notification = ({
      requestPermission: () => Promise.resolve(),
      permission: 'granted',
    } as unknown) as jest.Mocked<typeof Notification>;

    const { getByText } = render(<HookTester {...mockData} />);

    await waitFor(() => {
      expect(getByText('PENDING')).toBeTruthy();
    });
  });

  it(`should render READY status`, async () => {
    globalThis.Notification = ({
      requestPermission: () => Promise.resolve('granted'),
      permission: 'granted',
    } as unknown) as jest.Mocked<typeof Notification>;

    const { getByText } = render(<HookTester {...mockData} />);

    await waitFor(() => {
      expect(getByText('READY')).toBeTruthy();
    });
  });

  it(`should render UNSUPPORTED for denied status`, async () => {
    globalThis.Notification = ({
      requestPermission: () => Promise.resolve('denied'),
      permission: 'denied',
    } as unknown) as jest.Mocked<typeof Notification>;

    const { getByText } = render(<HookTester {...mockData} />);

    await waitFor(() => {
      expect(getByText('UNSUPPORTED')).toBeTruthy();
    });
  });

  it(`should execute the notify function`, async () => {
    const mNotification = jest.fn();
    Object.defineProperty(global, 'Notification', {
      value: mNotification,
    });

    const staticMembers = {
      requestPermission: () => Promise.resolve('granted'),
      permission: 'granted',
    };

    Object.assign(global.Notification, staticMembers);

    const { getByText, getByRole } = render(<HookTester {...mockData} />);

    await waitFor(() => expect(getByText('READY')).toBeTruthy());

    await waitFor(() => {
      const notifyBtn = getByRole('button', { name: 'Send Notification' });

      expect(notifyBtn).toBeTruthy();

      fireEvent.click(notifyBtn);

      expect(mNotification).toBeCalledTimes(1);
    });
  });
});
