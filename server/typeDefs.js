const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime
  type interests {
    full_name: String
    favourite_movie: String
    favourite_book: String
    updated_at:DateTime
  }
  type Query {
    interests: interests
  }
  type Mutation {
    update_interests(interests: interestsInput): interests
  }
  input interestsInput{
      full_name:String
      favourite_movie:String
      favourite_book:String
  }
`;

module.exports = typeDefs;