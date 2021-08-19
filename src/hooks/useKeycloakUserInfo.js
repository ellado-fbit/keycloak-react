import { useState, useEffect } from 'react'

export const useKeycloakUserInfo = (keycloak) => {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await keycloak.loadUserInfo()
        setUserName(userInfo.name)
        setUserEmail(userInfo.email)
        setUserId(userInfo.sub)
      } catch (error) {
      }
    }
    loadUserInfo()
  }, [keycloak])

  return [userName, userEmail, userId]
}
