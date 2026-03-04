import { useState } from "react";
import { NOTIFICATION_STATUS, useNotification } from "use-re-hooks";

export const meta = {
  id: "useNotification",
  title: "useNotification",
  description: "Requests notification permission and sends a browser notification.",
};

export default function UseNotificationDemo() {
  const { notify, status } = useNotification();
  const [title, setTitle] = useState("re-hooks");
  const [body, setBody] = useState("Notification from the playground.");

  const isReady = status === NOTIFICATION_STATUS.READY;

  return (
    <div className="demo">
      <p>
        <strong>Status:</strong> <code>{status}</code>
      </p>

      <label htmlFor="notification-title">Title</label>
      <input
        id="notification-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="notification-body">Body</label>
      <input
        id="notification-body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />

      <button
        type="button"
        onClick={() => notify({ title, body })}
        disabled={!isReady}
      >
        Send Notification
      </button>
    </div>
  );
}
