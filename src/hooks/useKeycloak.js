import { useState, useEffect } from 'react'
import Keycloak from 'keycloak-js'

export const useKeycloak = () => {
  const [keycloak, setKeycloak] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const keycloak = Keycloak('/keycloak.json')
    keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then(authenticated => {
      setKeycloak(keycloak)
      setAuthenticated(authenticated)
    }).catch(err => {
      alert(`Error initializing Keycloak: ${err.toString()}`)
    })
  }, [])

  return [keycloak, authenticated]
}
