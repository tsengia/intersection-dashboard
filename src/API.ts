/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Intersection = {
  __typename: "Intersection",
  ble_state: string,
  light1: string,
  light2: string,
  name: string,
};

export type AddIntersectionMutationVariables = {
  name: string,
};

export type AddIntersectionMutation = {
  addIntersection?:  {
    __typename: "Intersection",
    ble_state: string,
    light1: string,
    light2: string,
    name: string,
  } | null,
};

export type RemoveIntersectionMutationVariables = {
  name: string,
};

export type RemoveIntersectionMutation = {
  removeIntersection?:  {
    __typename: "Intersection",
    ble_state: string,
    light1: string,
    light2: string,
    name: string,
  } | null,
};

export type UpdateIntersectionMutationVariables = {
  ble_state?: string | null,
  light1?: string | null,
  light2?: string | null,
  name: string,
};

export type UpdateIntersectionMutation = {
  updateIntersection?:  {
    __typename: "Intersection",
    ble_state: string,
    light1: string,
    light2: string,
    name: string,
  } | null,
};

export type IntersectionQueryVariables = {
  name: string,
};

export type IntersectionQuery = {
  intersection?:  {
    __typename: "Intersection",
    ble_state: string,
    light1: string,
    light2: string,
    name: string,
  } | null,
};

export type IntersectionListQuery = {
  intersectionList?:  Array< {
    __typename: "Intersection",
    ble_state: string,
    light1: string,
    light2: string,
    name: string,
  } | null > | null,
};

export type AddedIntersectionSubscription = {
  addedIntersection?:  {
    __typename: "Intersection",
    ble_state: string,
    light1: string,
    light2: string,
    name: string,
  } | null,
};

export type RemovedIntersectionSubscription = {
  removedIntersection?:  {
    __typename: "Intersection",
    ble_state: string,
    light1: string,
    light2: string,
    name: string,
  } | null,
};

export type UpdatedIntersectionSubscriptionVariables = {
  name?: string | null,
};

export type UpdatedIntersectionSubscription = {
  updatedIntersection?:  {
    __typename: "Intersection",
    ble_state: string,
    light1: string,
    light2: string,
    name: string,
  } | null,
};
