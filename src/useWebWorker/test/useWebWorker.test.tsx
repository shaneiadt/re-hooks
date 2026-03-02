import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { mockWorker } from "./mockWorker";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WorkerApp } from ".";

const { postMessage, createObjectURL, onmessage } = mockWorker();

describe("useWebWorker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render initial status as IDLE", () => {
    render(<WorkerApp />);

    expect(screen.getByText(/IDLE/)).toBeTruthy();
  });

  it("should render with status of SUCCESS for job1", () => {
    render(<WorkerApp />);

    const sendJob1Btn = screen.getByRole("button", { name: "Send Job 1" });

    fireEvent.click(sendJob1Btn);

    expect(screen.getByText(/SUCCESS/)).toBeTruthy();

    const setJob2Btn = screen.getByRole("button", { name: "Set Job 2" });
    const sendJob2Btn = screen.getByRole("button", { name: "Send Job 2" });

    fireEvent.click(setJob2Btn);

    expect(screen.getByText(/IDLE/)).toBeTruthy();

    fireEvent.click(sendJob2Btn);

    expect(screen.getByText(/SUCCESS/)).toBeTruthy();

    expect(postMessage).toBeCalledTimes(2);
    expect(onmessage).toBeCalledTimes(2);
    expect(createObjectURL).toBeCalledTimes(2);
  });

  it("should updateAction and render status IDLE & SUCCESS for job2", () => {
    render(<WorkerApp />);

    const setJob2Btn = screen.getByRole("button", { name: "Set Job 2" });
    const sendJob2Btn = screen.getByRole("button", { name: "Send Job 2" });

    fireEvent.click(setJob2Btn);

    expect(screen.getByText(/IDLE/)).toBeTruthy();

    fireEvent.click(sendJob2Btn);

    expect(screen.getByText(/SUCCESS/)).toBeTruthy();

    expect(postMessage).toBeCalledTimes(1);
    expect(onmessage).toBeCalledTimes(1);
    expect(createObjectURL).toBeCalledTimes(2);
  });
});
