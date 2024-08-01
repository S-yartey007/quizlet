import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"
import axios from "axios";

connect(process.env.MONGO_USER_URI!);

export const createUser = async() => {
    const user = await axios.post('api/users/sigup',)
}