'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { RestaurantItem } from '../../../interface'

export default function BookingForm({ restaurants, defaultRestaurantId }
    : { restaurants: RestaurantItem[], defaultRestaurantId: string }) {

    const router = useRouter()
    const [restaurant, setRestaurant] = useState(defaultRestaurantId || '')
    const [date, setDate] = useState<Dayjs | null>(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleBook = async () => {
        if (!restaurant || !date) {
            setError('Please select a restaurant and booking date')
            return
        }
        setLoading(true)
        setError('')
        setSuccess('')

        const response = await fetch('/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                restaurant,
                bookingDate: date.toISOString(),
            }),
        })
        const data = await response.json()
        setLoading(false)

        if (data.success) {
            setSuccess('Booking created successfully!')
            setTimeout(() => router.push('/mybooking'), 1500)
        } else {
            setError(data.message || 'Failed to create booking')
        }
    }

    return (
        <div className='w-fit space-y-4'>
            {error && <div className='text-red-500 text-sm bg-red-50 p-2 rounded'>{error}</div>}
            {success && <div className='text-green-600 text-sm bg-green-50 p-2 rounded'>{success}</div>}

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

            <button
                className='block rounded-md bg-sky-600 hover:bg-sky-700 px-4 py-2 text-white shadow-sm disabled:opacity-50 transition-colors'
                onClick={handleBook}
                disabled={loading}
            >
                {loading ? 'Booking...' : 'Book Now'}
            </button>
        </div>
    )
}
