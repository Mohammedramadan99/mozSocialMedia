import nc from 'next-connect';
// import Post from '../../../../models/Post';

import fs from "fs"
import cloudinary from 'cloudinary'
import dbConnect, { disconnect } from '../../../../utils/db/dbConnect';
import { isAuth } from '../../../../utils/auth';
import User from '../../../../models/User';
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '25mb' // Set desired value here
        }
    }
}
const handler = nc();

//----------------------------------------------------------------
// GET user details
//----------------------------------------------------------------
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
handler.use(isAuth).put(async (req, res) =>
{
    await dbConnect();
    const { _id } = req.user;
    try
    {
        let image = req.body.images[0]
        const result = await cloudinary.v2.uploader.upload(image, {
            folder: "blog",
        });


        const url = result.secure_url

        const foundUser = await User.findByIdAndUpdate(
            _id,
            {
                coverPhoto: url,
            },
            { new: true }
        );
        res.json(foundUser);
    } catch (error)
    {
        res.json(error.message);
    }
})


export default handler;