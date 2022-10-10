import React, { useEffect, useState } from 'react'
import PanoramaIcon from '@mui/icons-material/Panorama';
// import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice'
import { createpostAction } from '../../store/postsSlice'
import { useDispatch, useSelector } from 'react-redux';
import UserDetails from '../UserDetails/UserDetails';
import Image from 'next/image';
import { toast } from 'react-toastify';

function WritePost({ dir, userDetails })
{
    const dispatch = useDispatch()

    const { userAuth } = useSelector(state => state.users)
    const { isCreated, loading } = useSelector(state => state.posts)
    // const { categoryList } = useSelector(state => state?.category)
    const [message, setMessage] = useState('')
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('')
    const [formData, setFormDate] = useState({
        description: "",
        category: "",
    })
    // for checking 
    const [addImg, setAddImg] = useState(false)
    // for inputs
    const [postContent, setPostContent] = useState(null)

    const createPostImagesChange = (e) =>
    {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () =>
        {
            if (Reader.readyState === 2)
            {
                setImage(Reader.result);
            }
        };
    };
    const addPhotoHandler = () =>
    {
        setAddImg(!addImg)
        addImg && setImagePreview("")
    }
    const onChange = (e) =>
    {
        setFormDate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const createPost = () =>
    {
        if (formData.description)
        {
            // const allData = new FormData();
            // allData.append("description", formData?.description);
            // allData.append("images", images);
            const all = { description: formData.description, image }
            dispatch(createpostAction(all))

        } else
        {
            setMessage("you didn't write any thing!!")
        }
    }

    useEffect(() =>
    {
        // dispatch(fetchCategoriesAction())
    }, [])
    // useEffect(() =>
    // {
    //     if (isCreated)
    //     {
    //         setImagePreview("")
    //         setFormDate({
    //             description: "",
    //             category: "",
    //         })
    //     }
    //     setAddImg(false)
    // }, [isCreated])

    // === "mainPage__middle" ? "mainPage__middle__writePost" : dir === "userDetails" && "userDetails__writePost"
    return (
        <div className={`${dir}__writePost`}>
            {/* {loading ? <p>loading ... </p> : ( */}
            <p> {message} </p>
            <>
                <div className={`${dir}__writePost__user`}>
                    <div className={`${dir}__writePost__user__img img__rounded`}>
                        {/* <Image width='100%' height="100%" src={userAuth?.profilePhoto} alt="you" /> */}
                    </div>
                    <div className={`${dir}__writePost__user__name`}>
                        {/* {dir === "userDetails" ? `${userDetails?.firstName} ${userDetails?.lastName}` : `${userAuth?.firstName} ${userAuth?.lastName}`} */}
                    </div>
                </div>
                <div className={`${dir}__writePost__top`}>
                    {addImg && (
                        <>
                            <input type="file" onChange={createPostImagesChange} />
                            {/* {imagePreview && (
                                <div className={`${dir}__writePost__top__postImg`}>
                                    <Image src={imagePreview} width="100" height="200" alt="Product Preview" />
                                </div>
                            )} */}

                        </>
                    )}

                    <div className={`${dir}__writePost__top__postContent`}>
                        <textarea placeholder='what do you want to say?' value={formData.description} name="description" onChange={onChange}></textarea>
                    </div>
                    <div className={`${dir}__writePost__top__postCategory`}>
                        {postContent || imagePreview && (
                            <select name="category" onChange={onChange}>
                                {/* {categoryList?.map(cat => <option key={cat._id} value={cat.title}> {cat.title} </option>)} */}
                            </select>
                        )}
                    </div>
                </div>
                <hr />
                <div className={`${dir}__writePost__bottom`}>
                    <div className={`${dir}__writePost__bottom__postPhoto`} onClick={addPhotoHandler} >
                        <div className={`${dir}__writePost__bottom__postPhoto__icon`}>
                            <PanoramaIcon />
                        </div>
                        photo
                    </div>
                    <button className={`${dir}__writePost__bottom__btn`} style={formData.description ? { opacity: "1" } : { opacity: ".3" }} onClick={() => createPost()}>
                        post
                    </button>
                </div>
            </>
            {/* )} */}
        </div>
    )
}

export default WritePost