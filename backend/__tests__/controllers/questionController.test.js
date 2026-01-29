// __tests__/controllers/questionController.test.js
import { jest } from "@jest/globals";

/**
 * ESM NOTE:
 * In ESM ("type": "module"), static imports run before jest.mock().
 * Use jest.unstable_mockModule() + dynamic import() so the controller
 * receives the mocked service dependency.
 */

jest.unstable_mockModule("../../services/getQuestionsByRole.js", () => ({
  getQuestionsByRole: jest.fn(),
}));

const { getQuestions } = await import(
  "../../controllers/questionController.js"
);
const { getQuestionsByRole } = await import(
  "../../services/getQuestionsByRole.js"
);

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("getQuestions controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 if role query param is missing", async () => {
    const req = { query: {} };
    const res = createRes();

    await getQuestions(req, res);

    expect(getQuestionsByRole).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Query parameter 'role' is required",
    });
  });

  it("returns 400 if role is whitespace", async () => {
    const req = { query: { role: "   " } };
    const res = createRes();

    await getQuestions(req, res);

    expect(getQuestionsByRole).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Query parameter 'role' is required",
    });
  });

  it("calls service with trimmed role and returns 200 + questions", async () => {
    const req = { query: { role: "  Scrum Product Owner  " } };
    const res = createRes();

    const mockQuestions = [{ _id: "1", question: "Q1" }];
    getQuestionsByRole.mockResolvedValue(mockQuestions);

    await getQuestions(req, res);

    expect(getQuestionsByRole).toHaveBeenCalledTimes(1);
    expect(getQuestionsByRole).toHaveBeenCalledWith("Scrum Product Owner");

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockQuestions);
  });

  it("returns 404 when service throws an error with statusCode 404", async () => {
    const req = { query: { role: "FakeRole" } };
    const res = createRes();

    const err = new Error("Role 'FakeRole' not found");
    err.statusCode = 404;

    getQuestionsByRole.mockRejectedValue(err);

    await getQuestions(req, res);

    expect(getQuestionsByRole).toHaveBeenCalledTimes(1);
    expect(getQuestionsByRole).toHaveBeenCalledWith("FakeRole");

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Role 'FakeRole' not found",
    });
  });

  it("returns 500 when service throws an error without statusCode", async () => {
    const req = { query: { role: "Scrum Product Owner" } };
    const res = createRes();

    getQuestionsByRole.mockRejectedValue(new Error("DB down"));

    await getQuestions(req, res);

    expect(getQuestionsByRole).toHaveBeenCalledTimes(1);
    expect(getQuestionsByRole).toHaveBeenCalledWith("Scrum Product Owner");

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server error while fetching questions",
    });
  });
});
