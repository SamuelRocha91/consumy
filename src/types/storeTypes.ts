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

export type storeRequest = {
    address: string,
    category: string,
    description: string,
    id: number,
    name: string,
    src: string,
}

export type dataStoreRequest = {
    result: {
        pagination: {
            count: number,
            current: number | null,
            next: number | null,
            pages:number,
            per_page: number,
            previous: number | null
        }
        stores: [
            {
                address: string | null,
                category: string | null,
                description: string | null,
                id: number,
                name: string | null,
                avatar_url?: string,
            }
        ]
    }
}
