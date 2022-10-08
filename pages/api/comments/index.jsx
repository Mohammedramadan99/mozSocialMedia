import Comment from '../../../models/Comment';
import User from '../../../models/User';
import nc from 'next-connect';
import Filter from "bad-words"

import dbConnect from '../../../utils/db/dbConnect';
import { isAuth } from '../../../utils/auth';
const handler = nc();

//----------------------------------------------------------------
// GET POSTS
//----------------------------------------------------------------

handler.get(async (req, res) =>
{
    await dbConnect();
    try
    {
        const comments = await Comment.find({}).sort("-created");
        res.json(comments);
    } catch (error)
    {
        res.json(error);
    }
})
//----------------------------------------------------------------
//CREATE POST
//----------------------------------------------------------------
handler.use(isAuth).post(async (req, res) =>
{
    await dbConnect();
    const user = req.user;
    //Check if user is blocked
    //2.Get the post Id
    const { postId, description } = req.body;

    try
    {
        const comment = await Comment.create({
            post: postId,
            user,
            description,
        });
        res.json(comment);
    } catch (error)
    {
        res.json(error);
    }
})

export default handler;