import React from 'react'
import Card from '../card/Card'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'


const GraphQLHomePage = () => {
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
    const { data, loading, error } = useQuery(query);
    console.error(error);
    if (loading) return <h2>Cargando...</h2>
    if (error) return <h2>Error on fetching</h2>
    return (
        <Card
            {...data.characters.results[0]}
        />
    )
}

export default GraphQLHomePage
