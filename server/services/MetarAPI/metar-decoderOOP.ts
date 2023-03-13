class MetarDecoder {
  constructor(private metarString: string) {}
  get string() {
    return this.metarString;
  }
  getWind() {
    return (
      /[0-9]{5}KT/i.exec(this.metarString) ||
      /[0-9]{5}G[0-9]{1,2}KT/i.exec(this.metarString)
    );
  }
}

export default MetarDecoder;
