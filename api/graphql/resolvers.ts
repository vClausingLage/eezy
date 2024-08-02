export const resolvers = {
    hello() {
        return 'Hello world!'
    },
    createMutation(args: any, req: Request) {
        // const name = args.input.name
        // const age = args.input.age
        // console.log(name, age)
        console.log(args)
        return 'Test me!'
    },
    GetAircrafts: async function (args: any, req: any) {
        console.log(args)
        return [{ id: '1', name: 'Aircraft 1', manufacturer: 'Boeing' }]
        // fetch from db
    },
    CreateAircraft: async function ({ aircraftInput }: any, req: any) {
        console.log(aircraftInput)
        return { message: 'Aircraft created' }
        // save to db
    }
}