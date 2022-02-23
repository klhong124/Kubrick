import gql from 'graphql-tag';

export const GET_USERS = gql`
  query ExampleQuery {
  countries {
    code
    phone
    name
  }
}

`
