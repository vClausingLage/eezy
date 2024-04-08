const Metar = () => {
    return (
        <div className="container flex place-content-center">
            <form>
                <input type="text" id="icoa-input" className="shadow-md" />
                <label htmlFor="icao-input">ICAO</label>
            </form>
        </div>
    )
}

export default Metar