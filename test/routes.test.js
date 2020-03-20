const index = require("../routes/index");

const request = require("supertest");
const express = require("express");
const app = express();

app.use("/", index);

describe("Testing the routes", () => {
    test("Landing", async (done) => {
      const response = await request(app).get("/");
      //console.log(response);
      expect(response.statusCode).toBe(500);
      done();
    });

    /*test("Register", async (done) => {
        const response = await request(app).get("/register");
        //expect(response.statusCode).toBe(200);
        done();
      }, 6000);

      test("Login", async (done) => {
        const response = await request(app).get("/login");
        //expect(response.statusCode).toBe(200);
        done();
      }, 6000);

      test("Logout", async (done) => {
        const response = await request(app).get("/logout");
        //expect(response.statusCode).toBe(200);
        done();
      }, 6000);
      */

      /*test("Decorations", async (done) => {
        const response = await request(app).get("/decorations");
        expect(response.statusCode).toBe(500);
        done();
      }, 6000);
      
      test("Venues", async (done) => {
        const response = await request(app).get("/venues");
        //expect(response.statusCode).toBe(200);
        done();
      }, 6000);

      test("Catering", async (done) => {
        const response = await request(app).get("/catering");
        //expect(response.statusCode).toBe(200);
        done();
      }, 6000);*/
  });
