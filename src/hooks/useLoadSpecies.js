import { useState, useEffect } from 'react'
import axios from 'axios'

export const useLoadSpecies = ({ endpointUrl, keycloak }) => {
  const [species, setSpecies] = useState([])

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        const response = await axios.get(endpointUrl, {
          headers: { Authorization: `Bearer ${keycloak.token}` }
        })
        setSpecies(response.data.birds)
      } catch (error) {
        console.log(error.toString())
      }
    }

    if (keycloak) loadSpecies()

  }, [endpointUrl, keycloak])

  return [species]
}
