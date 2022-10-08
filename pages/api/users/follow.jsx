import User from '../../../models/User';
import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
const handler = nc();

handler.use(isAuth).put(async (req, res) =>
{
    const { followId } = req.body;
    const loginUserId = req.user.id;
    console.log(followId)

    //find the target user and check if the login id exist
    const targetUser = await User.findById(followId);

    const alreadyFollowing = targetUser?.followers?.find(
        (user) => user?.toString() === loginUserId.toString()
    );

    if (alreadyFollowing) throw new Error("You have already followed this user");

    await User.findByIdAndUpdate(
        followId,
        {
            $push: { followers: loginUserId },
            isFollowing: true,
        },
        { new: true }
    );

    //2. Update the login user following field
    await User.findByIdAndUpdate(
        loginUserId,
        {
            $push: { following: followId },
        },
        { new: true }
    );
    res.json("You have successfully followed this user");
})
export default handler;


