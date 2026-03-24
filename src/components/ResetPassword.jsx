import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Input, Logo } from "./index"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function ResetPassword() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState("")
    const [secret, setSecret] = useState("")

    useEffect(() => {
        const userIdParam = searchParams.get('userId')
        const secretParam = searchParams.get('secret')
        
        if (!userIdParam || !secretParam) {
            setError("Invalid or expired reset link. Please request a new password reset.")
            setTimeout(() => {
                navigate("/forgot-password")
            }, 3000)
        } else {
            setUserId(userIdParam)
            setSecret(secretParam)
        }
    }, [searchParams, navigate])

    const resetPassword = async(data) => {
        if (!userId || !secret) {
            setError("Invalid reset parameters. Please try again.")
            return
        }

        setError("")
        setSuccess("")
        setLoading(true)
        
        try {
            await authService.updatePassword(userId, secret, data.password, data.confirmPassword)
            setSuccess("Password reset successful! Redirecting to login...")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } catch (error) {
            setError(error.message || "Failed to reset password. Please try again.")
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
                <h2 className="text-center text-3xl font-bold leading-tight text-indigo-400">Set new password</h2>
                <p className="mt-2 text-center text-base text-slate-400">
                    Enter your new password below.
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
                
                <form onSubmit={handleSubmit(resetPassword)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="New Password"
                            placeholder="Enter your new password"
                            type="password"
                            className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-slate-700 text-slate-200 focus:bg-[#020617] focus:border-indigo-500 outline-none transition-all duration-200"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                        )}
                        
                        <Input
                            label="Confirm New Password"
                            placeholder="Confirm your new password"
                            type="password"
                            className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-slate-700 text-slate-200 focus:bg-[#020617] focus:border-indigo-500 outline-none transition-all duration-200"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => {
                                    const password = document.querySelector('input[type="password"]')?.value
                                    return value === password || "Passwords do not match"
                                }
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                        
                        <Button
                            type="submit"
                            disabled={loading || !userId || !secret}
                            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 active:scale-95"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword
