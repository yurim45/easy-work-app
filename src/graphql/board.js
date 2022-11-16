import gql from 'graphql-tag';

// 게시판
const QUERY_GET_ALL_BOARDS = gql`
  query {
    getAllBoards {
      ok
      error
      boards {
        id
        createdAt
        updatedAt
        title
        body
      }
    }
  }
`;

const MUTATION_ADD_BOARD = gql`
  mutation addBoard($title: String!, $body: String!) {
    register(registerInput: { title: $title, body: $body }) {
      ok
      error
      board
    }
  }
`;

const MUTATION_DELETE_BOARD = gql`
  mutation deleteBoard($boardId: Float!) {
    register(registerInput: { boardId: $boardId }) {
      ok
      error
    }
  }
`;

export { QUERY_GET_ALL_BOARDS, MUTATION_ADD_BOARD, MUTATION_DELETE_BOARD };
