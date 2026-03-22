import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { redirect } from "next/navigation"
import getReservations from "@/libs/getReservations"
import BookingList from "@/components/BookingList"

export default async function AdminBookingPage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/login')
    if (session.user.role !== 'admin') redirect('/')

    const reservationsData = await getReservations(session.user.token)

    return (
        <main className='max-w-3xl mx-auto p-6'>
            <h1 className='text-xl font-medium mb-1'>Admin — All Bookings</h1>
            <p className='text-sm text-gray-500 mb-4'>Total: {reservationsData.count} reservation(s)</p>
            <BookingList reservations={reservationsData.data} isAdmin={true} />
        </main>
    )
}
