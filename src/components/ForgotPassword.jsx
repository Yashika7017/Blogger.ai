import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from "./index"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function ForgotPassword() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const forgotPassword = async(data) => {
        setError("")
        setSuccess("")
        setLoading(true)
        
        try {
            const result = await authService.forgotPassword(data.email)
            if (result.success) {
                setSuccess("Password reset instructions have been sent to your email. Please check your inbox.")
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            }
        } catch (error) {
            setError(error.message || "Failed to send password reset email. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center w-full py-20'>
            <div className={`mx-auto w-full max-w-lg bg-[#1e293b]/50 backdrop-blur-lg rounded-3xl p-10 border border-slate-700 shadow-2xl shadow-indigo-500/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold leading-tight text-indigo-400">Reset your password</h2>
                <p className="mt-2 text-center text-base text-slate-400">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                
                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p className="text-red-400 text-center text-sm">{error}</p>
                    </div>
                )}
                
                {success && (
                    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <p className="text-green-400 text-center text-sm">{success}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit(forgotPassword)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-slate-700 text-slate-200 focus:bg-[#020617] focus:border-indigo-500 outline-none transition-all duration-200"
                            {...register("email", {
                                required: "Email address is required",
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                        
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 active:scale-95"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </div>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-400">
                        Remember your password?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-indigo-500 transition-all duration-200 hover:underline hover:text-indigo-400"
                        >
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
