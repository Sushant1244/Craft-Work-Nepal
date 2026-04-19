const request = require("supertest");
const app = require("../index");

describe("User Routes", () => {
  let testUser = {
    fullName: "Test User",
    email: `testuser_${Date.now()}@example.com`,
    password: "TestPass123",
  };
  let token = "";

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.email).toBe(testUser.email);
  });

  it("should login the user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should fetch user profile with token", async () => {
    const res = await request(app)
      .get("/api/auth/init")
      .set("Authorization", `Bearer ${token}`);
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.email).toBe(testUser.email);
  });
});
