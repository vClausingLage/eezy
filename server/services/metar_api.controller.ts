import { Request, Response } from "express";

export async function decodeRawMetar(req: Request, res: Response) {
  let metarString = req.params.metarstring;
  console.log("raw metar");
  console.log(req.params.metarstring);
  res.send({ input: metarString });
}
