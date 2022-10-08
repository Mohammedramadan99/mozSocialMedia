import React from 'react'

export default function Comment({ comment })
{
    return (
        <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment">
            <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__img img__rounded">
                <img src={comment?.user?.profilePhoto} alt="img" />
            </div>
            <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__details">
                <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__details__name"> {comment?.user?.name} </div>
                <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__details__commentContent">
                    {comment?.description}
                </div>
            </div>
        </div>
    )
}
