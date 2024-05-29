export type storeType = {
    id?: number,
    src: File | string,
    name: string,
    price: string,
    description: string,
    address: string,
    category: string
    phoneNumber: string,
    active?: boolean,
    image?: File | string
}

export type entity = {
    id: number,
    src: string,
    active: boolean,
    name: string,
    price: string,
}
