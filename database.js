const { MongoClient } = require("mongodb");
const { DB_USER, DB_PASS } = require("./config");

let database;

const mongoConnect = (callback) => {
  const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@laboratory.whptefg.mongodb.net/?retryWrites=true&w=majority&appName=laboratory`;
  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connection to the database has been established.");
      database = client.db("shop");
      callback();
    })
    .catch((error) => {
      console.log("Error connecting to the database:", error);
      throw error;
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("No database found.");
  }
  return database;
};

module.exports = { mongoConnect, getDatabase };
