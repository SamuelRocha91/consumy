interface SimpleStorage {
  store(key: string, value: string): void
  get(key: string): string | null
  remove(key: string): void
}

class PersistentStorage implements SimpleStorage {
  store(key: string, value: string) {
    localStorage.setItem(key, value)
  }
  get(key: string) {
    return localStorage.getItem(key)
  }
  remove(key: string) {
    localStorage.removeItem(key)
  }
}

class TransientStorage implements SimpleStorage {
  store(key: string, value: string) {
    sessionStorage.setItem(key, value)
  }
  get(key: string) {
    return sessionStorage.getItem(key)
  }
  remove(key: string) {
    sessionStorage.removeItem(key)
  }
}

function createStorage(persistent: boolean): SimpleStorage {
  return persistent ? new PersistentStorage() : new TransientStorage()
}

export { createStorage, type SimpleStorage }
