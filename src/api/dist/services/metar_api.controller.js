import fs from 'fs';
import { validator } from './Validation/validator.controller.js';
export async function decodeRawMetar(req, res) {
    try {
        console.log(req);
        const content = `${req.params.metarstring} from ${req.headers['x-forwarded-for']}\n`;
        fs.appendFile('file.log', content, err => {
            if (err) {
                console.error(err);
            }
            else {
                console.log('File written successfully\n'); //! remove
            }
        });
        const metarString = validator(req.params.metarstring);
        console.log(metarString);
        // const metarListRemarks: ListRemarks = splitMetarListRemarks(
        //   metarToList(metarString)
        // )
        // const metarObject = metarDecoder(metarToString(metarListRemarks.metar))
        // metarObject.tempo = metarDecoder(metarToString(metarListRemarks.tempo));
        // metarObject.becoming = metarDecoder(metarToString(metarListRemarks.becoming));
        // metarObject.remarks = metarDecoder(metarToString(metarListRemarks.remarks));
        // metarObject.flight_rule = getFlightRule(
        //   metarObject.visibility,
        //   metarObject.clouds[0].cloud_base,
        //   metarObject.visibility.unit
        // )
        // res.send({ metarJSON: metarObject })
        res.send('hi');
    }
    catch (error) {
        console.log(error);
    }
    finally {
        console.log('done');
    }
}
