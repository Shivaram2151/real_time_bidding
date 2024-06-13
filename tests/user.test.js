const request = require("supertest");
const app = require("../app");
const sequelize = require("../config");

describe("User Module", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/users/register").send({
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("testuser");
  });
  it("should get user profile", async () => {
    const loginRes = await request(app)
      .post("/users/login")
      .send({ username: "testuser", password: "testpassword" });
    const token = loginRes.body.token;
    const res = await request(app)
      .get("/users/profile")
      .set("Authorization", token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.username).toHaveProperty("testuser");
  });
});
