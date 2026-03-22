'use client'
import { ReservationItem, RestaurantItem, UserItem } from '../../interface'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function BookingList({ reservations, isAdmin = false }
    : { reservations: ReservationItem[], isAdmin?: boolean }) {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return
        setDeletingId(id)
        const response = await fetch(`/api/reservations/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json()
        if (data.success) {
            router.refresh()
        } else {
            alert(data.message || 'Failed to delete booking')
        }
        setDeletingId(null)
    }

    if (reservations.length === 0) {
        return (
            <div className='text-center text-gray-500 py-10'>
                No bookings found.
            </div>
        )
    }

    return (
        <div className='space-y-4'>
            {reservations.map((reservation) => {
                const restaurant = reservation.restaurant as RestaurantItem
                const user = reservation.user as UserItem
                return (
                    <div key={reservation._id} className='bg-white rounded-xl border border-gray-200 p-5 shadow-sm'>
                        <div className='flex flex-row justify-between items-start'>
                            <div>
                                <h3 className='text-lg font-semibold text-gray-800'>
                                    {restaurant?.name ?? 'Restaurant'}
                                </h3>
                                <p className='text-sm text-gray-500 mt-1'>
                                    📅 {new Date(reservation.bookingDate).toLocaleDateString('en-GB', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </p>
                                {isAdmin && user?.name && (
                                    <p className='text-sm text-gray-500 mt-1'>
                                        👤 {user.name} ({user.email})
                                    </p>
                                )}
                                <p className='text-sm text-gray-400 mt-1'>
                                    📍 {restaurant?.address}
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 ml-4'>
                                <button
                                    className='rounded-md bg-sky-600 hover:bg-sky-700 px-3 py-1.5 text-white text-sm shadow-sm transition-colors'
                                    onClick={() => router.push(`/mybooking/${reservation._id}/edit`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className='rounded-md bg-red-500 hover:bg-red-600 px-3 py-1.5 text-white text-sm shadow-sm transition-colors disabled:opacity-50'
                                    onClick={() => handleDelete(reservation._id)}
                                    disabled={deletingId === reservation._id}
                                >
                                    {deletingId === reservation._id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
