import mongoose from "mongoose";
import { connectDB } from "./config/database.js";
import flashcards from "./data/flashcards.js";
import Role from "./models/roleModel.js";
import Question from "./models/questionModel.js";

connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await Role.deleteMany();
        await Question.deleteMany();

        // Build questions and roles data based on flashcards JSON object
        const questionsData = [];
        const rolesData = [];

        flashcards.forEach((item) => {
            const { role, focus, flashcards: questions } = item;
            rolesData.push({ name: role, focus, questionCount: questions.length });

            questions.forEach((q) => {
                questionsData.push({
                    question: q.question,
                    role,
                    options: q.options,
                    answer: q.answer,
                    rationale: q.rationale,
                });
            });
        });

        // Insert new data
        await Role.insertMany(rolesData);
        await Question.insertMany(questionsData);

        console.log("Data imported successfully!");
        process.exit();
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Role.deleteMany();
        await Question.deleteMany();

        console.log("Data destroyed successfully!");
        
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}