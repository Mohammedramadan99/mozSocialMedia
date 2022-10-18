import nc from 'next-connect';

import dbConnect from '../../../../utils/db/dbConnect';
import Comment from '../../../../models/Comment';
import { isAuth } from '../../../../utils/auth';
import User from '../../../../models/User';
const handler = nc();

//----------------------------------------------------------------
// GET user details
//----------------------------------------------------------------

handler.get(async (req, res) =>
{
    await dbConnect()
    const { id } = req.query;
    //check if user id is valid
    try
    {
        const user = await User.findById(id).populate('posts')
        res.json(user);
    } catch (error)
    {
        res.json(error);
    }
})
//----------------------------------------------------------------
//CREATE POST
//----------------------------------------------------------------
// handler.use(isAuth).post(async (req, res) =>
// {
//     await dbConnect();
//     const { id } = req.user;
//     //Display message if user is blocked
//     //Check for bad words
//     const filter = new Filter();
//     const isProfane = filter.isProfane(req.body.title, req.body.description);
//     //Block user
//     if (isProfane)
//     {
//         await User.findByIdAndUpdate(id, {
//             isBlocked: true,
//         });
//         throw new Error(
//             "Creating Failed because it contains profane words and you have been blocked"
//         );
//     }

//     //Prevet user f his account is a starter account

//     //1. Get the path to img

//     try
//     {
//         // const localPath = `public/images/posts/${req.file.filename}`;
//         // const imgUploaded = await cloudinaryUploadImg(localPath);
//         // //2.Upload to cloudinary
//         const post = await Post.create({
//             ...req.body,
//             user: id,
//             // image: imgUploaded?.url,
//         });
//         console.log(post.description)
//         console.log("user" + req.user);
//         console.log("post" + post);
//         //update the user post count
//         await User.findByIdAndUpdate(
//             id,
//             {
//                 $inc: { postCount: 1 },
//             },
//             {
//                 new: true,
//             }
//         );

//         //Remove uploaded img
//         // fs.unlinkSync(localPath);
//         res.json(post);
//     } catch (error)
//     {
//         res.json(error.message);
//     }

// })

export default handler;