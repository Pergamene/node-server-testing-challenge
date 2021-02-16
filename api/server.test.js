const request = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');

describe('sever', () => {
  describe('GET /', () => {
    it('should return 200 OK', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });
  });

  describe("POST /hobbits", () => {
    beforeEach(async () => {
      await db("hobbits").truncate();
    });

    it("return 201 on success", async () => {
      const res = await request(server).post("/hobbits").send({ name: "gaffer" });
      expect(res.status).toBe(201);
    });

    it('should return a message saying "Hobbit created successfully"', async () => {
      const res = await request(server).post("/hobbits").send({ name: "gaffer" })
      expect(res.body.message).toBe("Hobbit created successfully");
    });

    it("add the hobbit to the db", async () => {
      const hobbitName = "gaffer";

      const existing = await db("hobbits").where({ name: hobbitName });
      expect(existing).toHaveLength(0);

      let res = await request(server).post("/hobbits").send({ name: hobbitName });
      expect(res.body.message).toBe("Hobbit created successfully");

      res = await request(server).post("/hobbits").send({ name: "sam" });
      expect(res.body.message).toBe("Hobbit created successfully");

      const inserted = await db("hobbits");
      expect(inserted).toHaveLength(2);
    });
  });
});
