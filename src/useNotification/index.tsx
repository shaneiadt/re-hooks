import { useEffect, useState } from 'react';

export enum NOTIFICATION_STATUS {
  IDLE = 'IDLE',
  UNSUPPORTED = 'UNSUPPORTED',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  READY = 'READY',
  SUCCESS = 'SUCCESS',
}

export interface NotificationData {
  title: string;
  body: string;
  icon?: string;
}

export const useNotification = () => {
  const [status, setStatus] = useState<NOTIFICATION_STATUS>(
    NOTIFICATION_STATUS.IDLE
  );
  const [
    notificationData,
    setNotificationData,
  ] = useState<NotificationData | null>(null);

  useEffect(() => {
    if (!window.Notification || Notification.permission === 'denied') {
      return setStatus(NOTIFICATION_STATUS.UNSUPPORTED);
    }

    setStatus(NOTIFICATION_STATUS.PENDING);

    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        return setStatus(NOTIFICATION_STATUS.READY);
      }

      return setStatus(NOTIFICATION_STATUS.UNSUPPORTED);
    });
  }, []);

  useEffect(() => {
    if (!notificationData) return;

    const { title, body, icon } = notificationData;

    try {
      new Notification(title, { body, icon });
    } catch (e) {
      setStatus(NOTIFICATION_STATUS.ERROR);
    }
  }, [notificationData]);

  const notify = (data: NotificationData) => setNotificationData(data);

  return {
    status,
    notify,
  };
};
