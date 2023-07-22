"use strict";
const path = require('path');
const fs = require('fs');

module.exports = async function (fastify, opts) {
  const dataPath = path.join(__dirname, "data.json");

  fastify.get("/api/data", async (request, reply) => {
    try {
      const rawData = await fs.promises.readFile(dataPath);
      const data = JSON.parse(rawData);
      return data;
    } catch (err) {
      reply.status(500).send({ error: "Failed to get data" });
    }
  });
};
