import { createStorage, type SimpleStorage } from './storage'
import Swal from 'sweetalert2'

const URL = import.meta.env.VITE_BASE_URL


class Auth {
  private storage: SimpleStorage
  constructor(persistent = false) {
    this.storage = createStorage(persistent)
  }

  private getFallback(key: string): string | null {
    const transient = createStorage(false)
    const persistent = createStorage(true)
    return transient.get(key) || persistent.get(key)
  }
  success(response: Response, onSuccess: () => void) {
    response.json().then((json) => {
      this.storage.store('token', json.token)
      this.storage.store('email', json.email)
      onSuccess()
    })
  }

  failure(response: Response, onFailure: () => void) {
    onFailure()
    Swal.fire({
      title: `${response.status}`,
      text: `${response.statusText}`,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }
  currentUser() {
    if (!this.isLoggedIn()) {
      return null
    }
    return {
      email: this.getFallback('email')
    }
  }
  isLoggedIn() {
    return Boolean(this.getFallback('token'))
  }
  signOut(andThen = () => { }) {
    const transient = createStorage(false)
    const persistent = createStorage(true)
    transient.remove('token')
    transient.remove('email')
    persistent.remove('token')
    persistent.remove('email')
    andThen()
  }

  async signIn(email: string, password: string, onSuccess: () => void, onFailure: () => void) {
    const body = {
      login: {
        email: email,
        password: password
      }
    }
    fetch(`${URL}/sign_in`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess)
      } else {
        this.failure(response, onFailure)
      }
    })
  }
}
export { Auth }
