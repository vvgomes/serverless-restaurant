const serverless = require("serverless-http");
const express = require("express");
const createDatabaseClient = require("./framework/db");
const MenuItem = require("./menu.item.aggregate");

const app = express();
const db = createDatabaseClient();

const MENU_ITEMS = process.env.MENU_ITEMS_TABLE;

app.get("/menu/items", (req, res) => {
  db.all(MENU_ITEMS, menuItems => res.json(menuItems));
});

app.get("/menu/items/:id", (req, res) => {
  const success = menuItem => res.json(menuItem);
  const failure = error => res.status(404);
  db.find(MENU_ITEMS, req.params.id, success, failure);
});

module.exports.handler = serverless(app);

