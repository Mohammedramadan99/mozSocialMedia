import mongoose from 'mongoose';
import nc from 'next-connect';
import Post from '../../../models/Post';
import User from '../../../models/User';
import Comment from '../../../models/Comment';
import cloudinary from 'cloudinary'
import dbConnect from '../../../utils/db/dbConnect';
import { isAuth } from '../../../utils/auth';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '25mb'
        }
    }
}

const handler = nc();

//----------------------------------------------------------------
// GET POSTS
//----------------------------------------------------------------

handler.get(async (req, res) =>
{
    await dbConnect();
    const posts = await Post.find().populate('comments').populate('user')
    res.json(posts)
    await mongoose.disconnect()
;
})
//----------------------------------------------------------------
//CREATE POST
//----------------------------------------------------------------
handler.use(isAuth).post(async (req, res) =>
{
    await dbConnect();
    const { id } = req.user;
    console.log("the id == " + req.user)
    
    // Display message if user is blocked
    // Check for bad words
    // const filter = new Filter();
    // const isProfane = filter.isProfane(req.body.title, req.body.description);
    // //Block user
    // if (isProfane)
    // {
    //     await User.findByIdAndUpdate(id, {
    //         isBlocked: true,
    //     });
    //     throw new Error(
    //         "Creating Failed because it contains profane words and you have been blocked"
    //     );
    // }

    //Prevet user f his account is a starter account

    //1. Get the path to img

    try
    {
        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "blog",
        });

        const post = await Post.create({
            ...req.body,
            user: id,
            image: result.secure_url
        });
        //update the user post count
        await User.findByIdAndUpdate(
            id,
            {
                $inc: { postCount: 1 },
            },
            {
                new: true,
            }
        );

        //Remove uploaded img
        res.json(post);
    } catch (error)
    {
        res.json(error.message);
    }
})


export default handler;

// export const config = {
//     runtime: 'experimental-edge',
// }