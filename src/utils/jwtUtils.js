/** @format */

// ----------------------------------------------------------------------


const TOKEN_KEY = "jwtToken"

function jwtDecode(token) {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  )
  return JSON.parse(jsonPayload)
}

//---------------------------------------------------------------------------

export const getIdOrSubjectFromToken = () => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (!token) {
    return null
  }
  try {
    const decodedToken = jwtDecode(token)
    console.log(decodedToken.ID)

    return decodedToken.ID
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

//---------------------------------------------------------------------------

export const isValidToken = accessToken => {
  if (!accessToken) {
    return false
  }

  const decoded = jwtDecode(accessToken)

  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}

//---------------------------------------------------------------------------

export const isSessionTokenValid = () => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (!token) {
    return false
  }
  return isValidToken(token)
}
//---------------------------------------------------------------------------

export const saveValidToken = token => {
  if (isValidToken(token)) {
    sessionStorage.setItem(TOKEN_KEY, token)
    return true
  }
  return false
}

export const clearToken = () => {
  sessionStorage.removeItem(TOKEN_KEY)
}

export const getValidToken = () => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (isSessionTokenValid()) {
    return sessionStorage.getItem(TOKEN_KEY)
  }
  return null
}
