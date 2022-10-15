import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersAction, followUserAction, unfollowUserAction, userProfileAction } from '../../store/usersSlice'
import Person from './Person'

function Sidebar()
{
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const [userlogged, setUserLogged] = useState({})
    const { usersList, profile,
        profileLoading,
        profileAppErr,
        profileServerErr,
        followed,
        unFollowed,
        userAuth, appErr } = users
    const [loggedIn, setLoggedIn] = useState(false)
    const usersFiltered = usersList !== {} && usersList?.filter(user => user?._id !== userAuth?._id)
    const followUserHandler = (id) =>
    {
        // dispatch(followUserAction(id))
    }
    const followStatus = (user) =>
    {
        const loggedInUser = usersList?.find(u => u?._id === userAuth?._id)
        const otherUsers = usersList !== {} && usersList?.filter(u => u?._id !== userAuth?._id)
        const status = loggedInUser?.following?.find(uId => uId === user?._id)
        console.log(status)

        // return status ? (
        //     <div className="mainPage__left__sidebar__G2__persons__person__follow common_btn" onClick={() => dispatch(followUserAction(user?._id))}> unfollow </div>
        // ) : (
        //     <div className="mainPage__left__sidebar__G2__persons__person__follow common_btn" onClick={() => dispatch(unfollowUserAction(user?._id))}> follow </div>
        // )
    }

    useEffect(() =>
    {
        const user = usersList?.find(u => u?._id === userAuth?._id)
        setUserLogged(user && user)
    }, [])

    useEffect(() =>
    {

        dispatch(fetchUsersAction(""))
        // dispatch(userProfileAction(userAuth?._id))
    }, [])
    return (
        <div className='mainPage__left__sidebar'>
            <Link href={`/user/${userAuth?._id}`}>
                <a className="mainPage__left__sidebar__G1">
                    <div className="mainPage__left__sidebar__G1__Imgs">
                        <div className="mainPage__left__sidebar__G1__Imgs__coverImg">
                            <div style={{ height: "200px" }}>
                                {userlogged?.coverPhoto && <Image src={userlogged?.coverPhoto} alt="photo" layout='fill' />}

                            </div>
                        </div>
                        <div className="mainPage__left__sidebar__G1__Imgs__profileImg img__rounded">
                            <div className="img--parent">
                                {userlogged?.profilePhoto && <Image src={userlogged?.profilePhoto} alt="photo" width={100} height={100} />}
                                {console.log(userlogged)}
                            </div>
                        </div>
                    </div>
                    <div className="mainPage__left__sidebar__G1__name">
                        {userAuth?.name}
                    </div>
                    <div className="mainPage__left__sidebar__G1__follow">
                        <div className='mainPage__left__sidebar__G1__follow__item'>
                            followers : {userlogged?.followers?.length}
                        </div>
                        <div className='mainPage__left__sidebar__G1__follow__item'>
                            following : {userlogged?.following?.length}
                        </div>
                    </div>
                </a>
            </Link>
            <hr />
            <div className="mainPage__left__sidebar__G2">
                <div className="mainPage__left__sidebar__G2__head">
                    people you may know
                </div>
                <div className="mainPage__left__sidebar__G2__persons">
                    {usersFiltered?.map((user, inx) => (
                        <Person key={inx} user={user} />
                    ))}
                    {/* {followStatus()} */}
                    <div className="mainPage__left__sidebar__G2__persons__seeMore common_btn"> more </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

    // people , personal info