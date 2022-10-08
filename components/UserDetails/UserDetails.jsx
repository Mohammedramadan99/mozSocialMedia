import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import Spinner from '../../components/Spinner'
import Posts from '../MainPage/Posts'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { fetchUsersAction, followUserAction, unfollowUserAction, uploadProfilePhototAction, uploadCoverPhototAction, reset, userProfileAction } from '../../store/usersSlice'

function UserDetails({ id })
{
    const dispatch = useDispatch()
    const [images, setImages] = useState("");
    const [imagePreview, setImagePreview] = useState("")
    //User data from store
    const users = useSelector(state => state.users);
    const [editPhoto, setEditPhoto] = useState(false)
    const [editCover, setEditCover] = useState(false)
    const {
        profile,
        profileLoading,
        profileAppErr,
        profileServerErr,
        coverPhoto,
        followed,
        unFollowed,
        userAuth,
        loading,
        profilePhoto
    } = users;
    // const { likes, dislikes } = useSelector(state => state.post)
    // const comment = useSelector(state => state?.comment);

    // const { loading, appErr, serverErr, commentCreated } = comment;


    const createPostImagesChange = (e) =>
    {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagePreview([]);

        files.forEach((file) =>
        {
            const reader = new FileReader();

            reader.onload = () =>
            {
                if (reader.readyState === 2)
                {
                    setImagePreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const uploadProfilePhoto = () =>
    {
        const theImage = { images }
        console.log(theImage)
        dispatch(uploadProfilePhototAction(theImage))
    }
    const uploladcoverPhoto = () =>
    {
        const theImage = { images }
        dispatch(uploadCoverPhototAction(theImage))
    }
    useEffect(() =>
    {
        dispatch(userProfileAction(id))
    }, [dispatch, id, followed, unFollowed])

    return loading ? <Spinner /> : (
        <div className='user'>
            <div className="user__top">
                <div className="user__top__imgs">
                    <div className="user__top__imgs__cover">
                        {profile?._id === userAuth?._id && <div className="overlay" onClick={() => setEditCover(true)} >change</div>}

                        <img src={profile?.coverPhoto} alt="" />
                    </div>
                    <div className="user__top__imgs__personalImg">
                        {profile?._id === userAuth?._id && <div className="overlay" onClick={() => setEditPhoto(true)}>change</div>}
                        <img src={profile?.profilePhoto} alt="img" />
                    </div>
                </div>
                <div className="user__top__info">
                    <div className="user__top__info__name "> {profile?.name} </div>
                    <div className="user__top__info__following">
                        {userAuth?._id !== profile?.id && (
                            profile?.isFollowing ? (
                                <div className="user__top__info__following__unFollowBtn" onClick={() => dispatch(unfollowUserAction(id))}>
                                    unFollow
                                </div>
                            ) : (
                                <div className="user__top__info__following__followBtn" onClick={() => dispatch(followUserAction(id))}>
                                    follow
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="user__bottom">
                <Sidebar profile={profile} />
                <div className="user__bottom__postsGroup">
                    <Posts direction="user__bottom__postsGroup" user={profile} />
                </div>

            </div>
            <div className={editCover ? "user__editPhoto active" : `user__editPhoto`}>
                <div className="overlay">
                    <div className="user__editPhoto__box">
                        <div className="user__editPhoto__box__closeIcon" onClick={() => setEditCover(false)}> <CloseIcon /> </div>
                        <div className="user__editPhoto__box__title">
                            edit your cover
                        </div>
                        <div className="user__editPhoto__box__editCover">
                            {imagePreview ? (
                                <div className="user__editPhoto__box__editCover__img">
                                    <img src={imagePreview} alt="Product Preview" />
                                </div>
                            ) : (
                                <input type="file" accept="image/*" onChange={createPostImagesChange} />
                            )}
                        </div>
                        <div className="user__editPhoto__box__editProfilePhoto">
                            <div className="user__editPhoto__box__editProfilePhoto__img">
                                <img src={profile?.profilePhoto} alt="profile" />
                            </div>
                        </div>

                        <div className="user__editPhoto__box__btn common_btn" onClick={() => uploladcoverPhoto()}>
                            update photos
                        </div>
                    </div>
                </div>
            </div>
            <div className={editPhoto ? "user__editPhoto active" : `user__editPhoto`}>
                <div className="overlay">
                    <div className="user__editPhoto__box">
                        <div className="user__editPhoto__box__closeIcon" onClick={() => setEditPhoto(false)}> <CloseIcon /> </div>
                        <div className="user__editPhoto__box__title">
                            edit profile photo
                        </div>
                        <div className="user__editPhoto__box__editCover">
                            <div className="user__editPhoto__box__editCover__img">
                                <img src={profile?.coverPhoto} alt="cover" />
                            </div>
                        </div>
                        <div className="user__editPhoto__box__editProfilePhoto">
                            {imagePreview ? (
                                <div className="user__editPhoto__box__editProfilePhoto__img">
                                    <img src={imagePreview} width="100" height="200" alt="Product Preview" />
                                </div>
                            ) : (
                                <input type="file" accept="image/*" onChange={createPostImagesChange} />
                            )}
                        </div>

                        <div className="user__editPhoto__box__btn common_btn" onClick={() => uploadProfilePhoto()}>
                            update photos
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserDetails