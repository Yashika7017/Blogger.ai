
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full py-20'
    >
        <div className={`mx-auto w-full max-w-lg bg-[#1e293b]/50 backdrop-blur-lg rounded-3xl p-10 border border-slate-700 shadow-2xl shadow-indigo-500/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight text-indigo-400">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-slate-400">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-indigo-500 transition-all duration-200 hover:underline hover:text-indigo-400"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-slate-200 focus:bg-[#020617] focus:border-indigo-500 outline-none transition-all duration-200"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-slate-700 text-slate-200 focus:bg-[#020617] focus:border-indigo-500 outline-none transition-all duration-200"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-300  shadow-lg shadow-indigo-600/20 active:scale-95"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
