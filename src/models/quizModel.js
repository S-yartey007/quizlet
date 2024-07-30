import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
    Number : {
        type: Number,
        required: [true, "Please provide a quiz number"],
        unique: true
    },
    Question: {
        type: String,
        require: [true, "Please provide a quiz question"],
        unique: true,
    },
    Solution: {
        type: Array,
        require: [true, "Please provide the solution"],
        
    }
})

mongoose.models = {}
const Quiz = mongoose.model("quizes",quizSchema)
export default Quiz