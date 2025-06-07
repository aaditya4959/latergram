import {mongo, Schema} from 'mongoose'
import mongoose from 'mongoose';


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})


/*
For example:
'Tag' → tags
'User' → users
'Person' → people (irregular pluralization is also handled)
 */

export const UserModel = mongoose.model('User', UserSchema);  // the name of the collection will be the plural of first argument.