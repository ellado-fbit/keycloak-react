import { useHistory } from 'react-router-dom'
import { useKeycloak, useKeycloakUserInfo, useLoadSpecies } from '../hooks'

const endpointUrl = 'http://localhost:5000/species'  // species data endpoint

export const Secured = () => {
  const [keycloak, authenticated] = useKeycloak()
  const [userName, userEmail, userId] = useKeycloakUserInfo(keycloak)
  const [species] = useLoadSpecies({ endpointUrl, keycloak })
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
          <div><br/>Te has logueado!!</div>
          <div><br/>User info:<br/>(Name: {userName}) (Email: {userEmail}) (Id: {userId})</div>
          <div><br/>JWT: {keycloak.token}</div>
          <div><br/>Keycloak object keys:<br/>{Object.keys(keycloak).join(', ')}</div>
          <div><br/>Token parsed:<br/>{JSON.stringify(keycloak.tokenParsed)}</div>
          <div><br/>Id token parsed:<br/>{JSON.stringify(keycloak.idTokenParsed)}</div>
          <div><br/>Species:<br/>{species.join(', ')}</div>
          <div>
            <br/>
            <button onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      }
    </>
  )
}