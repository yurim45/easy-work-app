import gql from 'graphql-tag';

// 구매요청
// 구매요청 내역 조회
const QUERY_PURCHASE_LIST = gql`
  query getPurchaseList($page: Int, $take: Int, $isEvery: Boolean) {
    getPurchaseList(input: { page: $page, take: $take, isEvery: $isEvery }) {
      ok
      message
      error
      nextPage
      purchaseList {
        id
        createdAt
        updatedAt
        title
        category
        purchaseStatus
        contents
        items {
          name
          eachPrice
          quantity
          totalPrice
          itemUrl
        }
        writer {
          id
          nickname
        }
        finalPrice
        rejectReason
      }
    }
  }
`;

// 구매요청 상세 내역 조회
const QUERY_PURCHASE_DETAIL = gql`
  query getPurchaseDetail($id: Int!) {
    getPurchaseDetail(input: { id: $id }) {
      ok
      message
      error
      purchaseDetail {
        id
        createdAt
        updatedAt
        title
        category
        purchaseStatus
        contents
        items {
          name
          eachPrice
          quantity
          totalPrice
          itemUrl
        }
        writer {
          id
          nickname
        }
        finalPrice
        rejectReason
      }
    }
  }
`;

// 구매요청 등록
const MUTATION_REQ_PURCHASE = gql`
  mutation reqPurchase(
    $title: String!
    $category: PurchaseCategory!
    $contents: String!
    $items: [PurchaseItemsInputType!]!
  ) {
    reqPurchase(
      input: {
        title: $title
        category: $category
        contents: $contents
        items: $items
      }
    ) {
      ok
      message
      error
    }
  }
`;

// 구매요청 수정
const MUTATION_UPDATE_PURCHASE = gql`
  mutation updatePurchase(
    $id: Int!
    $title: String!
    $category: PurchaseCategory!
    $contents: String!
    $items: [PurchaseItemsInputType!]!
  ) {
    updatePurchase(
      input: {
        id: $id
        title: $title
        category: $category
        contents: $contents
        items: $items
      }
    ) {
      ok
      message
      error
    }
  }
`;

// 구매요청 신청 취소하기
const MUTATION_CANCEL_PURCHASE = gql`
  mutation cancelPurchase($purchaseId: Int!) {
    cancelPurchase(input: { purchaseId: $purchaseId }) {
      ok
      message
      error
    }
  }
`;

// 구매요청 내역 검토(승인/반려)
const MUTATION_AUDIT_PURCHASE = gql`
  mutation auditPurchase(
    $id: Int!
    $status: PurchaseStatus!
    $rejectReason: String
  ) {
    auditPurchase(
      input: { id: $id, status: $status, rejectReason: $rejectReason }
    ) {
      ok
      message
      error
    }
  }
`;

export {
  QUERY_PURCHASE_LIST,
  QUERY_PURCHASE_DETAIL,
  MUTATION_REQ_PURCHASE,
  MUTATION_UPDATE_PURCHASE,
  MUTATION_CANCEL_PURCHASE,
  MUTATION_AUDIT_PURCHASE,
};
