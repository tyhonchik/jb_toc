"use strict";

const { test } = require("tap");
const { build } = require("../helper");
const path = require("path");
const fs = require("fs").promises;

test("default root route", async (t) => {
  const app = await build(t);

  // Read the expected data from the data.json file
  const dataPath = path.join(__dirname, "../../routes", "data.json");
  const expectedData = JSON.parse(await fs.readFile(dataPath));

  // Perform the test
  const response = await app.inject({
    method: "GET",
    url: "/api/data",
  });

  t.equal(response.statusCode, 200, "Status code should be 200");
  t.same(
    JSON.parse(response.payload),
    expectedData,
    "Data should match the expected data"
  );
});
