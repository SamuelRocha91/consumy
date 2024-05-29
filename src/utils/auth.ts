import { createStorage, type SimpleStorage } from './storage'
import Swal from 'sweetalert2'

class Auth {
  private storage: SimpleStorage
  static URL = import.meta.env.VITE_BASE_URL;
  static X_API_KEY = import.meta.env.VITE_X_API_KEY;

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
    fetch(`${Auth.URL}/sign_in`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'X-API-KEY': Auth.X_API_KEY
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

  async signUp(
    email: string,
    password: string,
    password_confirmation: string,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const body = {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      }
    };
    await fetch(`${Auth.URL}/new`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': Auth.X_API_KEY
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        this.success(response, onSuccess);
      } else {
        this.failure(response, onFailure);
      }
    });
  }
  
}
export { Auth }
