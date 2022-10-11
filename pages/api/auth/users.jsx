import nc from 'next-connect';
import User from '../../../models/User';
import dbConnect from '../../../utils/db/dbConnect';
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