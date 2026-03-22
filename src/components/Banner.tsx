'use client'
import { useState } from 'react'
import styles from './banner.module.css'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const covers = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80',
]

export default function Banner() {
    const [idx, setIdx] = useState(0)
    const { data: session } = useSession()

    return (
        <div className={styles.banner} onClick={() => setIdx((idx + 1) % covers.length)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={covers[idx]} alt='restaurant cover' className={styles.bannerimage} />
            <div className={styles.bannertext}>
                <h1 className='text-4xl font-bold mb-2'>
                    {session ? `Welcome, ${session.user?.name}!` : 'Welcome to Restaurant Booking'}
                </h1>
                <p className='text-lg mb-6 text-gray-200'>
                    Discover and reserve your perfect dining experience
                </p>
                <Link href='/restaurant' onClick={(e) => e.stopPropagation()}>
                    <button className='rounded-md bg-sky-600 hover:bg-sky-700 px-6 py-3 text-white font-medium shadow-md transition-colors'>
                        Browse Restaurants
                    </button>
                </Link>
            </div>
        </div>
    )
}
