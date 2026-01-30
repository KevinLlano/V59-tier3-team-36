import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    role: { type: String, required: true },
    options: { type: Map, of: String, required: true },
    answer: {
      type: String,
      required: true,
      validate: {
        validator: function (option) {
          return this.options?.has(option);
        },
        message: "Answer must be one of the provided options.",
      },
    },
    rationale: { type: String, required: true },
  },
  { timestamps: true }
);

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema); //OR ensures the Question model exists exactly once
export default Question;
