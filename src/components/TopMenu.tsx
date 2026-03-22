import styles from './topmenu.module.css'
import TopMenuItem from './TopMenuItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import Link from 'next/link'

export default async function TopMenu() {
    const session = await getServerSession(authOptions)

    return (
        <div className={styles.menucontainer}>
            <div className='text-sky-700 font-bold text-lg tracking-wide'>
                🍽 Restaurant Booking
            </div>

            <div className='flex flex-row absolute left-0 h-full items-center px-2'>
                {
                    session
                        ? <Link href="/api/auth/signout">
                            <div className='flex items-center h-full px-3 text-sky-600 text-sm hover:text-sky-800 transition-colors'>
                                Sign-Out ({session.user?.name})
                            </div>
                        </Link>
                        : <>
                            <Link href="/login">
                                <div className='flex items-center h-full px-3 text-sky-600 text-sm hover:text-sky-800 transition-colors'>
                                    Sign-In
                                </div>
                            </Link>
                            <Link href="/register">
                                <div className='flex items-center h-full px-3 text-sky-600 text-sm hover:text-sky-800 transition-colors'>
                                    Register
                                </div>
                            </Link>
                        </>
                }
            </div>

            <div className='flex flex-row absolute right-0 h-full items-center'>
                <TopMenuItem title='Restaurants' pageRef='/restaurant' />
                {session && <TopMenuItem title='My Booking' pageRef='/mybooking' />}
                {session && <TopMenuItem title='Book Now' pageRef='/booking' />}
                {session?.user?.role === 'admin' && (
                    <TopMenuItem title='Admin' pageRef='/admin/booking' />
                )}
            </div>
        </div>
    )
}
