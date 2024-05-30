const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../config/database"); // Adjust the path according to your project structure

describe("User Endpoints", () => {
  // beforeAll(async () => {
  //   // Ensure the database is in a clean state before running tests
  //   await sequelize.sync({ force: true });
  // });

  it("should register a new user", async () => {
    const uniqueSuffix = Date.now();
    const username = `testusershiva${uniqueSuffix}`;
    const email = `test${uniqueSuffix}@example.com`;

    const res = await request(app).post("/users/register").send({
      username: username,
      password: "testpassword",
      email: email,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should authenticate a user and return a token", async () => {
    const uniqueSuffix = Date.now();
    const username = `testusershiva${uniqueSuffix}`;
    const email = `test${uniqueSuffix}@example.com`;

    // First, register the user
    await request(app).post("/users/register").send({
      username: username,
      password: "testpassword",
      email: email,
    });

    // Then, attempt to login
    const res = await request(app).post("/users/login").send({
      username: username,
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should get the profile of the logged-in user", async () => {
    const uniqueSuffix = Date.now();
    const username = `testusershiva${uniqueSuffix}`;
    const email = `test${uniqueSuffix}@example.com`;

    // Register the user
    await request(app).post("/users/register").send({
      username: username,
      password: "testpassword",
      email: email,
    });

    // Log in the user
    const loginRes = await request(app).post("/users/login").send({
      username: username,
      password: "testpassword",
    });
    const token = loginRes.body.token;

    // Get the profile
    const res = await request(app)
      .post("/users/profile")
      .set("Authorization", `Bearer ${token}`);
    console.log("Profile data" + res.body.user);
    expect(res.statusCode).toEqual(200);
    expect(res.body.user.username).toEqual(username);
  });
});
