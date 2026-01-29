import { getQuestionsByRole } from "../services/getQuestionsByRole.js";

/**
 * GET /api/questions?role=... ; exports 'getQuestions'
 */
export const getQuestions = async (req, res) => {
  try {
    const role = (req.query.role || "").trim();

    // 1) handle role missing with error code 400 - user sent bad request
    if (!role) {
      return res.status(400).json({
        message: "Query parameter 'role' is required",
      });
    }

    // 2) delegate DB logic querying to service; return questions by role
    const questions = await getQuestionsByRole(role);

    // 3) return results
    return res.status(200).json(questions); // successfully returns questions by role; success code 200
  } catch (error) {
    const status = error.statusCode || 500;

    return res.status(status).json({
      message:
        status === 500
          ? "Server error while fetching questions"
          : error.message,
    });
  }
};
