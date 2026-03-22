import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { redirect } from "next/navigation"
import getReservations from "@/libs/getReservations"
import BookingList from "@/components/BookingList"

export default async function MyBookingPage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/login')

    const reservationsData = await getReservations(session.user.token)

    return (
        <main className='max-w-2xl mx-auto p-6'>
            <h1 className='text-xl font-medium mb-4'>My Bookings</h1>
            <BookingList reservations={reservationsData.data} />
        </main>
    )
}
