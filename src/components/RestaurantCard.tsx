import styles from './card.module.css'
import Link from 'next/link'
import { RestaurantItem } from '../../interface'

export default function RestaurantCard({ restaurant }: { restaurant: RestaurantItem }) {
    return (
        <Link href={`/restaurant/${restaurant._id}`}>
            <div className={styles.card}>
                <h2 className='text-lg font-semibold text-gray-800 mb-1'>{restaurant.name}</h2>
                <p className='text-sm text-gray-500 mb-1'>📍 {restaurant.address}</p>
                <p className='text-sm text-gray-500 mb-1'>📞 {restaurant.telephone}</p>
                <p className='text-sm text-sky-600'>🕐 {restaurant.open_close_time}</p>
            </div>
        </Link>
    )
}
