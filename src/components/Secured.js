import { useKeycloak } from '../hooks'

export const Secured = () => {
  const [keycloak, authenticated] = useKeycloak()

  return (
    <>
      { !keycloak && <div>Iniciando Keycloak login...</div> }
      { keycloak && authenticated && <div>Te has logeado!!!</div> }
      { keycloak && !authenticated && <div>Login incorrecto!</div> }
    </>
  )
}