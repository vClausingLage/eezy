import { Auth0Api, Auth0ClientID } from "../config/config.js";

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: Auth0Api,
  baseURL: "http://localhost:4001",
  clientID: Auth0ClientID,
  issuerBaseURL: "https://dev-lcqbfmwjn2s35t2q.us.auth0.com",
};
