import { SubmitFeedbackService } from "./submitFeedback";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "UNIT TEST",
        screenshot: "data:image/png;base64",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should be not able to submit a feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "UNIT TEST",
        screenshot: "data:image/png;base64",
      })
    ).rejects.toThrow();
  });

  it("should be not able to submit a feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64",
      })
    ).rejects.toThrow();
  });

  it("should be not able to submit a feedback without a screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "UNIT TEST",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
