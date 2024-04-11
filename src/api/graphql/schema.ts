import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    type Query {
        hello: String!
    }

    type User {
        id: ID!
        name: String!
        aircraft: [Aircraft]
    }

    input AircraftInputData {
        _id: ID!
        name: String!
        manufacturer: String!
    }

    type Aircraft {
        id: ID!
        name: String!
        manufacturer: String!
    }

    type AircraftMutation {
        createAircraft(aircraftInput: AircraftInputData): Aircraft!
    }

    schema {
        query: Query
        mutation: AircraftMutation
    }
`)