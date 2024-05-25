function store(key: string, value:string) {
    localStorage.setItem(key, value)
}

function get(key:string) {
    return localStorage.getItem(key)
}

function remove(key:string) {
    localStorage.removeItem(key)
}

export const storage = {
    store,
    get,
    remove
}