import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { redirect } from "next/navigation"
import getReservation from "@/libs/getReservation"
import getRestaurants from "@/libs/getRestaurants"
import EditBookingForm from "./EditBookingForm"

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/login')

    const { id } = await params
    const [reservationData, restaurantsData] = await Promise.all([
        getReservation(id, session.user.token),
        getRestaurants()
    ])

    if (!reservationData.success) {
        return <div className='text-center py-10 text-red-500'>Reservation not found.</div>
    }

    return (
        <main className='w-[100%] flex flex-col items-center space-y-4 mt-10'>
            <div className='text-xl font-medium'>Edit Reservation</div>
            <EditBookingForm
                reservation={reservationData.data}
                restaurants={restaurantsData.data}
            />
        </main>
    )
}
