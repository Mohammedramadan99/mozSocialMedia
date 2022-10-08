import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import dbConnect, { disconnect } from '../../../utils/db/dbConnect';
import { signToken } from '../../../utils/auth';
import generateToken from '../../../utils/token/generateToken';

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
});

export default handler;