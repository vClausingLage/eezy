export function fuelCalculator(aircraft: any, length: number){ //! remove any
  console.log('hello fuel')
  let taxi = 5
  // Contingency Fuel is the higher of:
  //   5% of planned trip fuel
  //   5 minutes of flight at holding speed at 1500ft
  let reserve = aircraft.cruiseFuelConsumption * 0.75 // -> 45min
}