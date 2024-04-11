export const resolvers = {
    hello() {
        return 'Hello world!'
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