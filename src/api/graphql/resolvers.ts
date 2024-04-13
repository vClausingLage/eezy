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
    createAircraft: async function (args: any, req: any) {
        const manufacturer = args.aircraftInput.manufacturer
        const name = args.aircraftInput.name
        const aircraft = {
            manufacturer: manufacturer,
            name: name
        }
        return aircraft
        // save to db
    }
}