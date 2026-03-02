import { act, renderHook, waitFor } from "@testing-library/react";

import { useNotification } from "../useNotification";
import { describe, expect, it, Mocked, vi } from "vitest";

const mockData = {
  title: "MOCK TITLE",
  body: "MOCK BODY",
  icon: "https://cdn.icon-icons.com/icons2/603/PNG/512/free_sales_badge_label_sticker_icon-icons.com_55980.png",
};

const mNotification = function () {
  throw new Error("mock error");
};

describe(useNotification, () => {
  it(`should render UNSUPPORTED status`, () => {
    const { result } = renderHook(() => useNotification());

    expect(result.current.status).toEqual("UNSUPPORTED");
  });

  it(`should render PENDING status`, async () => {
    globalThis.Notification = {
      requestPermission: () => Promise.resolve(),
      permission: "granted",
    } as unknown as Mocked<typeof Notification>;

    const { result } = renderHook(() => useNotification());

    await waitFor(() => expect(result.current.status).toEqual("PENDING"));
  });

  it(`should render READY status`, async () => {
    globalThis.Notification = {
      requestPermission: () => Promise.resolve("granted"),
      permission: "granted",
    } as unknown as Mocked<typeof Notification>;

    const { result } = renderHook(() => useNotification());

    await waitFor(() => expect(result.current.status).toEqual("READY"));
  });

  it(`should render UNSUPPORTED status`, async () => {
    globalThis.Notification = {
      requestPermission: () => Promise.resolve("denied"),
      permission: "denied",
    } as unknown as Mocked<typeof Notification>;

    const { result } = renderHook(() => useNotification());

    await waitFor(() => expect(result.current.status).toEqual("UNSUPPORTED"));
  });

  it(`should call the notify function`, async () => {
    const mNotification = vi.fn();
    Object.defineProperty(globalThis, "Notification", {
      value: mNotification,
    });

    const staticMembers = {
      requestPermission: () => Promise.resolve("granted"),
      permission: "granted",
    };

    Object.assign(globalThis.Notification, staticMembers);

    const { result } = renderHook(() => useNotification());

    await waitFor(() => expect(result.current.status).toEqual("READY"));

    act(() => {
      result.current.notify(mockData);
    });

    expect(mNotification).toBeCalledTimes(1);
  });

  it(`should call onerror`, async () => {
    Object.defineProperty(globalThis, "Notification", {
      value: mNotification,
    });

    const staticMembers = {
      requestPermission: () => Promise.resolve("granted"),
      permission: "granted",
    };

    Object.assign(globalThis.Notification, staticMembers);

    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.notify(mockData);
    });

    await waitFor(() => expect(result.current.status).toEqual("ERROR"));
  });
});
