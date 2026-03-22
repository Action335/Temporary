import getRestaurants from "@/libs/getRestaurants"
import RestaurantCatalog from "@/components/RestaurantCatalog"

export default function RestaurantPage() {
    const restaurants = getRestaurants()

    return (
        <main className='text-center p-5'>
            <h1 className='text-xl font-medium mb-4'>All Restaurants</h1>
            <RestaurantCatalog restaurantsJson={restaurants} />
        </main>
    )
}
