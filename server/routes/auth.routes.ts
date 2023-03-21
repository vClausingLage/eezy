import { Router } from "express";

export const auth_router = Router();

auth_router.get("/login", () => console.log("login"));
