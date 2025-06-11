jest.mock("resend", () => {
  const mockSend = jest.fn();
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: { send: mockSend },
    })),
    __mockSend__: mockSend,
  };
});

const { __mockSend__ } = require("resend");
const { sendClaimNotification } = require("../src/services/email.service");

describe("sendClaimNotification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should send email with correct fields", async () => {
    __mockSend__.mockResolvedValue({
      data: { id: "email-id-123" },
      error: null,
    });

    const result = await sendClaimNotification({
      to: "recipient@example.com",
      claimantName: "Alice",
      itemName: "Umbrella",
    });

    expect(result).toEqual({ id: "email-id-123" });
  });

  test("Should throw if email fails to send", async () => {
    __mockSend__.mockResolvedValue({
      data: null,
      error: new Error("Failed"),
    });

    await expect(
      sendClaimNotification({
        to: "fail@example.com",
        claimantName: "Bob",
        itemName: "Watch",
      })
    ).rejects.toThrow("Email failed to send");
  });
});
