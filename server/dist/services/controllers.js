import { Aircraft } from "./models.js";
export async function query() {
    const result = await Aircraft.findAll({ where: {
            manufacturer: 'Cessna'
        } });
    return result;
}
