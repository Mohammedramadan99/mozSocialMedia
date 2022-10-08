import React, { useEffect, useState } from 'react'
import PeopleIcon from '@mui/icons-material/People'
import Person2Icon from '@mui/icons-material/Person2'
import MayKnow from './MayKnow'
import Followers from './Followers'
function People()
{
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
        console.log(show)

    }, [])

    return (
        <div className='People'>
            <div className="People__sidebar">
                <div className="People__sidebar__title"> people </div>
                <div className="People__sidebar__list">
                    {sidebarData?.map((p, i) => (
                        <div key={i} className={show === p.name ? `People__sidebar__list__item active` : "People__sidebar__list__item "} onClick={() => peopleHandler(p.name)}>
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
                {show === "all friends" ? "ffffffffffffffff" : show === "home" && "general"}
                {/* {show === "all friends" ? <Followers /> : show === "home" && <MayKnow />} */}
            </div>
        </div>
    )
}

export default People