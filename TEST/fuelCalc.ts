class FuelCalculator {
  constructor(
    private fuel_load: number,
    private fuel_consumption: number,
    private cruise_speed: number
  ) {}

  getFuelLoad() {
    return this.fuel_load;
  }
}

const fc = new FuelCalculator(150, 35.2, 122);
console.log(fc.getFuelLoad);
