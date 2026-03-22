import { RestaurantJson } from '../../interface'
import RestaurantCard from './RestaurantCard'

export default async function RestaurantCatalog({ restaurantsJson }: { restaurantsJson: Promise<RestaurantJson> }) {
    const restaurantsJsonReady = await restaurantsJson

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
            {
                restaurantsJsonReady.data.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))
            }
        </div>
    )
}
