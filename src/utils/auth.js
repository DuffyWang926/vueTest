import Cookies from 'js-cookie'

const AuthkeyKey = 'Admin-Authkey'

export function getAuthkey() {
  return Cookies.get(AuthkeyKey)
}

export function setAuthkey(token) {
  return Cookies.set(AuthkeyKey, token)
  console.log(AuthkeyKey)
}

export function removeAuthkey() {
  return Cookies.remove(AuthkeyKey)
}
