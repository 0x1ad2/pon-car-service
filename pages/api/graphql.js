import { ApolloServer, gql } from "apollo-server-micro";
import Knex from "knex";
import DataLoader from "dataloader";
import Cors from "micro-cors";

// setup connection to postgres using knex
const db = Knex({
  client: "pg",
  connection: process.env.POSTGRES_CONNECTION_STRING,
});

// graphQL schema's
const typeDefs = gql`
  type Query {
    cars(first: Int = 25, skip: Int = 0): [Car!]!
    brands(first: Int = 25, skip: Int = 0): [Brand!]!
  }
  type Brand {
    id: ID!
    name: String!
    country: String!
    cars(first: Int = 25, skip: Int = 0): [Car!]!
  }
  type Car {
    id: ID!
    name: String!
    year: String!
    brand: Brand!
  }
`;

// graphQL resolvers
const resolvers = {
  Query: {
    cars: (_parent, args, _context) => {
      return db
        .select("*")
        .from("cars")
        .orderBy("year", "desc")
        .limit(Math.min(args.first, 50))
        .offset(args.skip);
    },
    brands: (_parent, args, _context) => {
      return db
        .select("*")
        .from("brands")
        .orderBy("name", "asc")
        .limit(Math.min(args.first, 50))
        .offset(args.skip);
    },
  },

  Car: {
    id: (car, _args, _context) => car.id,
    brand: (car, _args, { loader }) => {
      return loader.brand.load(car.brand_id);
    },
  },

  Brand: {
    id: (brand, _args, _context) => brand.id,
    cars: (brand, args, _context) => {
      return db
        .select("*")
        .from("cars")
        .where({ brand_id: brand.id })
        .orderBy("year", "asc")
        .limit(Math.min(args.first, 50))
        .offset(args.skip);
    },
  },
};

// batch data loading to prevent N+1
const loader = {
  brand: new DataLoader((ids) =>
    db
      .select("*")
      .from("brands")
      .whereIn("id", ids)
      .then((rows) => ids.map((id) => rows.find((row) => row.id === id)))
  ),
};

// define allowed cors methos
const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"],
});

// make new apolloServer based on schema & resolvers
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { loader };
  },
});

// create a handler via appolo server for the /api/graphql path
const apolloHandler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(apolloHandler);
