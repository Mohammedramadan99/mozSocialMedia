import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import dbConnect from '../../../utils/db/dbConnect';
import { signToken } from '../../../utils/auth';
import generateToken from '../../../utils/token/generateToken';
import mongoose from 'mongoose';

const handler = nc();

//-------------------------------
//Login user
//-------------------------------

handler.get(async (req, res) =>
{
    await dbConnect();
    try
    {
        const users = await User.find({}).populate("posts");
        res.json(users);
    } catch (error)
    {
        res.json(error);
    }
    await mongoose.disconnect()
});

export default handler;