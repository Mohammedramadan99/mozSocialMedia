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
import { wrapper } from "../../store/store";
const Post = dynamic(() => import('./Post'))
const Spinner = dynamic(() => import('../Spinner'))

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
    const { postLists, isCreated, postCreated, loading:postloading } = useSelector(state => state.posts)
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



    const openCommentHandler = (post) =>
    {
        setShowComments({ post: post._id, status: !showComments.status })
    }
    if (!router.isFallback && !postLists)
    {
        return <div>404</div>;
    }
    return router.isFallback ? (<div>Loading...</div>)
        : (
        <div className={direction}>
                <WritePost dir={direction} userDetails={user} />
                {postloading && (
                    <div style={{position:"relative"}}>
                        <Spinner />
                    </div>
                )}
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


// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) =>
//         async ({ req, res }) =>
//         {
//             // const response = await fetch("http://localhost:3000/api/posts");
//             // const { data } = await response.json();
//             // await store.dispatch(fetchPostsAction());
//         });

export default Posts