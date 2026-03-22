export interface RestaurantItem {
    _id: string,
    name: string,
    address: string,
    telephone: string,
    open_close_time: string,
    __v: number
}

export interface RestaurantJson {
    success: boolean,
    count: number,
    data: RestaurantItem[]
}

export interface UserItem {
    _id: string,
    name: string,
    email: string,
    telephone: string,
    role: string
}

export interface ReservationItem {
    _id: string,
    bookingDate: string,
    user: UserItem | string,
    restaurant: RestaurantItem | string,
    createdAt: string
}

export interface ReservationJson {
    success: boolean,
    count: number,
    data: ReservationItem[]
}
