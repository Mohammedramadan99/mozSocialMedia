import React, { useEffect, useState } from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toggleAddLikesToPost, toggleAddDisLikesToPost, fetchPostsAction } from "../../store/postsSlice"
import { createCommentAction } from '../../store/commentSlices'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../Alert';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Spinner from '../Spinner';
const Comment = dynamic(() => import('./Comment'))

function Post({ direction, post, profile })
{
    const dispatch = useDispatch()
    const { userAuth } = useSelector(state => state.users)
    const { postLists, loading : postLoading } = useSelector(state => state.posts)
    const [commentContent, setCommentContent] = useState("")
    const comment = useSelector(state => state?.comments);
    const { loading : commentLoading, appErr, serverErr, commentCreated } = comment;
    const [showComments, setShowComments] = useState(false)
    const [showLiked, setShowLiked] = useState(false)
    const [showDisliked, setShowDisliked] = useState(false)

    const addLikeHandler = () =>
    {
        dispatch(toggleAddLikesToPost(post?._id))
    }
    const addDislikeHandler = () =>
    {
        dispatch(toggleAddDisLikesToPost(post?._id))
    }
    const addCommentHandler = (p, e) =>
    {
        e.preventDefault()
        const commentData = {
            postId: p?._id,
            user: userAuth?._id,
            description: commentContent
        }
        dispatch(createCommentAction(commentData))
        setCommentContent("")
        console.log(commentData)
    }
    useEffect(() =>
    {
        const liked = post?.likes.find(like => like === userAuth?._id)
        const disLiked = post?.disLikes.find(dislike => dislike === userAuth?._id)
        console.log(liked)
        console.log(post)
        console.log(disLiked)
        if (liked)
        {
            setShowLiked(true)
        } else
        {
            setShowLiked(false)
        }
        if (disLiked)
        {
            setShowDisliked(true)
        } else
        {
            setShowDisliked(false)
        }
    }, [post?.likes, postLists, showLiked, showDisliked])

    return (
        <div className={`${direction}__posts__container__container`} style={{position:'relative'}}>
            {postLoading && <Spinner/>}
            <div className={`${direction}__posts__container__post`}>
                <Link href={post ? `/user/${post?.user}` : profile && `/user/${profile._id}`}>
                    <a className={`${direction}__posts__container__post__userInfo`}>
                        <div className={`${direction}__posts__container__post__userInfo__img img__rounded`}>
                            {profile && profile?.profilePhoto ? <Image src={profile?.profilePhoto} width={150} height={150} alt="you" /> : <Image src={post?.user?.profilePhoto} alt="you" width={150} height={150} objectFit='cover' />}
                        </div>
                        <div className={`${direction}__posts__container__post__userInfo__name`}>
                            {post?.user?.name}
                            {profile?.name}
                        </div>
                    </a>
                </Link>
                <div className={`${direction}__posts__container__post__content`}>
                    {post?.description}
                </div>
                <div className={`${direction}__posts__container__post__img`}>
                    <div className='img--parent'>
                        {post && post?.image && <Image src={post?.image} layout="fill" objectFit='contain' alt="post img" />}
                    </div>
                </div>
                <div className={`${direction}__posts__container__post__numbers`}>
                    <div className={`${direction}__posts__container__post__numbers__likesNums"`}>
                        <div className={`${direction}__posts__container__post__numbers__commentsNums`}>
                            <span> {post?.likes?.length} <strong> like </strong> </span>
                            <span> {post?.disLikes?.length} <strong> dislike </strong> </span>
                            <span> {post?.comments?.length} <strong> comments </strong> </span>
                        </div>
                    </div>
                </div>
                <div className={`${direction}__posts__container__post__actions`}>
                    <div className={showLiked ? `${direction}__posts__container__post__actions__item active` : `${direction}__posts__container__post__actions__item`} onClick={() => addLikeHandler()}>
                        <FavoriteIcon style={showLiked ? { opacity: "1" } : { opacity: ".1" }} /> like
                    </div>
                    <div className={showDisliked ? `${direction}__posts__container__post__actions__item active` : `${direction}__posts__container__post__actions__item`} onClick={() => addDislikeHandler()}>
                        <ThumbDownOffAltIcon style={showDisliked ? { opacity: "1" } : { opacity: ".1" }} /> dislike
                    </div>
                    <div className={showComments ? `${direction}__posts__container__post__actions__item active` : `${direction}__posts__container__post__actions__item`} onClick={() => setShowComments(!showComments)}>
                        <ChatBubbleOutlineIcon /> comment
                    </div>
                </div>
            </div>
            <div className={showComments ? `${direction}__posts__container__commentsGroupe active` : `${direction}__posts__container__commentsGroupe`}>
                <div className={`${direction}__posts__container__commentsGroupe__writeComment`}>
                    <div className={`${direction}__posts__container__commentsGroupe__writeComment__userImg img__rounded`}>
                        {/* <img width="100%" height="100%" src={me} alt="img" /> */}
                    </div>
                    <form className={`${direction}__posts__container__commentsGroupe__writeComment__input`} onSubmit={(e) => addCommentHandler(post, e)}>
                        <input type="text" value={commentContent} placeholder='write a comment' onChange={e => setCommentContent(e.target.value)} />
                        <input type="submit" />
                    </form>
                </div>
                <div className={`${direction}__posts__container__commentsGroupe__comments`}>
                    {post?.comments?.map((comment, inx) => <Comment key={inx} comment={comment} />)}
                </div>
            </div>
            {/* {serverErr || appErr ? (
                <Alert content={appErr} type='error' />
            ) : null} */}
        </div>
    )
}

export default Post
