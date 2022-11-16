import gql from 'graphql-tag';

// 포인트
// 포인트 내역 조회 (전체)
const QUERY_ALL_POINTS = gql`
  query pointsListForAdmin(
    $page: Int
    $take: Int
    $categories: [UseItemCategory!]
  ) {
    pointsListForAdmin(
      input: { page: $page, take: $take, categories: $categories }
    ) {
      ok
      message
      error
      nextPage
      points {
        id
        createdAt
        updatedAt
        date
        useItem
        content
        usePlace {
          name
        }
        targets {
          id
          nickname
          role
        }
        nonTargets {
          id
          nickname
        }
        targetsCnt
        nonTargetsCnt
        guests {
          nickname
        }
        totalExpense
        eachExpense
        writer {
          id
          nickname
        }
      }
    }
  }
`;

// 포인트 내역 조회 (본인 것만)
const QUERY_POINTS_LIST = gql`
  query pointsList($page: Int, $take: Int, $userId: Int) {
    pointsList(input: { page: $page, take: $take, userId: $userId }) {
      ok
      message
      error
      nextPage
      points {
        id
        createdAt
        updatedAt
        date
        useItem
        content
        usePlace {
          name
        }
        targets {
          id
          nickname
          role
        }
        guests {
          nickname
        }
        nonTargets {
          id
          nickname
        }
        targetsCnt
        nonTargetsCnt
        totalExpense
        eachExpense
        writer {
          id
          nickname
        }
      }
    }
  }
`;

// 포인트 상세 내역 조회
const QUERY_POINT_BILL = gql`
  query pointBill($id: Int!) {
    pointBill(input: { id: $id }) {
      ok
      message
      error
      point {
        id
        createdAt
        updatedAt
        date
        useItem
        content
        usePlace {
          name
        }
        targets {
          id
          nickname
          role
        }
        nonTargets {
          id
          nickname
        }
        guests {
          nickname
        }
        targetsCnt
        nonTargetsCnt
        totalExpense
        eachExpense
        writer {
          id
          nickname
        }
      }
    }
  }
`;

// 포인트 사용 내역 추가
const MUTATION_ADD_POINT_BILL = gql`
  mutation addPointBill(
    $date: DateTime!
    $useItem: UseItemCategory!
    $content: String!
    $placeName: String!
    $targets: [Int!]!
    $nonTargets: [Int!]
    $guests: [guestInputType!]
    $totalExpense: Int!
  ) {
    addPointBill(
      input: {
        date: $date
        useItem: $useItem
        content: $content
        placeName: $placeName
        targets: $targets
        nonTargets: $nonTargets
        guests: $guests
        totalExpense: $totalExpense
      }
    ) {
      ok
      message
      error
    }
  }
`;

// 포인트 사용 내역 수정
const MUTATION_UPDATE_POINT_BILL = gql`
  mutation updatePointBill(
    $id: Int!
    $date: DateTime!
    $useItem: UseItemCategory!
    $content: String!
    $placeName: String!
    $targets: [Int!]!
    $nonTargets: [Int!]
    $guests: [guestInputType!]
    $totalExpense: Int!
  ) {
    updatePointBill(
      input: {
        id: $id
        date: $date
        useItem: $useItem
        content: $content
        placeName: $placeName
        targets: $targets
        nonTargets: $nonTargets
        guests: $guests
        totalExpense: $totalExpense
      }
    ) {
      ok
      message
      error
      id
    }
  }
`;

// 포인트 사용 내역 삭제
const MUTATION_DELETE_POINT_BILL = gql`
  mutation deletePointBill($id: Int!) {
    deletePointBill(input: { id: $id }) {
      ok
      message
      error
    }
  }
`;

// 포인트 발급
const MUTATION_CREATE_POINTS = gql`
  mutation createPoints(
    $date: DateTime!
    $content: String!
    $eachExpense: Int!
    $targets: [Int!]!
  ) {
    createPoints(
      input: {
        date: $date
        content: $content
        eachExpense: $eachExpense
        targets: $targets
      }
    ) {
      ok
      message
      error
      failUsers {
        id
        reason
        name
      }
    }
  }
`;

// 포인트 보내기
const MUTATION_SEND_POINTS = gql`
  mutation sendPoints($toUserId: Int!, $amount: Int!, $message: String!) {
    sendPoints(
      input: { toUserId: $toUserId, amount: $amount, message: $message }
    ) {
      ok
      message
      error
    }
  }
`;

// 포인트 사용처 검색 조회
const QUERY_PLACE_LIST = gql`
  query placeList($seachTerm: String!) {
    placeList(input: { seachTerm: $seachTerm }) {
      ok
      message
      error
      placeList {
        id
        createdAt
        updatedAt
        name
        slug
      }
    }
  }
`;

// 포인트 레포트
const QUERY_POINT_REPORT = gql`
  query getPointReport($useItemCategory: [UseItemCategory!]!) {
    getPointReport(input: { useItemCategory: $useItemCategory }) {
      ok
      message
      error
      result {
        name
        price
      }
    }
  }
`;

export {
  QUERY_ALL_POINTS,
  QUERY_POINTS_LIST,
  QUERY_POINT_BILL,
  MUTATION_ADD_POINT_BILL,
  MUTATION_UPDATE_POINT_BILL,
  MUTATION_DELETE_POINT_BILL,
  MUTATION_CREATE_POINTS,
  MUTATION_SEND_POINTS,
  QUERY_PLACE_LIST,
  QUERY_POINT_REPORT,
};
