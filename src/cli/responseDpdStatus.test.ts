import { jest } from "@jest/globals";
import dpdService from "services/dpdService";
import open from "open";

import {
  getArgStartStatus,
  getDefaultStartStatus,
  checker,
} from "../../src/cli/notyfier";

jest.mock("open", () => jest.fn());
jest.mock("../../src/services/dpdService", () => ({
  __esModule: true,
  default: {
    getStatuses: jest.fn(),
    getStatusInfo: jest.fn(),
  },
}));

const mockedGetStatuses = dpdService.getStatuses as jest.MockedFunction<
  typeof dpdService.getStatuses
>;

const mockStatuses = ["Created", "In Transit", "Delivered"];

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Notifyer CLI", () => {
  test("should return first status by default", () => {
    expect(getDefaultStartStatus(mockStatuses)).toBe("Created");
  });

  test("should return valid CLI argument", () => {
    process.argv[2] = "Delivered";
    expect(getArgStartStatus(mockStatuses)).toBe("Delivered");
  });

  test("should fall back to default if CLI argument is invalid", () => {
    process.argv[2] = "Unknown";
    expect(getArgStartStatus(mockStatuses)).toBe("Created");
  });

  test("should open browser when status changes", async () => {
    mockedGetStatuses
      .mockResolvedValueOnce(["Created"])
      .mockResolvedValueOnce(["Delivered"]);
    const setIntervalSpy = jest
      .spyOn(global, "setInterval")
      .mockImplementation((fn: () => void) => {
        setTimeout(fn, 0); // simulate immediate interval trigger
        return 123 as unknown as NodeJS.Timeout;
      });

    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    checker("Created", 1000);

    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(open).toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalledWith(123);

    setIntervalSpy.mockRestore();
  });
});
