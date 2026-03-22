import getRestaurant from "@/libs/getRestaurant"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import Link from "next/link"

export default async function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const restaurantData = await getRestaurant(id)
    const session = await getServerSession(authOptions)

    if (!restaurantData.success) {
        return <div className='text-center py-10 text-red-500'>Restaurant not found.</div>
    }

    const r = restaurantData.data

    return (
        <main className='max-w-2xl mx-auto p-6'>
            <div className='bg-white rounded-xl border border-gray-200 p-8 shadow-sm'>
                <h1 className='text-2xl font-bold text-gray-800 mb-4'>{r.name}</h1>
                <div className='space-y-3 text-sm text-gray-600'>
                    <p>📍 <span className='font-medium'>Address:</span> {r.address}</p>
                    <p>📞 <span className='font-medium'>Telephone:</span> {r.telephone}</p>
                    <p>🕐 <span className='font-medium'>Hours:</span> {r.open_close_time}</p>
                </div>

                <div className='mt-6 flex gap-3'>
                    {session
                        ? <Link href={`/booking?restaurantId=${r._id}`}>
                            <button className='rounded-md bg-sky-600 hover:bg-sky-700 px-5 py-2 text-white shadow-sm transition-colors'>
                                Book This Restaurant
                            </button>
                        </Link>
                        : <Link href='/login'>
                            <button className='rounded-md bg-sky-600 hover:bg-sky-700 px-5 py-2 text-white shadow-sm transition-colors'>
                                Sign In to Book
                            </button>
                        </Link>
                    }
                    <Link href='/restaurant'>
                        <button className='rounded-md border border-gray-300 hover:bg-gray-50 px-5 py-2 text-gray-700 shadow-sm transition-colors'>
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
