import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner'
export default function Comment({ comment })
{
    const {loading} = useSelector(state => state.comments)
    return (
        <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment">
            <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__img img__rounded">
                {comment?.user?.profilePhoto && <Image src={comment?.user?.profilePhoto} alt="img" width={100} height={100} />} 
            </div>
            <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__details">
                <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__details__name"> {comment?.user?.name} </div>
                <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__details__commentContent">
                    {loading ? (
                        <div style={{position:"relative"}}>
                            <Spinner />
                        </div>
                    ) : comment?.description}
                </div>
            </div>
        </div>
    )
}
