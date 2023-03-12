/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addIntersection = /* GraphQL */ `
  mutation AddIntersection($name: String!) {
    addIntersection(name: $name) {
      ble_state
      light1
      light2
      name
    }
  }
`;
export const removeIntersection = /* GraphQL */ `
  mutation RemoveIntersection($name: String!) {
    removeIntersection(name: $name) {
      ble_state
      light1
      light2
      name
    }
  }
`;
export const updateIntersection = /* GraphQL */ `
  mutation UpdateIntersection(
    $ble_state: String
    $light1: String
    $light2: String
    $name: String!
  ) {
    updateIntersection(
      ble_state: $ble_state
      light1: $light1
      light2: $light2
      name: $name
    ) {
      ble_state
      light1
      light2
      name
    }
  }
`;
