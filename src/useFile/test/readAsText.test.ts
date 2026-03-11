import { describe, expect, it, vi } from "vitest";
import readAsText from "./readAsText";

describe("readAsText()", () => {
  it("should resolve file text", async () => {
    const file = new File(["file content"], "file.txt", { type: "text/plain" });
    const textSpy = vi.spyOn(file, "text");

    const content = await readAsText(file);

    expect(content).toBe("file content");
    expect(textSpy).toHaveBeenCalledTimes(1);
  });
});
