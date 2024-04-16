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
  onSuccess: any,
  onFailure: any
) {
  const body = {
    login: {
      email: email,
      password: password
    }
  }
  console.log(URL)
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
      console.log(response)
      failure(response, onFailure)
    }
  })
}

function success(response, onSuccess: (() => void)) {
  response.json().then((json) => {
    storage.store('token', json.token)
    storage.store('email', json.email)
    onSuccess()
  })
}

function failure(response: (() => void), onFailure: (() => void)) {
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

function signOut(andThen: (() => void) | null | undefined = null) {
  storage.remove('token')
  storage.remove('email')
  if (typeof andThen == 'function') {
      andThen()
  }
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
