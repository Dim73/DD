import fs from "fs";
import express from "express";
import { MongoClient } from "mongodb";
import Schema from "./data/schema";
import GraphQLHTTP from "express-graphql";
import {graphql} from "graphql";
import {introspectionQuery} from "graphql/utilities";
import envConfig from "dotenv"

envConfig.config();
let app = express();

app.use(express.static("public"));
(async () => {
  console.log ('connecting to db');
  let db = await MongoClient.connect(process.env.MONGO_URL)
  console.log ('connected to db');
  
  let schema =  Schema(db);
  app.use("/graphql", GraphQLHTTP({
    schema,
    graphiql: true
  }))

  console.log ('reading schema...')
  let json = await graphql(schema, introspectionQuery);

  console.log ('writing json...')
  fs.writeFile("./data/schema.json", JSON.stringify(json, null, 2), (err) => {
    if (err) throw err
    console.log ('json generated')
  });

  console.log ('starting server')
  app.listen(process.env.PORT || 3030, () => console.log("server start"));


})()
