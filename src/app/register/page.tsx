'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        if (!name || !email || !telephone || !password) {
            setError('Please fill in all fields')
            return
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address')
            return
        }

        setLoading(true)
        setError('')
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, telephone, password }),
        })
        const data = await response.json()
        setLoading(false)

        if (data.success) {
            router.push('/login')
        } else {
            setError('Registration failed. Email or telephone may already be in use.')
        }
    }

    return (
        <main className='w-[100%] flex flex-col items-center space-y-4 mt-16'>
            <div className='text-xl font-medium'>Create Account</div>

            <div className='w-80 space-y-3'>
                {error && (
                    <div className='text-red-500 text-sm bg-red-50 p-2 rounded'>{error}</div>
                )}

                <div className='flex flex-col space-y-1'>
                    <label className='text-sm text-gray-600'>Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Full Name'
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
                    />
                </div>

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
                    <label className='text-sm text-gray-600'>Telephone</label>
                    <input
                        type='text'
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        placeholder='0812345678'
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
                    />
                </div>

                <div className='flex flex-col space-y-1'>
                    <label className='text-sm text-gray-600'>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Min. 6 characters'
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
                    />
                </div>

                <button
                    className='w-full block rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-2 text-white shadow-sm disabled:opacity-50 transition-colors'
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? 'Creating account...' : 'Register'}
                </button>

                <p className='text-sm text-center text-gray-500'>
                    Already have an account?{' '}
                    <Link href='/login' className='text-sky-600 hover:underline'>Sign In</Link>
                </p>
            </div>
        </main>
    )
}
