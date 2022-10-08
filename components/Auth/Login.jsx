import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Intro from './Intro'
import { loginUserAction, reset } from '../../store/usersSlice'
import Alert from '../Alert'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function Login()
{
    const dispatch = useDispatch()
    const router = useRouter()
    const { userAuth, loading, serverErr, appErr } = useSelector(state => state?.users);

    const [formData, setFormDate] = useState({
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
        dispatch(loginUserAction(formData))
        console.log('sssss')
    }
    // if (userAuth)
    // {
    //     dispatch(reset())
    //     router.push("/");
    // }

    return (
        <div className='login'>
            <div className="login__left">
                <Intro dir="login__left" />
            </div>
            <div className="login__right">
                <form className="login__right__form" onSubmit={submitHandler}>
                    <input type="text" placeholder='email' name="email" onChange={onChange} />
                    <input type="password" placeholder='password' name="password" onChange={onChange} />
                    <input type="submit" className='login__right__form__submit' value="login" />

                    <Link href="#">
                        <a className="login__right__form__link">
                            forgotten password
                        </a>
                    </Link>
                    <Link href="/register">
                        <a className="login__right__form__createNewAccbtn">
                            create new account
                        </a>
                    </Link>
                </form>
            </div>
            {
                serverErr || appErr ? (
                    <Alert content={appErr} type='error' />
                ) : null
            }
        </div >
    )
}
