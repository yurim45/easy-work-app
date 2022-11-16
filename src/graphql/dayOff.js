import gql from 'graphql-tag';

// 휴가
// 휴가 내역 조회
const QUERY_DAYOFF_LIST = gql`
  query getDayoffList(
    $page: Int
    $take: Int
    $isEvery: Boolean
    $status: [DayoffStatus!]
  ) {
    getDayoffList(
      input: { page: $page, take: $take, isEvery: $isEvery, status: $status }
    ) {
      ok
      message
      error
      nextPage
      dayoffList {
        id
        createdAt
        updatedAt
        user {
          nickname
        }
        status
        startDate
        endDate
        category
        deductedDayoffCnt
        reason
        adjustCategory
      }
    }
  }
`;

// 휴가 상세 내역 조회
const QUERY_DAYOFF_DETAIL = gql`
  query getDayoffDetail($id: Int!) {
    getDayoffDetail(input: { id: $id }) {
      ok
      message
      error
      dayoff {
        id
        createdAt
        updatedAt
        user {
          id
          nickname
        }
        status
        startDate
        endDate
        category
        deductedDayoffCnt
        reason
        adjustCategory
        expectedDayoffCnt
      }
    }
  }
`;

// 휴가 기간 산정하기
const QUERY_HOLIDAY_CNT = gql`
  query getHolidayCnt($startDate: DateTime!, $endDate: DateTime!) {
    getHolidayCnt(input: { startDate: $startDate, endDate: $endDate }) {
      ok
      message
      error
      dayOffInfos {
        holidayCnt
        dayoffPeriodCnt
        deductedDayoffCnt
      }
    }
  }
`;

// 휴가 신청하기
const MUTATION_USE_DAYOFF = gql`
  mutation useDayoff(
    $startDate: DateTime!
    $endDate: DateTime!
    $category: DayOffCategory!
    $reason: String!
  ) {
    useDayoff(
      input: {
        startDate: $startDate
        endDate: $endDate
        category: $category
        reason: $reason
      }
    ) {
      ok
      message
      error
    }
  }
`;

// 휴가 신청 수정하기
const MUTATION_UPDATE_DAYOFF = gql`
  mutation updateDayoff(
    $id: Int!
    $startDate: DateTime!
    $endDate: DateTime!
    $category: DayOffCategory!
    $reason: String!
  ) {
    updateDayoff(
      input: {
        id: $id
        startDate: $startDate
        endDate: $endDate
        category: $category
        reason: $reason
      }
    ) {
      ok
      message
      error
    }
  }
`;

// 휴가 신청 취소하기
const MUTATION_CANCEL_DAYOFF = gql`
  mutation cancelDayoff($id: Int!) {
    cancelDayoff(input: { id: $id }) {
      ok
      message
      error
    }
  }
`;

// 휴가 내역 검토(승인/반려)
const MUTATION_AUDIT_DAYOFF = gql`
  mutation auditDayoff($dayoffId: Int!, $status: DayoffStatus!) {
    auditDayoff(input: { dayoffId: $dayoffId, status: $status }) {
      ok
      message
      error
    }
  }
`;

// 휴가 발급
const MUTATION_GIVE_DAYOFF_CNT = gql`
  mutation giveDayoffCnt($users: [GiveDayoffCntUser!]!) {
    giveDayoffCnt(input: { users: $users }) {
      ok
      message
      error
    }
  }
`;

// 특별 휴가 발급
const MUTATION_GIVE_DAYOFF = gql`
  mutation giveSpecialDayoff(
    $users: [GiveSpecialDayoffUser!]!
    $category: GiveSpecialDayoffInputCategory!
  ) {
    giveSpecialDayoff(input: { users: $users, category: $category }) {
      ok
      message
      error
      failUsers {
        id
        nickname
      }
    }
  }
`;

// 연초 정산
const MUTATION_NEWYEAR_DAYOFF = gql`
  mutation adjustNewYearDayoffCnt(
    $users: [AdjustNewYearDayoffCntUser!]!
    $year: Int!
  ) {
    adjustNewYearDayoffCnt(input: { users: $users, year: $year }) {
      ok
      message
      error
    }
  }
`;

// 휴가 상세 내역 조회
const QUERY_DAYOFF_STATUS = gql`
  query getDayoffStatus($userId: Int!, $year: Int!) {
    getDayoffStatus(input: { userId: $userId, year: $year }) {
      ok
      message
      error
      nextPage
      status {
        name
        count
      }
      specialDayoff {
        name
        count
      }
    }
  }
`;

export {
  QUERY_DAYOFF_LIST,
  QUERY_DAYOFF_DETAIL,
  QUERY_HOLIDAY_CNT,
  MUTATION_USE_DAYOFF,
  MUTATION_UPDATE_DAYOFF,
  MUTATION_CANCEL_DAYOFF,
  MUTATION_AUDIT_DAYOFF,
  MUTATION_GIVE_DAYOFF_CNT,
  MUTATION_GIVE_DAYOFF,
  MUTATION_NEWYEAR_DAYOFF,
  QUERY_DAYOFF_STATUS,
};
