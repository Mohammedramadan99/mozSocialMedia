import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Intro from './Intro'
import { registerUserAction, reset } from '../../store/usersSlice'
import Link from 'next/link'
export default function Register()
{
    const dispatch = useDispatch()
    const router = useRouter()
    //select state from store
    const storeData = useSelector(store => store?.users);
    const { loading, appErr, serverErr, registered } = storeData;

    const [formData, setFormDate] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChange = (e) =>
    {
        setFormDate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const submitHandler = e =>
    {
        e.preventDefault()
        dispatch(registerUserAction(formData))
    }
    useEffect(() =>
    {
        if (registered)
        {
            dispatch(reset())
            router.push("/login");
        }
    }, [registered])

    return (
        <div className='register'>
            <div className="register__left">
                <Intro dir="register__left" />
            </div>
            <div className="register__right">
                <form className="register__right__form" onSubmit={submitHandler}>
                    <input type="text" placeholder='name' name="name" onChange={onChange} />
                    <input type="email" placeholder='email' name="email" onChange={onChange} />
                    <input type="password" placeholder='password' name="password" onChange={onChange} />
                    <input type="submit" className='register__right__form__submit' value="register" />
                    <Link href="/login">
                        <a className="register__right__form__loginPageBtn">
                            already have email , <strong>login </strong>
                        </a>
                    </Link>
                </form>
            </div>
        </div >
    )
}
