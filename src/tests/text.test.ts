import request from "supertest";
import express from "express";
import { mockTextData } from "./mocks";
import { getTextMetrics } from "../utils/metricHelpers";

const app = express();
app.use(express.json());
app.get("/text/:id/:type", async (req, res) => {
  const mockData = mockTextData.find((dt) => dt.id === req.params.id);
  const response = getTextMetrics(mockData?.data as string, req.params.type);
  res.status(response ? 200 : 400).send({ [req.params.type]: response });
});

describe("GET /text/:id/:type", () => {
  it("should return the correct word count for a given text", async () => {
    const response = await request(app).get(
      "/text/66e1d7062dbeb87e9952f280/words"
    );
    expect(response.status).toBe(200);
    expect(response.body.words).toBe(16);
  });

  it("should return the correct character count for a given text", async () => {
    const response = await request(app).get(
      "/text/66e1d7062dbeb87e9952f280/chars"
    );
    expect(response.status).toBe(200);
    expect(response.body.chars).toBe(75);
  });

  it("should return the correct paragraph count for a given text", async () => {
    const response = await request(app).get(
      "/text/66e1d7062dbeb87e9952f280/paragraphs"
    );
    expect(response.status).toBe(200);
    expect(response.body.paragraphs).toBe(1);
  });

  it("should return the correct longest words for a given text", async () => {
    const response = await request(app).get(
      "/text/66e1d7062dbeb87e9952f280/longest-words"
    );
    expect(response.status).toBe(200);
    expect(response.body["longest-words"]).toStrictEqual(["quick", "brown", "jumps", "slept"]);
  });
});
