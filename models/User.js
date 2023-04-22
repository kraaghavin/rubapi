// models/User.js
import { Schema, model } from 'mongoose';
import { hashPassword } from '../utils/password.js';

const userSchema = new Schema({
username: {
type: String,
required: true,
unique: true
},
email: {
type: String,
required: true,
unique: true
},
password: {
type: String,
required: true
},
role: {
type: String,
enum: ['user', 'admin'],
default: 'user'
},
createdAt: {
type: Date,
default: Date.now
}
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
if (this.isModified('password')) {
try {
this.password = await hashPassword(this.password);
next();
} catch (error) {
next(error);
}
} else {
next();
}
});

const User = model('User', userSchema);

// Define and export the findOne, findAll, findById, updateById and create functions

export async function findOne(query) {
try {
const user = await User.findOne(query);
return user;
} catch (error) {
console.error(error);
throw error;
}
}

export async function findAll() {
try {
const users = await User.find();
return users;
} catch (error) {
console.error(error);
throw error;
}
}

export async function findById(id) {
try {
const user = await User.findById(id);
return user;
} catch (error) {
console.error(error);
throw error;
}
}

export async function updateById(id, data) {
try {
const user = await User.findByIdAndUpdate(id, data, {
new: true,
runValidators: true
});
return user;
} catch (error) {
console.error(error);
throw error;
}
}

export async function deleteById(id, data) {
try {
const user = await User.findByIdAndDelete(id, data, {
new: true,
runValidators: true
});
return user;
} catch (error) {
console.error(error);
throw error;
}
}

export async function create(data) {
try {
const user = new User(data);
await user.save();
return user;
} catch (error) {
console.error(error);
throw error;
}
}


export default User;