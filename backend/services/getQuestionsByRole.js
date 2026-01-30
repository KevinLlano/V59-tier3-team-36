import Role from "../models/roleModel.js";
import Question from "../models/questionModel.js";

export const getQuestionsByRole = async (rawRole) => {
  // 1. normalize the role input which will come from the front end user
  const role = rawRole.trim();

  // 2. find exact match based on 'role'
  const roleDoc = await Role.findOne({ name: role });

  if (!roleDoc) {
    const err = new Error(`Role '${role}' not found`);
    err.statusCode = 404;
    throw err; //error code 404 = request from user is 'valid' but the resource 'does not exist in the db'
  }

  // 3. fetch all questions for selected role
  const questions = await Question.find(
    { role: roleDoc.name }, // filtered by role where roleDoc (refer above)
    {
      answer: 0,
      rationale: 0,
      __v: 0,
    } //in projection/selection, columns - answer, rationale and _v are excluded with 0
  );

  return questions;
};
