import gql from 'graphql-tag';

// 회원가입
const MUTATION_REGISTER = gql`
  mutation register(
    $name: String!
    $nickname: String!
    $team: String!
    $email: String!
    $password: String!
    $birthday: DateTime
    $joinDay: DateTime
    $jobName: String
  ) {
    register(
      registerInput: {
        name: $name
        nickname: $nickname
        team: $team
        email: $email
        password: $password
        birthday: $birthday
        joinDay: $joinDay
        jobName: $jobName
      }
    ) {
      ok
      error
      message
    }
  }
`;

// 로그인
const MUTATION_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      message
      error
      token
      user {
        id
        name
        nickname
        team
        point
        role
        birthday
        joinDay
        jobName
      }
    }
  }
`;

// 비밀번호 변경
const MUTATION_UPDATE_PW = gql`
  mutation updatePassword($newPassword: String!) {
    updatePassword(input: { newPassword: $newPassword }) {
      ok
      message
      error
    }
  }
`;

export { MUTATION_REGISTER, MUTATION_LOGIN, MUTATION_UPDATE_PW };
