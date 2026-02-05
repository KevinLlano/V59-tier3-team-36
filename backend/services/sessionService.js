import Sessions from "../models/sessionModel.js";

export const findSessionById = async (sessionId) => {
    const session = await Sessions.findById(sessionId);
    return session;
};

export const getSessionSummary = (session) => {
    const answers = session.answers ?? [];
    const totalQuestions = answers.length;
    const correctCount = answers.filter(ans => ans.isCorrect).length;
    const incorrectCount = totalQuestions - correctCount;

    return {
        totalQuestions,
        correctCount,
        incorrectCount,
        correctPercentage: totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0,
        incorrectPercentage: totalQuestions > 0 ? (incorrectCount / totalQuestions) * 100 : 0
    };
}