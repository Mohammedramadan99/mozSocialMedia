import User from '../../../models/User';
import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import dbConnect from '../../../utils/db/dbConnect';
import Post from '../../../models/Post';
const handler = nc();

handler.put(isAuth,async (req, res) =>
{
    await dbConnect()
    //1.Find the post to be liked
    const { postId } = req?.body;
    const post = await Post.findById(postId);
    //2. Find the login user
    const loginUserId = req?.user?.id;
    console.log(req.user);
    //3. Find is this user has liked this post?
    const isLiked = post?.isLiked;
    //4.Chech if this user has dislikes this post
    const alreadyDisliked = post?.disLikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );
    //5.remove the user from dislikes array if exists
    if (alreadyDisliked)
    {
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $pull: { disLikes: loginUserId },
                isDisLiked: false,
                reactionClass: "like",
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.json(post);
    }
    //Toggle
    //Remove the user if he has liked the post
    if (isLiked)
    {
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
                reactionClass: "none",
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.json(post);
    } else
    {
        //add to likes
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { likes: loginUserId },
                isLiked: true,
                reactionClass: "like",
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.json(post);
    }
})
export default handler;


