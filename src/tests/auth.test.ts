import request from "supertest";
import express from "express";
import { authenticateJWT } from "../middlewares/auth";

const app = express();
app.use(express.json());
app.get("/text/:id/:type", authenticateJWT, async (_req, res) => {
  res.send('Route protected');
});

describe("GET /text/:id/:type", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/text/1/words");
    expect(response.status).toBe(401);
  });
});
