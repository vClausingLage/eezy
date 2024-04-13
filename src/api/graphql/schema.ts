import { buildSchema } from 'graphql'

export const testSchema = buildSchema(`
    type Query {
        hello: String!
    }

    input TestInput {
        name: String!
        age: Int!
    }

    type TestMutation {
        createMutation(input: TestInput): String!
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
        mutation: TestMutation
    }
`)