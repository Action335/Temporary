import getRestaurants from "@/libs/getRestaurants"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { redirect } from "next/navigation"
import BookingForm from "./BookingForm"

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ restaurantId?: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/login')

    const restaurantsData = await getRestaurants()
    const { restaurantId } = await searchParams

    return (
        <main className='w-[100%] flex flex-col items-center space-y-4 mt-10'>
            <div className='text-xl font-medium'>New Reservation</div>
            <BookingForm
                restaurants={restaurantsData.data}
                defaultRestaurantId={restaurantId ?? ''}
            />
        </main>
    )
}
