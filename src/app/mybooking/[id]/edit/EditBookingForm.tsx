'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { ReservationItem, RestaurantItem } from '../../../../../interface'

export default function EditBookingForm({ reservation, restaurants }
    : { reservation: ReservationItem, restaurants: RestaurantItem[] }) {

    const router = useRouter()
    const currentRestaurant = reservation.restaurant as RestaurantItem

    const [restaurant, setRestaurant] = useState(currentRestaurant?._id ?? '')
    const [date, setDate] = useState<Dayjs | null>(dayjs(reservation.bookingDate))
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUpdate = async () => {
        if (!restaurant || !date) {
            setError('Please select a restaurant and booking date')
            return
        }
        setLoading(true)
        setError('')

        const response = await fetch(`/api/reservations/${reservation._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                restaurant,
                bookingDate: date.toISOString(),
            }),
        })
        const data = await response.json()
        setLoading(false)

        if (data.success) {
            router.push('/mybooking')
            router.refresh()
        } else {
            setError(data.message || 'Failed to update booking')
        }
    }

    return (
        <div className='w-fit space-y-4'>
            {error && <div className='text-red-500 text-sm bg-red-50 p-2 rounded'>{error}</div>}

            <div className='flex flex-col space-y-1'>
                <label className='text-sm text-gray-600'>Restaurant</label>
                <select
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}
                    className='border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 min-w-64'
                >
                    <option value=''>-- Select Restaurant --</option>
                    {restaurants.map((r) => (
                        <option key={r._id} value={r._id}>{r.name}</option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col space-y-1'>
                <label className='text-sm text-gray-600'>Booking Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        slotProps={{ textField: { size: 'small' } }}
                    />
                </LocalizationProvider>
            </div>

            <div className='flex gap-3'>
                <button
                    className='block rounded-md bg-sky-600 hover:bg-sky-700 px-4 py-2 text-white shadow-sm disabled:opacity-50 transition-colors'
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                    className='block rounded-md border border-gray-300 hover:bg-gray-50 px-4 py-2 text-gray-700 shadow-sm transition-colors'
                    onClick={() => router.back()}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
