import React, { useEffect, useState } from 'react'
import PeopleIcon from '@mui/icons-material/People'
import Person2Icon from '@mui/icons-material/Person2'
import MayKnow from '../components/People/MayKnow'
import Followers from '../components/People/Followers'
import { useDispatch } from 'react-redux'
import { fetchUsersAction } from '../store/usersSlice'
function People()
{
    const dispatch = useDispatch()
    const sidebarData = [
        {
            name: "home",
            icon: <PeopleIcon />,
        },
        {
            name: "followers",
            icon: <Person2Icon />,
        },
    ]
    const [show, setShow] = useState("home")
    const peopleHandler = name =>
    {
        setShow(name)
    }
    useEffect(() =>
    {
        dispatch(fetchUsersAction())
    }, [])
    return (
        <div className='People'>
            <div className="People__sidebar">
                <div className="People__sidebar__title"> people </div>
                <div className="People__sidebar__list">
                    {sidebarData?.map(p => (
                        <div className={show === p.name ? `People__sidebar__list__item active` : "People__sidebar__list__item "} onClick={() => peopleHandler(p.name)}>
                            <div className="People__sidebar__list__item__icon">
                                {p.icon}
                            </div>
                            <div className="People__sidebar__list__item__name">
                                {p.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="People__mainPage">
                {show === "followers" ? <Followers /> : show === "home" && <MayKnow />}
            </div>
        </div>
    )
}

export default People