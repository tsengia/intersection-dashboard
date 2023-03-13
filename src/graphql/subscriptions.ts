/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addedIntersection = /* GraphQL */ `
  subscription AddedIntersection {
    addedIntersection {
      ble_state
      light1
      light2
      name
    }
  }
`;
export const removedIntersection = /* GraphQL */ `
  subscription RemovedIntersection {
    removedIntersection {
      ble_state
      light1
      light2
      name
    }
  }
`;
export const updatedIntersection = /* GraphQL */ `
  subscription UpdatedIntersection($name: String) {
    updatedIntersection(name: $name) {
      ble_state
      light1
      light2
      name
    }
  }
`;
