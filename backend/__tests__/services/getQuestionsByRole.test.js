// __tests__/services/getQuestionsByRole.test.js
import { jest } from "@jest/globals";

/**UNIT TEST FOR QUESTIONS SERVICE */

//mock role model
jest.unstable_mockModule("../../models/roleModel.js", () => ({
  default: {
    findOne: jest.fn(),
  },
}));
//mock question model
jest.unstable_mockModule("../../models/questionModel.js", () => ({
  default: {
    find: jest.fn(),
  },
}));

const { default: Role } = await import("../../models/roleModel.js");
const { default: Question } = await import("../../models/questionModel.js");
const { getQuestionsByRole } = await import(
  "../../services/getQuestionsByRole.js"
); //this unit test is testing the questions service

//test suite with 4 test cases
describe("getQuestionsByRole service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  //test scenario 1: test if the service cleans up role inputs which are sent by the user with extra spaces
  it("trims the role input before querying", async () => {
    Role.findOne.mockResolvedValue({ name: "Scrum Product Owner" });
    Question.find.mockResolvedValue([]);

    await getQuestionsByRole("  Scrum Product Owner  ");

    expect(Role.findOne).toHaveBeenCalledTimes(1);
    expect(Role.findOne).toHaveBeenCalledWith({ name: "Scrum Product Owner" });
  });
  //test scenario 2: test if error is thrown when role does not exist
  it("throws 404 error if role does not exist", async () => {
    Role.findOne.mockResolvedValue(null);

    await expect(getQuestionsByRole("Nonexistent Role")).rejects.toMatchObject({
      statusCode: 404,
      message: "Role 'Nonexistent Role' not found",
    });

    expect(Role.findOne).toHaveBeenCalledTimes(1);
    expect(Role.findOne).toHaveBeenCalledWith({ name: "Nonexistent Role" });
    expect(Question.find).not.toHaveBeenCalled();
  });
  //test scenario 3: filters questions collection with user sent verified role
  it("returns questions filtered by role with excluded fields", async () => {
    const mockQuestions = [
      { _id: "1", question: "Q1", role: "Scrum Product Owner" },
      { _id: "2", question: "Q2", role: "Scrum Product Owner" },
    ];

    Role.findOne.mockResolvedValue({ name: "Scrum Product Owner" });
    Question.find.mockResolvedValue(mockQuestions);

    const result = await getQuestionsByRole("Scrum Product Owner");

    expect(Role.findOne).toHaveBeenCalledWith({ name: "Scrum Product Owner" });

    // matches the actual service call:
    // Question.find({ role }, { __v: 0, answer: 0, rationale: 0 })
    expect(Question.find).toHaveBeenCalledTimes(1);
    expect(Question.find).toHaveBeenCalledWith(
      { role: "Scrum Product Owner" },
      { __v: 0, answer: 0, rationale: 0 }
    );

    expect(result).toEqual(mockQuestions);
  });
  //test scenario 4: errors out when mongodb has an issue so that dependent controllers can provide 500 error code
  it("bubbles up database errors", async () => {
    Role.findOne.mockResolvedValue({ name: "Scrum Product Owner" });
    Question.find.mockRejectedValue(new Error("DB failure"));

    await expect(getQuestionsByRole("Scrum Product Owner")).rejects.toThrow(
      "DB failure"
    );

    expect(Role.findOne).toHaveBeenCalledWith({ name: "Scrum Product Owner" });
    expect(Question.find).toHaveBeenCalledTimes(1);
  });
});
