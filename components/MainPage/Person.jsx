import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Person({ user })
{
    const users = useSelector(state => state.users)

    const { userAuth, usersList } = users

    return (
        <div className="mainPage__left__sidebar__G2__persons__person" >
            <Link href={`/user/${user?._id}`}>
                <a className="mainPage__left__sidebar__G2__persons__person__info" style={{ color: "#000" }}>
                    <div className="mainPage__left__sidebar__G2__persons__person__info__img img__rounded">
                        <div className="img--container">
                            {user?.profilePhoto  && <Image src={user?.profilePhoto} layout="fill" alt="person" />}
                        </div>
                    </div>
                    <div className="mainPage__left__sidebar__G2__persons__person__info__name">{user?.name}</div>
                </a>
            </Link>
            {/* {followStatus(user)} */} 

            <Link href={`/user/${user?._id}`} className="mainPage__left__sidebar__G2__persons__person__info__btn">
                visit
            </Link>

            {/* {!isFollowed ? (
                <div className="mainPage__left__sidebar__G2__persons__person__follow common_btn" onClick={() => dispatch(followUserAction(user?._id))}> {loading ? 'loading ...' : 'follow'} </div>
            ) : (
                <div className="mainPage__left__sidebar__G2__persons__person__follow common_btn" onClick={() => dispatch(unfollowUserAction(user?._id))}> {loading ? 'loading ...' : 'unfollow'}  </div>
            )} */}
        </div>
    )
}
