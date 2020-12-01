import mongoose from "mongoose";

const { Schema } = mongoose;

const PollSchema = new Schema({
  pollName: {
    type: String,
    required: true,
    min: ["3", "name cant be shorter than 3 characters"],
    max: ["20", "name cant be longer than 20 characters"],
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  userEmails: [],
  questions: {
    type: [
      {
        questionDescription: {
          type: String,
          required: true,
          min: ["3", "name cant be shorter than 3 characters"],
          max: ["50", "name cant be longer than 20 characters"],
        },
        answers: {
          type: [
            {
              answerDescription: {
                type: String,
                required: true,
              },
              voteCount: {
                type: Number,
                required: true,
              },
            },
          ],
        },
      },
    ],
    required: true,
  },
});

export default mongoose.model('Poll', PollSchema);

