import { storage } from './storage'
import Swal from 'sweetalert2'

const URL = import.meta.env.VITE_BASE_URL
console.log(URL)

type user = {
  email: string
  password: string
}

async function signIn(
  email: user['email'],
  password: user['password'],
  onSuccess: () => {},
  onFailure: () => {}
) {
  const body = {
    login: {
      email: email,
      password: password
    }
  }
  fetch(`${URL}/sign_in`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    if (response.ok) {
      success(response, onSuccess)
    } else {
      failure(response, onFailure)
    }
  })
}

function success(response: Response, onSuccess: (() => void)) {
  response.json().then((json) => {
    storage.store('token', json.token)
    storage.store('email', json.email)
    onSuccess()
  })
}

function failure(response: Response, onFailure: (() => void)) {
  onFailure()
  Swal.fire({
    title: `${response.status}`,
    text: `${response.statusText}`,
    icon: 'error',
    confirmButtonText: 'Cool'
  })
}

function isLoggedIn() {
  return Boolean(storage.get('token'))
}

function signOut(andThen = () => {} ) {
  storage.remove('token')
  storage.remove('email')
  andThen()
}

function currentUser() {
  if (!isLoggedIn()) {
    return null
  }
  return {
    email: storage.get('email')
  }
}

export const auth = {
  signIn,
  isLoggedIn,
  currentUser,
  signOut
}
