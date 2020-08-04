import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  todos: Array<TodoFields>;
  todo: TodoFields;
  posts: Array<PostFields>;
  post: PostFields;
  helloLaunch: Scalars['String'];
  launches: Array<LaunchFields>;
  launch: LaunchFields;
  nextLaunch: LaunchFields;
  users: Array<UserFields>;
  testIsAuth: Scalars['String'];
  loggedUser?: Maybe<UserFields>;
};


export type QueryTodoArgs = {
  id: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryLaunchArgs = {
  flight_number: Scalars['Float'];
};

export type TodoFields = {
  __typename?: 'TodoFields';
  id: Scalars['String'];
  title: Scalars['String'];
  completed: Scalars['Boolean'];
  date: Scalars['DateTime'];
};


export type PostFields = {
  __typename?: 'PostFields';
  userId: Scalars['Int'];
  id: Scalars['Int'];
  title: Scalars['String'];
  body: Scalars['String'];
};

export type LaunchFields = {
  __typename?: 'LaunchFields';
  id?: Maybe<Scalars['String']>;
  flight_number: Scalars['Int'];
  launch_year: Scalars['String'];
  mission_name: Scalars['String'];
  launch_date_local: Scalars['String'];
  success?: Maybe<Scalars['Boolean']>;
  details?: Maybe<Scalars['String']>;
};

export type UserFields = {
  __typename?: 'UserFields';
  _id: Scalars['ID'];
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: TodoFields;
  removeTodo: TodoFields;
  updateTodo: TodoFields;
  addPost: PostFields;
  updatePost: PostFields;
  deletePost: Scalars['String'];
  revokeRefreshTokenForUser: Scalars['Boolean'];
  signup: SignupResponse;
  login: LoginResponse;
  logout: Scalars['Boolean'];
};


export type MutationAddTodoArgs = {
  title: Scalars['String'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTodoArgs = {
  completed: Scalars['Boolean'];
  title: Scalars['String'];
  id: Scalars['String'];
};


export type MutationAddPostArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  body?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationRevokeRefreshTokenForUserArgs = {
  userId: Scalars['String'];
};


export type MutationSignupArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type SignupResponse = {
  __typename?: 'SignupResponse';
  ok: Scalars['Boolean'];
  message: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  ok: Scalars['Boolean'];
  message: Scalars['String'];
  accessToken: Scalars['String'];
};

export type TestIsAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type TestIsAuthQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'testIsAuth'>
);

export type LoggedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedUserQuery = (
  { __typename?: 'Query' }
  & { loggedUser?: Maybe<(
    { __typename?: 'UserFields' }
    & Pick<UserFields, '_id' | 'email'>
  )> }
);

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'SignupResponse' }
    & Pick<SignupResponse, 'ok' | 'message'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken' | 'ok' | 'message'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'UserFields' }
    & Pick<UserFields, '_id' | 'email'>
  )> }
);


export const TestIsAuthDocument = gql`
    query TestIsAuth {
  testIsAuth
}
    `;

/**
 * __useTestIsAuthQuery__
 *
 * To run a query within a React component, call `useTestIsAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestIsAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestIsAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestIsAuthQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TestIsAuthQuery, TestIsAuthQueryVariables>) {
        return ApolloReactHooks.useQuery<TestIsAuthQuery, TestIsAuthQueryVariables>(TestIsAuthDocument, baseOptions);
      }
export function useTestIsAuthLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TestIsAuthQuery, TestIsAuthQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TestIsAuthQuery, TestIsAuthQueryVariables>(TestIsAuthDocument, baseOptions);
        }
export type TestIsAuthQueryHookResult = ReturnType<typeof useTestIsAuthQuery>;
export type TestIsAuthLazyQueryHookResult = ReturnType<typeof useTestIsAuthLazyQuery>;
export type TestIsAuthQueryResult = ApolloReactCommon.QueryResult<TestIsAuthQuery, TestIsAuthQueryVariables>;
export const LoggedUserDocument = gql`
    query LoggedUser {
  loggedUser {
    _id
    email
  }
}
    `;

/**
 * __useLoggedUserQuery__
 *
 * To run a query within a React component, call `useLoggedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LoggedUserQuery, LoggedUserQueryVariables>) {
        return ApolloReactHooks.useQuery<LoggedUserQuery, LoggedUserQueryVariables>(LoggedUserDocument, baseOptions);
      }
export function useLoggedUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoggedUserQuery, LoggedUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LoggedUserQuery, LoggedUserQueryVariables>(LoggedUserDocument, baseOptions);
        }
export type LoggedUserQueryHookResult = ReturnType<typeof useLoggedUserQuery>;
export type LoggedUserLazyQueryHookResult = ReturnType<typeof useLoggedUserLazyQuery>;
export type LoggedUserQueryResult = ApolloReactCommon.QueryResult<LoggedUserQuery, LoggedUserQueryVariables>;
export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!) {
  signup(email: $email, password: $password) {
    ok
    message
  }
}
    `;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    ok
    message
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    _id
    email
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;