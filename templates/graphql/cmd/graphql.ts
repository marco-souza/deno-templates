import { applyGraphQL, Context, gql, GQLError, Router } from "@deps";

const types = gql`
  type User {
    firstName: String
    lastName: String
  }

  input UserInput {
    firstName: String
    lastName: String
  }

  type ResolveType {
    done: Boolean
  }

  type Query {
    getUser(id: String): User
  }

  type Mutation {
    setUser(input: UserInput!): ResolveType!
  }
`;

interface GetUserArgs {
  id: string;
}
interface GetUserResult {
  firstName: string;
  lastName: string;
}
interface AuthContext {
  user: string;
}
const resolvers = {
  Query: {
    getUser: (parent: any, { id }: GetUserArgs, context: AuthContext, info: any): GetUserResult => {
      console.log("id", id, context);
      if (context.user === id) {
        throw new GQLError({ type: "auth error in context" });
      }
      return {
        firstName: "wooseok",
        lastName: "lee",
      };
    },
  },
  Mutation: {
    setUser: (parent: any, { input: { firstName, lastName } }: any, context: any, info: any) => {
      console.log("input:", firstName, lastName);
      return {
        done: true,
      };
    },
  },
};

export const graphqlServiceRouter = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: Context): AuthContext => {
    // this line is for passing a user context for the auth
    return { user: "Marco" };
  },
});
