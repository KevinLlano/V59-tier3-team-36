// __tests__/controllers/questionController.test.js
import { jest } from "@jest/globals";

/*UNIT TEST FOR QUESTION CONTROLLER*/

//replace the real question service with a mock one for testing purposes
jest.unstable_mockModule("../../services/getQuestionsByRole.js", () => ({
  getQuestionsByRole: jest.fn(),
}));

const { getQuestions } = await import(
  "../../controllers/questionController.js" //this unit test is testing this controller
);
const { getQuestionsByRole } = await import(
  "../../services/getQuestionsByRole.js"
);

//create express like 'response' object to test if controller runs correctly without actual server
const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

//test suite with 5 test cases for question controller
describe("getQuestions controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // test scenario 1: missing role
  it("returns 400 if role query param is missing", async () => {
    const req = { query: {} };
    const res = createRes();

    await getQuestions(req, res);

    expect(getQuestionsByRole).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Query parameter 'role' is required", //same message format in controller
    });
  });
  // test scenario 2: role is a blank value
  it("returns 400 if role is whitespace", async () => {
    const req = { query: { role: "   " } };
    const res = createRes();

    await getQuestions(req, res);

    expect(getQuestionsByRole).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Query parameter 'role' is required", //same message format in controller
    });
  });
  // test scenario 3: user provides valid role but it has extra blannk spaces trailing and before
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

  //test scenario 4: when a role which doesn't exist in the DB such as 'FakeRole' is provided by user
  it("returns 404 when service throws a 404 error", async () => {
    const req = { query: { role: "FakeRole" } };
    const res = createRes();

    const err = new Error("Role 'FakeRole' not found"); //same message format in controller
    err.statusCode = 404;

    getQuestionsByRole.mockRejectedValue(err);

    await getQuestions(req, res);

    expect(getQuestionsByRole).toHaveBeenCalledTimes(1);
    expect(getQuestionsByRole).toHaveBeenCalledWith("FakeRole");

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Role 'FakeRole' not found", //same message format in controller
    });
  });

  //test scenario 5: generic error
  it("returns 500 when service throws error without statusCode", async () => {
    const req = { query: { role: "Scrum Product Owner" } };
    const res = createRes();

    getQuestionsByRole.mockRejectedValue(new Error("DB down"));

    await getQuestions(req, res);

    expect(getQuestionsByRole).toHaveBeenCalledTimes(1);
    expect(getQuestionsByRole).toHaveBeenCalledWith("Scrum Product Owner");

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server error while fetching questions", //same message format in controller
    });
  });
});
