import { Router, Request, Response } from "express";

export const auth_router = Router();

auth_router.get("/login", (req: Request, res: Response) => res.send("login"));
