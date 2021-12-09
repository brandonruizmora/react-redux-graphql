import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'


const GraphQLHomePage = () => {

    const [characters, setCharacters] = useState([])

    const query = gql`
    query {
        characters {
          results {
            name
            image
          }
        }
      }
    `
    const { data, loading, error } = useQuery(query)

    useEffect(() => {
        if (data && !loading && !error) {
            setCharacters([...data.characters.results]);
        }
    }, [data, loading, error])

    const handleLeftClick = function () {
        characters.shift();
        setCharacters([...characters]);
    }

    if (loading) return <h2>Cargando...</h2>

    return (
        <Card
            leftClick={handleLeftClick}
            {...characters[0]}
        />
    )
}

export default GraphQLHomePage
