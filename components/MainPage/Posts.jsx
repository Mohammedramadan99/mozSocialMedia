import React, { useEffect, useState } from 'react'

import WritePost from './WritePost'
import { useSelector, useDispatch } from 'react-redux'
// import me from '../../imgs/me.jpg'
import Alert from '../Alert'
import { toggleAddLikesToPost, toggleAddDisLikesToPost, fetchPostsAction } from '../../store/postsSlice'
// import usersSlices, { userProfileAction } from '../../redux/slices/users/usersSlices'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import { createCommentAction } from '../../redux/slices/comments/commentSlices';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { userProfileAction } from '../../store/usersSlice'
import dynamic from 'next/dynamic'
const Post = dynamic(() => import('./Post'))
function Posts({ direction, user })
{
    const dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query
    const { userAuth } = useSelector(state => state.users)
    const [postLiked, setPostLiked] = useState(false)
    const [postDisLiked, setPostDisLiked] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const comment = useSelector(state => state?.comments);
    const { postLists, isCreated, postCreated } = useSelector(state => state.posts)
    const { profile } = useSelector(state => state.users)
    const { likes, dislikes } = useSelector(state => state.posts)
    const { loading, appErr, serverErr, commentCreated } = comment;
    const [showComments, setShowComments] = useState({ post: "", status: false })
    const [currPost, setCurrPost] = useState({})
    useEffect(() =>
    {
        id && dispatch(userProfileAction(id))
    }, [dispatch, id, likes, dislikes, commentCreated])

    useEffect(() =>
    {
        !id && dispatch(fetchPostsAction(""));
    }, [isCreated, postCreated, dispatch, likes, dislikes, commentCreated]);
    // post 



    const openCommentHandler = (post) =>
    {
        setShowComments({ post: post._id, status: !showComments.status })
    }




    // we need to refresh profile data if we i
    console.log(user)

    return (
        <div className={direction}>
            <WritePost dir={direction} userDetails={user} />
            {direction === "mainPage__middle" ? (
                postLists?.map(p => <Post key={p._id} post={p} direction={direction} />)

            ) : direction === "user__bottom__postsGroup" && (
                !user?.posts || user?.posts?.length === 0 ? (
                    <p style={{ textAlign: "center", textTransform: "capitalize", marginTop: "40px" }}>there is not posts yet</p>
                ) : (
                    user?.posts?.map(p => <Post key={p._id} direction={direction} profile={profile} />)
                )
            )}
        </div>
    )
}

export default Posts