import { useEffect, useState } from "react";

export enum NOTIFICATION_STATUS {
  IDLE = "IDLE",
  UNSUPPORTED = "UNSUPPORTED",
  ERROR = "ERROR",
  PENDING = "PENDING",
  READY = "READY",
  SUCCESS = "SUCCESS",
}

export interface NotificationData {
  title: string;
  body: string;
  icon?: string;
}

/**
 * Requests browser notification permission and exposes a helper to send
 * notifications once permission is available.
 *
 * @returns Notification status and a function for dispatching notifications
 *
 * @example
 * ```ts
 * const { status, notify } = useNotification();
 *
 * notify({ title: "Saved", body: "Your changes were saved." });
 * ```
 */
export const useNotification = () => {
  const [status, setStatus] = useState<NOTIFICATION_STATUS>(
    NOTIFICATION_STATUS.IDLE,
  );
  const [notificationData, setNotificationData] =
    useState<NotificationData | null>(null);

  useEffect(() => {
    if (!globalThis.Notification || Notification.permission === "denied") {
      return setStatus(NOTIFICATION_STATUS.UNSUPPORTED);
    }

    setStatus(NOTIFICATION_STATUS.PENDING);

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
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
    } catch {
      setStatus(NOTIFICATION_STATUS.ERROR);
    }
  }, [notificationData]);

  const notify = (data: NotificationData) => setNotificationData(data);

  return {
    status,
    notify,
  };
};
