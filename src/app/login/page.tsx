'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter your email and password')
            return
        }
        setLoading(true)
        setError('')
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
        setLoading(false)
        if (result?.error) {
            setError('Invalid email or password')
        } else {
            router.push('/')
            router.refresh()
        }
    }

    return (
        <main className='w-[100%] flex flex-col items-center space-y-4 mt-16'>
            <div className='text-xl font-medium'>Sign In</div>

            <div className='w-80 space-y-3'>
                {error && (
                    <div className='text-red-500 text-sm bg-red-50 p-2 rounded'>{error}</div>
                )}

                <div className='flex flex-col space-y-1'>
                    <label className='text-sm text-gray-600'>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='email@example.com'
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
                    />
                </div>

                <div className='flex flex-col space-y-1'>
                    <label className='text-sm text-gray-600'>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='••••••'
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                </div>

                <button
                    className='w-full block rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2 text-white shadow-sm disabled:opacity-50 transition-colors'
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <p className='text-sm text-center text-gray-500'>
                    Don&apos;t have an account?{' '}
                    <Link href='/register' className='text-sky-600 hover:underline'>Register</Link>
                </p>
            </div>
        </main>
    )
}
