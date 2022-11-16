import gql from 'graphql-tag';

// 모든 유저 가져오기
const QUERY_ALL_USERS = gql`
  query allUsers($page: Int = 1, $take: Int = 25) {
    allUsers(input: { page: $page, take: $take }) {
      ok
      message
      error
      users {
        id
        createdAt
        updatedAt
        name
        nickname
        team
        point
        dayoffCnt
        role
        birthday
        joinDay
        jobName
        pointList {
          id
        }
        dayoffList {
          id
        }
        purchaseList {
          id
        }
        specialDayoffList {
          id
          createdAt
          updatedAt
          name
          dueDate
          isActive
          period
        }
      }
    }
  }
`;

// 내 정보 가져오기
const QUERY_MY = gql`
  query my {
    my {
      ok
      message
      error
      my {
        id
        name
        nickname
        team
        point
        dayoffCnt
        role
        birthday
        joinDay
        jobName
        specialDayoffList {
          id
          createdAt
          updatedAt
          name
          dueDate
          isActive
          period
        }
      }
    }
  }
`;

// 메세지 가져오기
const QUERY_MESSAGE_LIST = gql`
  query getMessageList {
    getMessageList {
      ok
      message
      error
      messageList {
        id
        createdAt
        updatedAt
        isCheck
        text
        category
        sourceId
      }
    }
  }
`;

// 메세지 확인
const MUTATION_CHECK_MESSAGE = gql`
  mutation checkMessage($messageId: Int!) {
    checkMessage(input: { messageId: $messageId }) {
      ok
      message
      error
    }
  }
`;

export {
  QUERY_MY,
  QUERY_ALL_USERS,
  QUERY_MESSAGE_LIST,
  MUTATION_CHECK_MESSAGE,
};
