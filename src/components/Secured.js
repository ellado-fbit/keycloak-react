import { useHistory } from 'react-router-dom'
import { useKeycloak, useKeycloakUserInfo } from '../hooks'

export const Secured = () => {
  const [keycloak, authenticated] = useKeycloak()
  const [userName, userEmail, userId] = useKeycloakUserInfo(keycloak)
  const history = useHistory()

  const logout = () => {
    history.push('/')
    keycloak.logout()
  }

  return (
    <>
      { !keycloak && <div>Iniciando Keycloak login...</div> }
      { keycloak && !authenticated && <div>Imposible loguearse!</div> }
      { keycloak && authenticated &&
        <div>
          <div>Te has logueado!!</div>
          <div>User info: {userName} (Email: {userEmail}) (Id: {userId})</div>
          <div>JWT: {keycloak.token}</div>
          <div>
            <button onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      }
    </>
  )
}