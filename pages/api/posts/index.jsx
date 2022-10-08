import nc from 'next-connect';
import Post from '../../../models/Post';
import User from '../../../models/User';
import Comment from '../../../models/Comment';
import Filter from "bad-words"
import fs from "fs"
import cloudinary from 'cloudinary'
import dbConnect, { disconnect } from '../../../utils/db/dbConnect';
import { isAuth } from '../../../utils/auth';
import cloudinaryUploadImg from '../../../utils/cloudinary'
const handler = nc();

//----------------------------------------------------------------
// GET POSTS
//----------------------------------------------------------------

handler.get(async (req, res) =>
{
    await dbConnect();
    const posts = await Post.find({}).populate({ path: "comments", model: Comment }).populate("user")

    res.json(posts);
})
//----------------------------------------------------------------
//CREATE POST
//----------------------------------------------------------------
handler.use(isAuth).post(async (req, res) =>
{
    await dbConnect();
    const { id } = req.user;
    console.log("the id == " + req.user)
    //Display message if user is blocked
    //Check for bad words
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

        let images = [];
        if (typeof req.body.images === "string")
        {
            images.push(req.body.images);
        } else
        {
            images = req.body.images;
        }

        const imageLink = [];

        for (let i = 0; i < images?.length; i++)
        {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "blog",
            });

            imageLink.push({
                url: result.secure_url,
            });
        }

        req.body.images = imageLink;

        const url = imageLink[0].url
        const post = await Post.create({
            ...req.body,
            user: id,
            image: url
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