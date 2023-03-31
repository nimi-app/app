// @ts-nocheck
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type AbiChanged = ResolverEvent & {
  __typename?: 'AbiChanged';
  blockNumber: Scalars['Int'];
  contentType: Scalars['BigInt'];
  id: Scalars['ID'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
};

export type AbiChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  contentType?: InputMaybe<Scalars['BigInt']>;
  contentType_gt?: InputMaybe<Scalars['BigInt']>;
  contentType_gte?: InputMaybe<Scalars['BigInt']>;
  contentType_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contentType_lt?: InputMaybe<Scalars['BigInt']>;
  contentType_lte?: InputMaybe<Scalars['BigInt']>;
  contentType_not?: InputMaybe<Scalars['BigInt']>;
  contentType_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum AbiChanged_OrderBy {
  BlockNumber = 'blockNumber',
  ContentType = 'contentType',
  Id = 'id',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
}

export type Account = {
  __typename?: 'Account';
  domains: Array<Domain>;
  id: Scalars['ID'];
  registrations?: Maybe<Array<Registration>>;
  wrappedDomains?: Maybe<Array<WrappedDomain>>;
};

export type AccountDomainsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Domain_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Domain_Filter>;
};

export type AccountRegistrationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Registration_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Registration_Filter>;
};

export type AccountWrappedDomainsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrappedDomain_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WrappedDomain_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  domains_?: InputMaybe<Domain_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  registrations_?: InputMaybe<Registration_Filter>;
  wrappedDomains_?: InputMaybe<WrappedDomain_Filter>;
};

export enum Account_OrderBy {
  Domains = 'domains',
  Id = 'id',
  Registrations = 'registrations',
  WrappedDomains = 'wrappedDomains',
}

export type AddrChanged = ResolverEvent & {
  __typename?: 'AddrChanged';
  addr: Account;
  blockNumber: Scalars['Int'];
  id: Scalars['ID'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
};

export type AddrChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  addr?: InputMaybe<Scalars['String']>;
  addr_?: InputMaybe<Account_Filter>;
  addr_contains?: InputMaybe<Scalars['String']>;
  addr_contains_nocase?: InputMaybe<Scalars['String']>;
  addr_ends_with?: InputMaybe<Scalars['String']>;
  addr_ends_with_nocase?: InputMaybe<Scalars['String']>;
  addr_gt?: InputMaybe<Scalars['String']>;
  addr_gte?: InputMaybe<Scalars['String']>;
  addr_in?: InputMaybe<Array<Scalars['String']>>;
  addr_lt?: InputMaybe<Scalars['String']>;
  addr_lte?: InputMaybe<Scalars['String']>;
  addr_not?: InputMaybe<Scalars['String']>;
  addr_not_contains?: InputMaybe<Scalars['String']>;
  addr_not_contains_nocase?: InputMaybe<Scalars['String']>;
  addr_not_ends_with?: InputMaybe<Scalars['String']>;
  addr_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  addr_not_in?: InputMaybe<Array<Scalars['String']>>;
  addr_not_starts_with?: InputMaybe<Scalars['String']>;
  addr_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  addr_starts_with?: InputMaybe<Scalars['String']>;
  addr_starts_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum AddrChanged_OrderBy {
  Addr = 'addr',
  BlockNumber = 'blockNumber',
  Id = 'id',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
}

export type AuthorisationChanged = ResolverEvent & {
  __typename?: 'AuthorisationChanged';
  blockNumber: Scalars['Int'];
  id: Scalars['ID'];
  isAuthorized: Scalars['Boolean'];
  owner: Scalars['Bytes'];
  resolver: Resolver;
  target: Scalars['Bytes'];
  transactionID: Scalars['Bytes'];
};

export type AuthorisationChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isAuthorized?: InputMaybe<Scalars['Boolean']>;
  isAuthorized_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isAuthorized_not?: InputMaybe<Scalars['Boolean']>;
  isAuthorized_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['Bytes']>;
  target_contains?: InputMaybe<Scalars['Bytes']>;
  target_gt?: InputMaybe<Scalars['Bytes']>;
  target_gte?: InputMaybe<Scalars['Bytes']>;
  target_in?: InputMaybe<Array<Scalars['Bytes']>>;
  target_lt?: InputMaybe<Scalars['Bytes']>;
  target_lte?: InputMaybe<Scalars['Bytes']>;
  target_not?: InputMaybe<Scalars['Bytes']>;
  target_not_contains?: InputMaybe<Scalars['Bytes']>;
  target_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum AuthorisationChanged_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  IsAuthorized = 'isAuthorized',
  Owner = 'owner',
  Resolver = 'resolver',
  Target = 'target',
  TransactionId = 'transactionID',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type ContenthashChanged = ResolverEvent & {
  __typename?: 'ContenthashChanged';
  blockNumber: Scalars['Int'];
  hash: Scalars['Bytes'];
  id: Scalars['ID'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
};

export type ContenthashChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hash?: InputMaybe<Scalars['Bytes']>;
  hash_contains?: InputMaybe<Scalars['Bytes']>;
  hash_gt?: InputMaybe<Scalars['Bytes']>;
  hash_gte?: InputMaybe<Scalars['Bytes']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  hash_lt?: InputMaybe<Scalars['Bytes']>;
  hash_lte?: InputMaybe<Scalars['Bytes']>;
  hash_not?: InputMaybe<Scalars['Bytes']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum ContenthashChanged_OrderBy {
  BlockNumber = 'blockNumber',
  Hash = 'hash',
  Id = 'id',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
}

export type Domain = {
  __typename?: 'Domain';
  createdAt: Scalars['BigInt'];
  events: Array<DomainEvent>;
  id: Scalars['ID'];
  isMigrated: Scalars['Boolean'];
  labelName?: Maybe<Scalars['String']>;
  labelhash?: Maybe<Scalars['Bytes']>;
  name?: Maybe<Scalars['String']>;
  owner: Account;
  parent?: Maybe<Domain>;
  registration?: Maybe<Registration>;
  resolvedAddress?: Maybe<Account>;
  resolver?: Maybe<Resolver>;
  subdomainCount: Scalars['Int'];
  subdomains: Array<Domain>;
  ttl?: Maybe<Scalars['BigInt']>;
  wrappedDomain?: Maybe<WrappedDomain>;
};

export type DomainEventsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DomainEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DomainEvent_Filter>;
};

export type DomainSubdomainsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Domain_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Domain_Filter>;
};

export type DomainEvent = {
  blockNumber: Scalars['Int'];
  domain: Domain;
  id: Scalars['ID'];
  transactionID: Scalars['Bytes'];
};

export type DomainEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum DomainEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Domain = 'domain',
  Id = 'id',
  TransactionId = 'transactionID',
}

export type Domain_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  events_?: InputMaybe<DomainEvent_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isMigrated?: InputMaybe<Scalars['Boolean']>;
  isMigrated_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isMigrated_not?: InputMaybe<Scalars['Boolean']>;
  isMigrated_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  labelName?: InputMaybe<Scalars['String']>;
  labelName_contains?: InputMaybe<Scalars['String']>;
  labelName_contains_nocase?: InputMaybe<Scalars['String']>;
  labelName_ends_with?: InputMaybe<Scalars['String']>;
  labelName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  labelName_gt?: InputMaybe<Scalars['String']>;
  labelName_gte?: InputMaybe<Scalars['String']>;
  labelName_in?: InputMaybe<Array<Scalars['String']>>;
  labelName_lt?: InputMaybe<Scalars['String']>;
  labelName_lte?: InputMaybe<Scalars['String']>;
  labelName_not?: InputMaybe<Scalars['String']>;
  labelName_not_contains?: InputMaybe<Scalars['String']>;
  labelName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  labelName_not_ends_with?: InputMaybe<Scalars['String']>;
  labelName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  labelName_not_in?: InputMaybe<Array<Scalars['String']>>;
  labelName_not_starts_with?: InputMaybe<Scalars['String']>;
  labelName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  labelName_starts_with?: InputMaybe<Scalars['String']>;
  labelName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  labelhash?: InputMaybe<Scalars['Bytes']>;
  labelhash_contains?: InputMaybe<Scalars['Bytes']>;
  labelhash_gt?: InputMaybe<Scalars['Bytes']>;
  labelhash_gte?: InputMaybe<Scalars['Bytes']>;
  labelhash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  labelhash_lt?: InputMaybe<Scalars['Bytes']>;
  labelhash_lte?: InputMaybe<Scalars['Bytes']>;
  labelhash_not?: InputMaybe<Scalars['Bytes']>;
  labelhash_not_contains?: InputMaybe<Scalars['Bytes']>;
  labelhash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['String']>;
  parent_?: InputMaybe<Domain_Filter>;
  parent_contains?: InputMaybe<Scalars['String']>;
  parent_contains_nocase?: InputMaybe<Scalars['String']>;
  parent_ends_with?: InputMaybe<Scalars['String']>;
  parent_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parent_gt?: InputMaybe<Scalars['String']>;
  parent_gte?: InputMaybe<Scalars['String']>;
  parent_in?: InputMaybe<Array<Scalars['String']>>;
  parent_lt?: InputMaybe<Scalars['String']>;
  parent_lte?: InputMaybe<Scalars['String']>;
  parent_not?: InputMaybe<Scalars['String']>;
  parent_not_contains?: InputMaybe<Scalars['String']>;
  parent_not_contains_nocase?: InputMaybe<Scalars['String']>;
  parent_not_ends_with?: InputMaybe<Scalars['String']>;
  parent_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parent_not_in?: InputMaybe<Array<Scalars['String']>>;
  parent_not_starts_with?: InputMaybe<Scalars['String']>;
  parent_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parent_starts_with?: InputMaybe<Scalars['String']>;
  parent_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registration_?: InputMaybe<Registration_Filter>;
  resolvedAddress?: InputMaybe<Scalars['String']>;
  resolvedAddress_?: InputMaybe<Account_Filter>;
  resolvedAddress_contains?: InputMaybe<Scalars['String']>;
  resolvedAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  resolvedAddress_ends_with?: InputMaybe<Scalars['String']>;
  resolvedAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolvedAddress_gt?: InputMaybe<Scalars['String']>;
  resolvedAddress_gte?: InputMaybe<Scalars['String']>;
  resolvedAddress_in?: InputMaybe<Array<Scalars['String']>>;
  resolvedAddress_lt?: InputMaybe<Scalars['String']>;
  resolvedAddress_lte?: InputMaybe<Scalars['String']>;
  resolvedAddress_not?: InputMaybe<Scalars['String']>;
  resolvedAddress_not_contains?: InputMaybe<Scalars['String']>;
  resolvedAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolvedAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  resolvedAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolvedAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolvedAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  resolvedAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolvedAddress_starts_with?: InputMaybe<Scalars['String']>;
  resolvedAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subdomainCount?: InputMaybe<Scalars['Int']>;
  subdomainCount_gt?: InputMaybe<Scalars['Int']>;
  subdomainCount_gte?: InputMaybe<Scalars['Int']>;
  subdomainCount_in?: InputMaybe<Array<Scalars['Int']>>;
  subdomainCount_lt?: InputMaybe<Scalars['Int']>;
  subdomainCount_lte?: InputMaybe<Scalars['Int']>;
  subdomainCount_not?: InputMaybe<Scalars['Int']>;
  subdomainCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  subdomains_?: InputMaybe<Domain_Filter>;
  ttl?: InputMaybe<Scalars['BigInt']>;
  ttl_gt?: InputMaybe<Scalars['BigInt']>;
  ttl_gte?: InputMaybe<Scalars['BigInt']>;
  ttl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ttl_lt?: InputMaybe<Scalars['BigInt']>;
  ttl_lte?: InputMaybe<Scalars['BigInt']>;
  ttl_not?: InputMaybe<Scalars['BigInt']>;
  ttl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  wrappedDomain_?: InputMaybe<WrappedDomain_Filter>;
};

export enum Domain_OrderBy {
  CreatedAt = 'createdAt',
  Events = 'events',
  Id = 'id',
  IsMigrated = 'isMigrated',
  LabelName = 'labelName',
  Labelhash = 'labelhash',
  Name = 'name',
  Owner = 'owner',
  Parent = 'parent',
  Registration = 'registration',
  ResolvedAddress = 'resolvedAddress',
  Resolver = 'resolver',
  SubdomainCount = 'subdomainCount',
  Subdomains = 'subdomains',
  Ttl = 'ttl',
  WrappedDomain = 'wrappedDomain',
}

export type FusesSet = DomainEvent & {
  __typename?: 'FusesSet';
  blockNumber: Scalars['Int'];
  domain: Domain;
  expiry: Scalars['BigInt'];
  fuses: Scalars['BigInt'];
  id: Scalars['ID'];
  transactionID: Scalars['Bytes'];
};

export type FusesSet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  expiry?: InputMaybe<Scalars['BigInt']>;
  expiry_gt?: InputMaybe<Scalars['BigInt']>;
  expiry_gte?: InputMaybe<Scalars['BigInt']>;
  expiry_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiry_lt?: InputMaybe<Scalars['BigInt']>;
  expiry_lte?: InputMaybe<Scalars['BigInt']>;
  expiry_not?: InputMaybe<Scalars['BigInt']>;
  expiry_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fuses?: InputMaybe<Scalars['BigInt']>;
  fuses_gt?: InputMaybe<Scalars['BigInt']>;
  fuses_gte?: InputMaybe<Scalars['BigInt']>;
  fuses_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fuses_lt?: InputMaybe<Scalars['BigInt']>;
  fuses_lte?: InputMaybe<Scalars['BigInt']>;
  fuses_not?: InputMaybe<Scalars['BigInt']>;
  fuses_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum FusesSet_OrderBy {
  BlockNumber = 'blockNumber',
  Domain = 'domain',
  Expiry = 'expiry',
  Fuses = 'fuses',
  Id = 'id',
  TransactionId = 'transactionID',
}

export type InterfaceChanged = ResolverEvent & {
  __typename?: 'InterfaceChanged';
  blockNumber: Scalars['Int'];
  id: Scalars['ID'];
  implementer: Scalars['Bytes'];
  interfaceID: Scalars['Bytes'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
};

export type InterfaceChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  implementer?: InputMaybe<Scalars['Bytes']>;
  implementer_contains?: InputMaybe<Scalars['Bytes']>;
  implementer_gt?: InputMaybe<Scalars['Bytes']>;
  implementer_gte?: InputMaybe<Scalars['Bytes']>;
  implementer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  implementer_lt?: InputMaybe<Scalars['Bytes']>;
  implementer_lte?: InputMaybe<Scalars['Bytes']>;
  implementer_not?: InputMaybe<Scalars['Bytes']>;
  implementer_not_contains?: InputMaybe<Scalars['Bytes']>;
  implementer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  interfaceID?: InputMaybe<Scalars['Bytes']>;
  interfaceID_contains?: InputMaybe<Scalars['Bytes']>;
  interfaceID_gt?: InputMaybe<Scalars['Bytes']>;
  interfaceID_gte?: InputMaybe<Scalars['Bytes']>;
  interfaceID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  interfaceID_lt?: InputMaybe<Scalars['Bytes']>;
  interfaceID_lte?: InputMaybe<Scalars['Bytes']>;
  interfaceID_not?: InputMaybe<Scalars['Bytes']>;
  interfaceID_not_contains?: InputMaybe<Scalars['Bytes']>;
  interfaceID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum InterfaceChanged_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Implementer = 'implementer',
  InterfaceId = 'interfaceID',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
}

export type MulticoinAddrChanged = ResolverEvent & {
  __typename?: 'MulticoinAddrChanged';
  addr: Scalars['Bytes'];
  blockNumber: Scalars['Int'];
  coinType: Scalars['BigInt'];
  id: Scalars['ID'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
};

export type MulticoinAddrChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  addr?: InputMaybe<Scalars['Bytes']>;
  addr_contains?: InputMaybe<Scalars['Bytes']>;
  addr_gt?: InputMaybe<Scalars['Bytes']>;
  addr_gte?: InputMaybe<Scalars['Bytes']>;
  addr_in?: InputMaybe<Array<Scalars['Bytes']>>;
  addr_lt?: InputMaybe<Scalars['Bytes']>;
  addr_lte?: InputMaybe<Scalars['Bytes']>;
  addr_not?: InputMaybe<Scalars['Bytes']>;
  addr_not_contains?: InputMaybe<Scalars['Bytes']>;
  addr_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  coinType?: InputMaybe<Scalars['BigInt']>;
  coinType_gt?: InputMaybe<Scalars['BigInt']>;
  coinType_gte?: InputMaybe<Scalars['BigInt']>;
  coinType_in?: InputMaybe<Array<Scalars['BigInt']>>;
  coinType_lt?: InputMaybe<Scalars['BigInt']>;
  coinType_lte?: InputMaybe<Scalars['BigInt']>;
  coinType_not?: InputMaybe<Scalars['BigInt']>;
  coinType_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum MulticoinAddrChanged_OrderBy {
  Addr = 'addr',
  BlockNumber = 'blockNumber',
  CoinType = 'coinType',
  Id = 'id',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
}

export type NameChanged = ResolverEvent & {
  __typename?: 'NameChanged';
  blockNumber: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
};

export type NameChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum NameChanged_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Name = 'name',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
}

export type NameRegistered = RegistrationEvent & {
  __typename?: 'NameRegistered';
  blockNumber: Scalars['Int'];
  expiryDate: Scalars['BigInt'];
  id: Scalars['ID'];
  registrant: Account;
  registration: Registration;
  transactionID: Scalars['Bytes'];
};

export type NameRegistered_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  expiryDate?: InputMaybe<Scalars['BigInt']>;
  expiryDate_gt?: InputMaybe<Scalars['BigInt']>;
  expiryDate_gte?: InputMaybe<Scalars['BigInt']>;
  expiryDate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiryDate_lt?: InputMaybe<Scalars['BigInt']>;
  expiryDate_lte?: InputMaybe<Scalars['BigInt']>;
  expiryDate_not?: InputMaybe<Scalars['BigInt']>;
  expiryDate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  registrant?: InputMaybe<Scalars['String']>;
  registrant_?: InputMaybe<Account_Filter>;
  registrant_contains?: InputMaybe<Scalars['String']>;
  registrant_contains_nocase?: InputMaybe<Scalars['String']>;
  registrant_ends_with?: InputMaybe<Scalars['String']>;
  registrant_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registrant_gt?: InputMaybe<Scalars['String']>;
  registrant_gte?: InputMaybe<Scalars['String']>;
  registrant_in?: InputMaybe<Array<Scalars['String']>>;
  registrant_lt?: InputMaybe<Scalars['String']>;
  registrant_lte?: InputMaybe<Scalars['String']>;
  registrant_not?: InputMaybe<Scalars['String']>;
  registrant_not_contains?: InputMaybe<Scalars['String']>;
  registrant_not_contains_nocase?: InputMaybe<Scalars['String']>;
  registrant_not_ends_with?: InputMaybe<Scalars['String']>;
  registrant_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registrant_not_in?: InputMaybe<Array<Scalars['String']>>;
  registrant_not_starts_with?: InputMaybe<Scalars['String']>;
  registrant_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registrant_starts_with?: InputMaybe<Scalars['String']>;
  registrant_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registration?: InputMaybe<Scalars['String']>;
  registration_?: InputMaybe<Registration_Filter>;
  registration_contains?: InputMaybe<Scalars['String']>;
  registration_contains_nocase?: InputMaybe<Scalars['String']>;
  registration_ends_with?: InputMaybe<Scalars['String']>;
  registration_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registration_gt?: InputMaybe<Scalars['String']>;
  registration_gte?: InputMaybe<Scalars['String']>;
  registration_in?: InputMaybe<Array<Scalars['String']>>;
  registration_lt?: InputMaybe<Scalars['String']>;
  registration_lte?: InputMaybe<Scalars['String']>;
  registration_not?: InputMaybe<Scalars['String']>;
  registration_not_contains?: InputMaybe<Scalars['String']>;
  registration_not_contains_nocase?: InputMaybe<Scalars['String']>;
  registration_not_ends_with?: InputMaybe<Scalars['String']>;
  registration_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registration_not_in?: InputMaybe<Array<Scalars['String']>>;
  registration_not_starts_with?: InputMaybe<Scalars['String']>;
  registration_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registration_starts_with?: InputMaybe<Scalars['String']>;
  registration_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum NameRegistered_OrderBy {
  BlockNumber = 'blockNumber',
  ExpiryDate = 'expiryDate',
  Id = 'id',
  Registrant = 'registrant',
  Registration = 'registration',
  TransactionId = 'transactionID',
}

export type NameRenewed = RegistrationEvent & {
  __typename?: 'NameRenewed';
  blockNumber: Scalars['Int'];
  expiryDate: Scalars['BigInt'];
  id: Scalars['ID'];
  registration: Registration;
  transactionID: Scalars['Bytes'];
};

export type NameRenewed_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  expiryDate?: InputMaybe<Scalars['BigInt']>;
  expiryDate_gt?: InputMaybe<Scalars['BigInt']>;
  expiryDate_gte?: InputMaybe<Scalars['BigInt']>;
  expiryDate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiryDate_lt?: InputMaybe<Scalars['BigInt']>;
  expiryDate_lte?: InputMaybe<Scalars['BigInt']>;
  expiryDate_not?: InputMaybe<Scalars['BigInt']>;
  expiryDate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  registration?: InputMaybe<Scalars['String']>;
  registration_?: InputMaybe<Registration_Filter>;
  registration_contains?: InputMaybe<Scalars['String']>;
  registration_contains_nocase?: InputMaybe<Scalars['String']>;
  registration_ends_with?: InputMaybe<Scalars['String']>;
  registration_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registration_gt?: InputMaybe<Scalars['String']>;
  registration_gte?: InputMaybe<Scalars['String']>;
  registration_in?: InputMaybe<Array<Scalars['String']>>;
  registration_lt?: InputMaybe<Scalars['String']>;
  registration_lte?: InputMaybe<Scalars['String']>;
  registration_not?: InputMaybe<Scalars['String']>;
  registration_not_contains?: InputMaybe<Scalars['String']>;
  registration_not_contains_nocase?: InputMaybe<Scalars['String']>;
  registration_not_ends_with?: InputMaybe<Scalars['String']>;
  registration_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registration_not_in?: InputMaybe<Array<Scalars['String']>>;
  registration_not_starts_with?: InputMaybe<Scalars['String']>;
  registration_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registration_starts_with?: InputMaybe<Scalars['String']>;
  registration_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum NameRenewed_OrderBy {
  BlockNumber = 'blockNumber',
  ExpiryDate = 'expiryDate',
  Id = 'id',
  Registration = 'registration',
  TransactionId = 'transactionID',
}

export type NameTransferred = RegistrationEvent & {
  __typename?: 'NameTransferred';
  blockNumber: Scalars['Int'];
  id: Scalars['ID'];
  newOwner: Account;
  registration: Registration;
  transactionID: Scalars['Bytes'];
};

export type NameTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  newOwner?: InputMaybe<Scalars['String']>;
  newOwner_?: InputMaybe<Account_Filter>;
  newOwner_contains?: InputMaybe<Scalars['String']>;
  newOwner_contains_nocase?: InputMaybe<Scalars['String']>;
  newOwner_ends_with?: InputMaybe<Scalars['String']>;
  newOwner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  newOwner_gt?: InputMaybe<Scalars['String']>;
  newOwner_gte?: InputMaybe<Scalars['String']>;
  newOwner_in?: InputMaybe<Array<Scalars['String']>>;
  newOwner_lt?: InputMaybe<Scalars['String']>;
  newOwner_lte?: InputMaybe<Scalars['String']>;
  newOwner_not?: InputMaybe<Scalars['String']>;
  newOwner_not_contains?: InputMaybe<Scalars['String']>;
  newOwner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  newOwner_not_ends_with?: InputMaybe<Scalars['String']>;
  newOwner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  newOwner_not_in?: InputMaybe<Array<Scalars['String']>>;
  newOwner_not_starts_with?: InputMaybe<Scalars['String']>;
  newOwner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  newOwner_starts_with?: InputMaybe<Scalars['String']>;
  newOwner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registration?: InputMaybe<Scalars['String']>;
  registration_?: InputMaybe<Registration_Filter>;
  registration_contains?: InputMaybe<Scalars['String']>;
  registration_contains_nocase?: InputMaybe<Scalars['String']>;
  registration_ends_with?: InputMaybe<Scalars['String']>;
  registration_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registration_gt?: InputMaybe<Scalars['String']>;
  registration_gte?: InputMaybe<Scalars['String']>;
  registration_in?: InputMaybe<Array<Scalars['String']>>;
  registration_lt?: InputMaybe<Scalars['String']>;
  registration_lte?: InputMaybe<Scalars['String']>;
  registration_not?: InputMaybe<Scalars['String']>;
  registration_not_contains?: InputMaybe<Scalars['String']>;
  registration_not_contains_nocase?: InputMaybe<Scalars['String']>;
  registration_not_ends_with?: InputMaybe<Scalars['String']>;
  registration_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registration_not_in?: InputMaybe<Array<Scalars['String']>>;
  registration_not_starts_with?: InputMaybe<Scalars['String']>;
  registration_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registration_starts_with?: InputMaybe<Scalars['String']>;
  registration_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum NameTransferred_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  NewOwner = 'newOwner',
  Registration = 'registration',
  TransactionId = 'transactionID',
}

export type NameUnwrapped = DomainEvent & {
  __typename?: 'NameUnwrapped';
  blockNumber: Scalars['Int'];
  domain: Domain;
  id: Scalars['ID'];
  owner: Account;
  transactionID: Scalars['Bytes'];
};

export type NameUnwrapped_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum NameUnwrapped_OrderBy {
  BlockNumber = 'blockNumber',
  Domain = 'domain',
  Id = 'id',
  Owner = 'owner',
  TransactionId = 'transactionID',
}

export type NameWrapped = DomainEvent & {
  __typename?: 'NameWrapped';
  blockNumber: Scalars['Int'];
  domain: Domain;
  expiry: Scalars['BigInt'];
  fuses: Scalars['BigInt'];
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: Account;
  transactionID: Scalars['Bytes'];
};

export type NameWrapped_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  expiry?: InputMaybe<Scalars['BigInt']>;
  expiry_gt?: InputMaybe<Scalars['BigInt']>;
  expiry_gte?: InputMaybe<Scalars['BigInt']>;
  expiry_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiry_lt?: InputMaybe<Scalars['BigInt']>;
  expiry_lte?: InputMaybe<Scalars['BigInt']>;
  expiry_not?: InputMaybe<Scalars['BigInt']>;
  expiry_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fuses?: InputMaybe<Scalars['BigInt']>;
  fuses_gt?: InputMaybe<Scalars['BigInt']>;
  fuses_gte?: InputMaybe<Scalars['BigInt']>;
  fuses_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fuses_lt?: InputMaybe<Scalars['BigInt']>;
  fuses_lte?: InputMaybe<Scalars['BigInt']>;
  fuses_not?: InputMaybe<Scalars['BigInt']>;
  fuses_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum NameWrapped_OrderBy {
  BlockNumber = 'blockNumber',
  Domain = 'domain',
  Expiry = 'expiry',
  Fuses = 'fuses',
  Id = 'id',
  Name = 'name',
  Owner = 'owner',
  TransactionId = 'transactionID',
}

export type NewOwner = DomainEvent & {
  __typename?: 'NewOwner';
  blockNumber: Scalars['Int'];
  domain: Domain;
  id: Scalars['ID'];
  owner: Account;
  parentDomain: Domain;
  transactionID: Scalars['Bytes'];
};

export type NewOwner_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parentDomain?: InputMaybe<Scalars['String']>;
  parentDomain_?: InputMaybe<Domain_Filter>;
  parentDomain_contains?: InputMaybe<Scalars['String']>;
  parentDomain_contains_nocase?: InputMaybe<Scalars['String']>;
  parentDomain_ends_with?: InputMaybe<Scalars['String']>;
  parentDomain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parentDomain_gt?: InputMaybe<Scalars['String']>;
  parentDomain_gte?: InputMaybe<Scalars['String']>;
  parentDomain_in?: InputMaybe<Array<Scalars['String']>>;
  parentDomain_lt?: InputMaybe<Scalars['String']>;
  parentDomain_lte?: InputMaybe<Scalars['String']>;
  parentDomain_not?: InputMaybe<Scalars['String']>;
  parentDomain_not_contains?: InputMaybe<Scalars['String']>;
  parentDomain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  parentDomain_not_ends_with?: InputMaybe<Scalars['String']>;
  parentDomain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parentDomain_not_in?: InputMaybe<Array<Scalars['String']>>;
  parentDomain_not_starts_with?: InputMaybe<Scalars['String']>;
  parentDomain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parentDomain_starts_with?: InputMaybe<Scalars['String']>;
  parentDomain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum NewOwner_OrderBy {
  BlockNumber = 'blockNumber',
  Domain = 'domain',
  Id = 'id',
  Owner = 'owner',
  ParentDomain = 'parentDomain',
  TransactionId = 'transactionID',
}

export type NewResolver = DomainEvent & {
  __typename?: 'NewResolver';
  blockNumber: Scalars['Int'];
  domain: Domain;
  id: Scalars['ID'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
};

export type NewResolver_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum NewResolver_OrderBy {
  BlockNumber = 'blockNumber',
  Domain = 'domain',
  Id = 'id',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
}

export type NewTtl = DomainEvent & {
  __typename?: 'NewTTL';
  blockNumber: Scalars['Int'];
  domain: Domain;
  id: Scalars['ID'];
  transactionID: Scalars['Bytes'];
  ttl: Scalars['BigInt'];
};

export type NewTtl_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  ttl?: InputMaybe<Scalars['BigInt']>;
  ttl_gt?: InputMaybe<Scalars['BigInt']>;
  ttl_gte?: InputMaybe<Scalars['BigInt']>;
  ttl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ttl_lt?: InputMaybe<Scalars['BigInt']>;
  ttl_lte?: InputMaybe<Scalars['BigInt']>;
  ttl_not?: InputMaybe<Scalars['BigInt']>;
  ttl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum NewTtl_OrderBy {
  BlockNumber = 'blockNumber',
  Domain = 'domain',
  Id = 'id',
  TransactionId = 'transactionID',
  Ttl = 'ttl',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type PubkeyChanged = ResolverEvent & {
  __typename?: 'PubkeyChanged';
  blockNumber: Scalars['Int'];
  id: Scalars['ID'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
  x: Scalars['Bytes'];
  y: Scalars['Bytes'];
};

export type PubkeyChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  x?: InputMaybe<Scalars['Bytes']>;
  x_contains?: InputMaybe<Scalars['Bytes']>;
  x_gt?: InputMaybe<Scalars['Bytes']>;
  x_gte?: InputMaybe<Scalars['Bytes']>;
  x_in?: InputMaybe<Array<Scalars['Bytes']>>;
  x_lt?: InputMaybe<Scalars['Bytes']>;
  x_lte?: InputMaybe<Scalars['Bytes']>;
  x_not?: InputMaybe<Scalars['Bytes']>;
  x_not_contains?: InputMaybe<Scalars['Bytes']>;
  x_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  y?: InputMaybe<Scalars['Bytes']>;
  y_contains?: InputMaybe<Scalars['Bytes']>;
  y_gt?: InputMaybe<Scalars['Bytes']>;
  y_gte?: InputMaybe<Scalars['Bytes']>;
  y_in?: InputMaybe<Array<Scalars['Bytes']>>;
  y_lt?: InputMaybe<Scalars['Bytes']>;
  y_lte?: InputMaybe<Scalars['Bytes']>;
  y_not?: InputMaybe<Scalars['Bytes']>;
  y_not_contains?: InputMaybe<Scalars['Bytes']>;
  y_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum PubkeyChanged_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
  X = 'x',
  Y = 'y',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  abiChanged?: Maybe<AbiChanged>;
  abiChangeds: Array<AbiChanged>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  addrChanged?: Maybe<AddrChanged>;
  addrChangeds: Array<AddrChanged>;
  authorisationChanged?: Maybe<AuthorisationChanged>;
  authorisationChangeds: Array<AuthorisationChanged>;
  contenthashChanged?: Maybe<ContenthashChanged>;
  contenthashChangeds: Array<ContenthashChanged>;
  domain?: Maybe<Domain>;
  domainEvent?: Maybe<DomainEvent>;
  domainEvents: Array<DomainEvent>;
  domains: Array<Domain>;
  fusesSet?: Maybe<FusesSet>;
  fusesSets: Array<FusesSet>;
  interfaceChanged?: Maybe<InterfaceChanged>;
  interfaceChangeds: Array<InterfaceChanged>;
  multicoinAddrChanged?: Maybe<MulticoinAddrChanged>;
  multicoinAddrChangeds: Array<MulticoinAddrChanged>;
  nameChanged?: Maybe<NameChanged>;
  nameChangeds: Array<NameChanged>;
  nameRegistered?: Maybe<NameRegistered>;
  nameRegistereds: Array<NameRegistered>;
  nameRenewed?: Maybe<NameRenewed>;
  nameReneweds: Array<NameRenewed>;
  nameTransferred?: Maybe<NameTransferred>;
  nameTransferreds: Array<NameTransferred>;
  nameUnwrapped?: Maybe<NameUnwrapped>;
  nameUnwrappeds: Array<NameUnwrapped>;
  nameWrapped?: Maybe<NameWrapped>;
  nameWrappeds: Array<NameWrapped>;
  newOwner?: Maybe<NewOwner>;
  newOwners: Array<NewOwner>;
  newResolver?: Maybe<NewResolver>;
  newResolvers: Array<NewResolver>;
  newTTL?: Maybe<NewTtl>;
  newTTLs: Array<NewTtl>;
  pubkeyChanged?: Maybe<PubkeyChanged>;
  pubkeyChangeds: Array<PubkeyChanged>;
  registration?: Maybe<Registration>;
  registrationEvent?: Maybe<RegistrationEvent>;
  registrationEvents: Array<RegistrationEvent>;
  registrations: Array<Registration>;
  resolver?: Maybe<Resolver>;
  resolverEvent?: Maybe<ResolverEvent>;
  resolverEvents: Array<ResolverEvent>;
  resolvers: Array<Resolver>;
  textChanged?: Maybe<TextChanged>;
  textChangeds: Array<TextChanged>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  versionChanged?: Maybe<VersionChanged>;
  versionChangeds: Array<VersionChanged>;
  wrappedDomain?: Maybe<WrappedDomain>;
  wrappedDomains: Array<WrappedDomain>;
  wrappedTransfer?: Maybe<WrappedTransfer>;
  wrappedTransfers: Array<WrappedTransfer>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryAbiChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAbiChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AbiChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AbiChanged_Filter>;
};

export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};

export type QueryAddrChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAddrChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AddrChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AddrChanged_Filter>;
};

export type QueryAuthorisationChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAuthorisationChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuthorisationChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AuthorisationChanged_Filter>;
};

export type QueryContenthashChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryContenthashChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContenthashChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ContenthashChanged_Filter>;
};

export type QueryDomainArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDomainEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDomainEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DomainEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DomainEvent_Filter>;
};

export type QueryDomainsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Domain_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Domain_Filter>;
};

export type QueryFusesSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFusesSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FusesSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FusesSet_Filter>;
};

export type QueryInterfaceChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryInterfaceChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<InterfaceChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InterfaceChanged_Filter>;
};

export type QueryMulticoinAddrChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMulticoinAddrChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MulticoinAddrChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MulticoinAddrChanged_Filter>;
};

export type QueryNameChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNameChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameChanged_Filter>;
};

export type QueryNameRegisteredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNameRegisteredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameRegistered_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameRegistered_Filter>;
};

export type QueryNameRenewedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNameRenewedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameRenewed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameRenewed_Filter>;
};

export type QueryNameTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNameTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameTransferred_Filter>;
};

export type QueryNameUnwrappedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNameUnwrappedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameUnwrapped_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameUnwrapped_Filter>;
};

export type QueryNameWrappedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNameWrappedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameWrapped_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameWrapped_Filter>;
};

export type QueryNewOwnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNewOwnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewOwner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewOwner_Filter>;
};

export type QueryNewResolverArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNewResolversArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewResolver_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewResolver_Filter>;
};

export type QueryNewTtlArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNewTtLsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTtl_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewTtl_Filter>;
};

export type QueryPubkeyChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPubkeyChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PubkeyChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PubkeyChanged_Filter>;
};

export type QueryRegistrationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRegistrationEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRegistrationEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RegistrationEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RegistrationEvent_Filter>;
};

export type QueryRegistrationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Registration_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Registration_Filter>;
};

export type QueryResolverArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryResolverEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryResolverEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ResolverEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ResolverEvent_Filter>;
};

export type QueryResolversArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Resolver_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Resolver_Filter>;
};

export type QueryTextChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTextChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TextChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TextChanged_Filter>;
};

export type QueryTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};

export type QueryVersionChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVersionChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VersionChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VersionChanged_Filter>;
};

export type QueryWrappedDomainArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWrappedDomainsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrappedDomain_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrappedDomain_Filter>;
};

export type QueryWrappedTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWrappedTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrappedTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrappedTransfer_Filter>;
};

export type Registration = {
  __typename?: 'Registration';
  cost?: Maybe<Scalars['BigInt']>;
  domain: Domain;
  events: Array<RegistrationEvent>;
  expiryDate: Scalars['BigInt'];
  id: Scalars['ID'];
  labelName?: Maybe<Scalars['String']>;
  registrant: Account;
  registrationDate: Scalars['BigInt'];
};

export type RegistrationEventsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RegistrationEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RegistrationEvent_Filter>;
};

export type RegistrationEvent = {
  blockNumber: Scalars['Int'];
  id: Scalars['ID'];
  registration: Registration;
  transactionID: Scalars['Bytes'];
};

export type RegistrationEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  registration?: InputMaybe<Scalars['String']>;
  registration_?: InputMaybe<Registration_Filter>;
  registration_contains?: InputMaybe<Scalars['String']>;
  registration_contains_nocase?: InputMaybe<Scalars['String']>;
  registration_ends_with?: InputMaybe<Scalars['String']>;
  registration_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registration_gt?: InputMaybe<Scalars['String']>;
  registration_gte?: InputMaybe<Scalars['String']>;
  registration_in?: InputMaybe<Array<Scalars['String']>>;
  registration_lt?: InputMaybe<Scalars['String']>;
  registration_lte?: InputMaybe<Scalars['String']>;
  registration_not?: InputMaybe<Scalars['String']>;
  registration_not_contains?: InputMaybe<Scalars['String']>;
  registration_not_contains_nocase?: InputMaybe<Scalars['String']>;
  registration_not_ends_with?: InputMaybe<Scalars['String']>;
  registration_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registration_not_in?: InputMaybe<Array<Scalars['String']>>;
  registration_not_starts_with?: InputMaybe<Scalars['String']>;
  registration_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registration_starts_with?: InputMaybe<Scalars['String']>;
  registration_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum RegistrationEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Registration = 'registration',
  TransactionId = 'transactionID',
}

export type Registration_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  cost?: InputMaybe<Scalars['BigInt']>;
  cost_gt?: InputMaybe<Scalars['BigInt']>;
  cost_gte?: InputMaybe<Scalars['BigInt']>;
  cost_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cost_lt?: InputMaybe<Scalars['BigInt']>;
  cost_lte?: InputMaybe<Scalars['BigInt']>;
  cost_not?: InputMaybe<Scalars['BigInt']>;
  cost_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  events_?: InputMaybe<RegistrationEvent_Filter>;
  expiryDate?: InputMaybe<Scalars['BigInt']>;
  expiryDate_gt?: InputMaybe<Scalars['BigInt']>;
  expiryDate_gte?: InputMaybe<Scalars['BigInt']>;
  expiryDate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiryDate_lt?: InputMaybe<Scalars['BigInt']>;
  expiryDate_lte?: InputMaybe<Scalars['BigInt']>;
  expiryDate_not?: InputMaybe<Scalars['BigInt']>;
  expiryDate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  labelName?: InputMaybe<Scalars['String']>;
  labelName_contains?: InputMaybe<Scalars['String']>;
  labelName_contains_nocase?: InputMaybe<Scalars['String']>;
  labelName_ends_with?: InputMaybe<Scalars['String']>;
  labelName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  labelName_gt?: InputMaybe<Scalars['String']>;
  labelName_gte?: InputMaybe<Scalars['String']>;
  labelName_in?: InputMaybe<Array<Scalars['String']>>;
  labelName_lt?: InputMaybe<Scalars['String']>;
  labelName_lte?: InputMaybe<Scalars['String']>;
  labelName_not?: InputMaybe<Scalars['String']>;
  labelName_not_contains?: InputMaybe<Scalars['String']>;
  labelName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  labelName_not_ends_with?: InputMaybe<Scalars['String']>;
  labelName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  labelName_not_in?: InputMaybe<Array<Scalars['String']>>;
  labelName_not_starts_with?: InputMaybe<Scalars['String']>;
  labelName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  labelName_starts_with?: InputMaybe<Scalars['String']>;
  labelName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registrant?: InputMaybe<Scalars['String']>;
  registrant_?: InputMaybe<Account_Filter>;
  registrant_contains?: InputMaybe<Scalars['String']>;
  registrant_contains_nocase?: InputMaybe<Scalars['String']>;
  registrant_ends_with?: InputMaybe<Scalars['String']>;
  registrant_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registrant_gt?: InputMaybe<Scalars['String']>;
  registrant_gte?: InputMaybe<Scalars['String']>;
  registrant_in?: InputMaybe<Array<Scalars['String']>>;
  registrant_lt?: InputMaybe<Scalars['String']>;
  registrant_lte?: InputMaybe<Scalars['String']>;
  registrant_not?: InputMaybe<Scalars['String']>;
  registrant_not_contains?: InputMaybe<Scalars['String']>;
  registrant_not_contains_nocase?: InputMaybe<Scalars['String']>;
  registrant_not_ends_with?: InputMaybe<Scalars['String']>;
  registrant_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registrant_not_in?: InputMaybe<Array<Scalars['String']>>;
  registrant_not_starts_with?: InputMaybe<Scalars['String']>;
  registrant_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registrant_starts_with?: InputMaybe<Scalars['String']>;
  registrant_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registrationDate?: InputMaybe<Scalars['BigInt']>;
  registrationDate_gt?: InputMaybe<Scalars['BigInt']>;
  registrationDate_gte?: InputMaybe<Scalars['BigInt']>;
  registrationDate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  registrationDate_lt?: InputMaybe<Scalars['BigInt']>;
  registrationDate_lte?: InputMaybe<Scalars['BigInt']>;
  registrationDate_not?: InputMaybe<Scalars['BigInt']>;
  registrationDate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Registration_OrderBy {
  Cost = 'cost',
  Domain = 'domain',
  Events = 'events',
  ExpiryDate = 'expiryDate',
  Id = 'id',
  LabelName = 'labelName',
  Registrant = 'registrant',
  RegistrationDate = 'registrationDate',
}

export type Resolver = {
  __typename?: 'Resolver';
  addr?: Maybe<Account>;
  address: Scalars['Bytes'];
  coinTypes?: Maybe<Array<Scalars['BigInt']>>;
  contentHash?: Maybe<Scalars['Bytes']>;
  domain?: Maybe<Domain>;
  events: Array<ResolverEvent>;
  id: Scalars['ID'];
  texts?: Maybe<Array<Scalars['String']>>;
};

export type ResolverEventsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ResolverEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ResolverEvent_Filter>;
};

export type ResolverEvent = {
  blockNumber: Scalars['Int'];
  id: Scalars['ID'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
};

export type ResolverEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum ResolverEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
}

export type Resolver_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  addr?: InputMaybe<Scalars['String']>;
  addr_?: InputMaybe<Account_Filter>;
  addr_contains?: InputMaybe<Scalars['String']>;
  addr_contains_nocase?: InputMaybe<Scalars['String']>;
  addr_ends_with?: InputMaybe<Scalars['String']>;
  addr_ends_with_nocase?: InputMaybe<Scalars['String']>;
  addr_gt?: InputMaybe<Scalars['String']>;
  addr_gte?: InputMaybe<Scalars['String']>;
  addr_in?: InputMaybe<Array<Scalars['String']>>;
  addr_lt?: InputMaybe<Scalars['String']>;
  addr_lte?: InputMaybe<Scalars['String']>;
  addr_not?: InputMaybe<Scalars['String']>;
  addr_not_contains?: InputMaybe<Scalars['String']>;
  addr_not_contains_nocase?: InputMaybe<Scalars['String']>;
  addr_not_ends_with?: InputMaybe<Scalars['String']>;
  addr_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  addr_not_in?: InputMaybe<Array<Scalars['String']>>;
  addr_not_starts_with?: InputMaybe<Scalars['String']>;
  addr_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  addr_starts_with?: InputMaybe<Scalars['String']>;
  addr_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  coinTypes?: InputMaybe<Array<Scalars['BigInt']>>;
  coinTypes_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  coinTypes_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  coinTypes_not?: InputMaybe<Array<Scalars['BigInt']>>;
  coinTypes_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  coinTypes_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  contentHash?: InputMaybe<Scalars['Bytes']>;
  contentHash_contains?: InputMaybe<Scalars['Bytes']>;
  contentHash_gt?: InputMaybe<Scalars['Bytes']>;
  contentHash_gte?: InputMaybe<Scalars['Bytes']>;
  contentHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contentHash_lt?: InputMaybe<Scalars['Bytes']>;
  contentHash_lte?: InputMaybe<Scalars['Bytes']>;
  contentHash_not?: InputMaybe<Scalars['Bytes']>;
  contentHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  contentHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  events_?: InputMaybe<ResolverEvent_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  texts?: InputMaybe<Array<Scalars['String']>>;
  texts_contains?: InputMaybe<Array<Scalars['String']>>;
  texts_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  texts_not?: InputMaybe<Array<Scalars['String']>>;
  texts_not_contains?: InputMaybe<Array<Scalars['String']>>;
  texts_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum Resolver_OrderBy {
  Addr = 'addr',
  Address = 'address',
  CoinTypes = 'coinTypes',
  ContentHash = 'contentHash',
  Domain = 'domain',
  Events = 'events',
  Id = 'id',
  Texts = 'texts',
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  abiChanged?: Maybe<AbiChanged>;
  abiChangeds: Array<AbiChanged>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  addrChanged?: Maybe<AddrChanged>;
  addrChangeds: Array<AddrChanged>;
  authorisationChanged?: Maybe<AuthorisationChanged>;
  authorisationChangeds: Array<AuthorisationChanged>;
  contenthashChanged?: Maybe<ContenthashChanged>;
  contenthashChangeds: Array<ContenthashChanged>;
  domain?: Maybe<Domain>;
  domainEvent?: Maybe<DomainEvent>;
  domainEvents: Array<DomainEvent>;
  domains: Array<Domain>;
  fusesSet?: Maybe<FusesSet>;
  fusesSets: Array<FusesSet>;
  interfaceChanged?: Maybe<InterfaceChanged>;
  interfaceChangeds: Array<InterfaceChanged>;
  multicoinAddrChanged?: Maybe<MulticoinAddrChanged>;
  multicoinAddrChangeds: Array<MulticoinAddrChanged>;
  nameChanged?: Maybe<NameChanged>;
  nameChangeds: Array<NameChanged>;
  nameRegistered?: Maybe<NameRegistered>;
  nameRegistereds: Array<NameRegistered>;
  nameRenewed?: Maybe<NameRenewed>;
  nameReneweds: Array<NameRenewed>;
  nameTransferred?: Maybe<NameTransferred>;
  nameTransferreds: Array<NameTransferred>;
  nameUnwrapped?: Maybe<NameUnwrapped>;
  nameUnwrappeds: Array<NameUnwrapped>;
  nameWrapped?: Maybe<NameWrapped>;
  nameWrappeds: Array<NameWrapped>;
  newOwner?: Maybe<NewOwner>;
  newOwners: Array<NewOwner>;
  newResolver?: Maybe<NewResolver>;
  newResolvers: Array<NewResolver>;
  newTTL?: Maybe<NewTtl>;
  newTTLs: Array<NewTtl>;
  pubkeyChanged?: Maybe<PubkeyChanged>;
  pubkeyChangeds: Array<PubkeyChanged>;
  registration?: Maybe<Registration>;
  registrationEvent?: Maybe<RegistrationEvent>;
  registrationEvents: Array<RegistrationEvent>;
  registrations: Array<Registration>;
  resolver?: Maybe<Resolver>;
  resolverEvent?: Maybe<ResolverEvent>;
  resolverEvents: Array<ResolverEvent>;
  resolvers: Array<Resolver>;
  textChanged?: Maybe<TextChanged>;
  textChangeds: Array<TextChanged>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  versionChanged?: Maybe<VersionChanged>;
  versionChangeds: Array<VersionChanged>;
  wrappedDomain?: Maybe<WrappedDomain>;
  wrappedDomains: Array<WrappedDomain>;
  wrappedTransfer?: Maybe<WrappedTransfer>;
  wrappedTransfers: Array<WrappedTransfer>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionAbiChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAbiChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AbiChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AbiChanged_Filter>;
};

export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};

export type SubscriptionAddrChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAddrChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AddrChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AddrChanged_Filter>;
};

export type SubscriptionAuthorisationChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAuthorisationChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuthorisationChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AuthorisationChanged_Filter>;
};

export type SubscriptionContenthashChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionContenthashChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContenthashChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ContenthashChanged_Filter>;
};

export type SubscriptionDomainArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDomainEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDomainEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DomainEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DomainEvent_Filter>;
};

export type SubscriptionDomainsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Domain_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Domain_Filter>;
};

export type SubscriptionFusesSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFusesSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FusesSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FusesSet_Filter>;
};

export type SubscriptionInterfaceChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionInterfaceChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<InterfaceChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InterfaceChanged_Filter>;
};

export type SubscriptionMulticoinAddrChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMulticoinAddrChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MulticoinAddrChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MulticoinAddrChanged_Filter>;
};

export type SubscriptionNameChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNameChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameChanged_Filter>;
};

export type SubscriptionNameRegisteredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNameRegisteredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameRegistered_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameRegistered_Filter>;
};

export type SubscriptionNameRenewedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNameRenewedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameRenewed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameRenewed_Filter>;
};

export type SubscriptionNameTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNameTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameTransferred_Filter>;
};

export type SubscriptionNameUnwrappedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNameUnwrappedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameUnwrapped_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameUnwrapped_Filter>;
};

export type SubscriptionNameWrappedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNameWrappedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NameWrapped_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NameWrapped_Filter>;
};

export type SubscriptionNewOwnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNewOwnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewOwner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewOwner_Filter>;
};

export type SubscriptionNewResolverArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNewResolversArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewResolver_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewResolver_Filter>;
};

export type SubscriptionNewTtlArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNewTtLsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTtl_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewTtl_Filter>;
};

export type SubscriptionPubkeyChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPubkeyChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PubkeyChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PubkeyChanged_Filter>;
};

export type SubscriptionRegistrationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRegistrationEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRegistrationEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RegistrationEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RegistrationEvent_Filter>;
};

export type SubscriptionRegistrationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Registration_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Registration_Filter>;
};

export type SubscriptionResolverArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionResolverEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionResolverEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ResolverEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ResolverEvent_Filter>;
};

export type SubscriptionResolversArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Resolver_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Resolver_Filter>;
};

export type SubscriptionTextChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTextChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TextChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TextChanged_Filter>;
};

export type SubscriptionTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};

export type SubscriptionVersionChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVersionChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VersionChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VersionChanged_Filter>;
};

export type SubscriptionWrappedDomainArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWrappedDomainsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrappedDomain_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrappedDomain_Filter>;
};

export type SubscriptionWrappedTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWrappedTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrappedTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrappedTransfer_Filter>;
};

export type TextChanged = ResolverEvent & {
  __typename?: 'TextChanged';
  blockNumber: Scalars['Int'];
  id: Scalars['ID'];
  key: Scalars['String'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
  value?: Maybe<Scalars['String']>;
};

export type TextChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['String']>;
  key_contains?: InputMaybe<Scalars['String']>;
  key_contains_nocase?: InputMaybe<Scalars['String']>;
  key_ends_with?: InputMaybe<Scalars['String']>;
  key_ends_with_nocase?: InputMaybe<Scalars['String']>;
  key_gt?: InputMaybe<Scalars['String']>;
  key_gte?: InputMaybe<Scalars['String']>;
  key_in?: InputMaybe<Array<Scalars['String']>>;
  key_lt?: InputMaybe<Scalars['String']>;
  key_lte?: InputMaybe<Scalars['String']>;
  key_not?: InputMaybe<Scalars['String']>;
  key_not_contains?: InputMaybe<Scalars['String']>;
  key_not_contains_nocase?: InputMaybe<Scalars['String']>;
  key_not_ends_with?: InputMaybe<Scalars['String']>;
  key_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_in?: InputMaybe<Array<Scalars['String']>>;
  key_not_starts_with?: InputMaybe<Scalars['String']>;
  key_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_starts_with?: InputMaybe<Scalars['String']>;
  key_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  value?: InputMaybe<Scalars['String']>;
  value_contains?: InputMaybe<Scalars['String']>;
  value_contains_nocase?: InputMaybe<Scalars['String']>;
  value_ends_with?: InputMaybe<Scalars['String']>;
  value_ends_with_nocase?: InputMaybe<Scalars['String']>;
  value_gt?: InputMaybe<Scalars['String']>;
  value_gte?: InputMaybe<Scalars['String']>;
  value_in?: InputMaybe<Array<Scalars['String']>>;
  value_lt?: InputMaybe<Scalars['String']>;
  value_lte?: InputMaybe<Scalars['String']>;
  value_not?: InputMaybe<Scalars['String']>;
  value_not_contains?: InputMaybe<Scalars['String']>;
  value_not_contains_nocase?: InputMaybe<Scalars['String']>;
  value_not_ends_with?: InputMaybe<Scalars['String']>;
  value_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  value_not_in?: InputMaybe<Array<Scalars['String']>>;
  value_not_starts_with?: InputMaybe<Scalars['String']>;
  value_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  value_starts_with?: InputMaybe<Scalars['String']>;
  value_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum TextChanged_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Key = 'key',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
  Value = 'value',
}

export type Transfer = DomainEvent & {
  __typename?: 'Transfer';
  blockNumber: Scalars['Int'];
  domain: Domain;
  id: Scalars['ID'];
  owner: Account;
  transactionID: Scalars['Bytes'];
};

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Transfer_OrderBy {
  BlockNumber = 'blockNumber',
  Domain = 'domain',
  Id = 'id',
  Owner = 'owner',
  TransactionId = 'transactionID',
}

export type VersionChanged = ResolverEvent & {
  __typename?: 'VersionChanged';
  blockNumber: Scalars['Int'];
  id: Scalars['ID'];
  resolver: Resolver;
  transactionID: Scalars['Bytes'];
  version: Scalars['BigInt'];
};

export type VersionChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  resolver?: InputMaybe<Scalars['String']>;
  resolver_?: InputMaybe<Resolver_Filter>;
  resolver_contains?: InputMaybe<Scalars['String']>;
  resolver_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_ends_with?: InputMaybe<Scalars['String']>;
  resolver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_gt?: InputMaybe<Scalars['String']>;
  resolver_gte?: InputMaybe<Scalars['String']>;
  resolver_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_lt?: InputMaybe<Scalars['String']>;
  resolver_lte?: InputMaybe<Scalars['String']>;
  resolver_not?: InputMaybe<Scalars['String']>;
  resolver_not_contains?: InputMaybe<Scalars['String']>;
  resolver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with?: InputMaybe<Scalars['String']>;
  resolver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_not_in?: InputMaybe<Array<Scalars['String']>>;
  resolver_not_starts_with?: InputMaybe<Scalars['String']>;
  resolver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resolver_starts_with?: InputMaybe<Scalars['String']>;
  resolver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  version?: InputMaybe<Scalars['BigInt']>;
  version_gt?: InputMaybe<Scalars['BigInt']>;
  version_gte?: InputMaybe<Scalars['BigInt']>;
  version_in?: InputMaybe<Array<Scalars['BigInt']>>;
  version_lt?: InputMaybe<Scalars['BigInt']>;
  version_lte?: InputMaybe<Scalars['BigInt']>;
  version_not?: InputMaybe<Scalars['BigInt']>;
  version_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum VersionChanged_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Resolver = 'resolver',
  TransactionId = 'transactionID',
  Version = 'version',
}

export type WrappedDomain = {
  __typename?: 'WrappedDomain';
  domain: Domain;
  expiryDate: Scalars['BigInt'];
  fuses: Scalars['BigInt'];
  id: Scalars['ID'];
  labelName?: Maybe<Scalars['String']>;
  owner: Account;
};

export type WrappedDomain_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  expiryDate?: InputMaybe<Scalars['BigInt']>;
  expiryDate_gt?: InputMaybe<Scalars['BigInt']>;
  expiryDate_gte?: InputMaybe<Scalars['BigInt']>;
  expiryDate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiryDate_lt?: InputMaybe<Scalars['BigInt']>;
  expiryDate_lte?: InputMaybe<Scalars['BigInt']>;
  expiryDate_not?: InputMaybe<Scalars['BigInt']>;
  expiryDate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fuses?: InputMaybe<Scalars['BigInt']>;
  fuses_gt?: InputMaybe<Scalars['BigInt']>;
  fuses_gte?: InputMaybe<Scalars['BigInt']>;
  fuses_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fuses_lt?: InputMaybe<Scalars['BigInt']>;
  fuses_lte?: InputMaybe<Scalars['BigInt']>;
  fuses_not?: InputMaybe<Scalars['BigInt']>;
  fuses_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  labelName?: InputMaybe<Scalars['String']>;
  labelName_contains?: InputMaybe<Scalars['String']>;
  labelName_contains_nocase?: InputMaybe<Scalars['String']>;
  labelName_ends_with?: InputMaybe<Scalars['String']>;
  labelName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  labelName_gt?: InputMaybe<Scalars['String']>;
  labelName_gte?: InputMaybe<Scalars['String']>;
  labelName_in?: InputMaybe<Array<Scalars['String']>>;
  labelName_lt?: InputMaybe<Scalars['String']>;
  labelName_lte?: InputMaybe<Scalars['String']>;
  labelName_not?: InputMaybe<Scalars['String']>;
  labelName_not_contains?: InputMaybe<Scalars['String']>;
  labelName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  labelName_not_ends_with?: InputMaybe<Scalars['String']>;
  labelName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  labelName_not_in?: InputMaybe<Array<Scalars['String']>>;
  labelName_not_starts_with?: InputMaybe<Scalars['String']>;
  labelName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  labelName_starts_with?: InputMaybe<Scalars['String']>;
  labelName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum WrappedDomain_OrderBy {
  Domain = 'domain',
  ExpiryDate = 'expiryDate',
  Fuses = 'fuses',
  Id = 'id',
  LabelName = 'labelName',
  Owner = 'owner',
}

export type WrappedTransfer = DomainEvent & {
  __typename?: 'WrappedTransfer';
  blockNumber: Scalars['Int'];
  domain: Domain;
  id: Scalars['ID'];
  owner: Account;
  transactionID: Scalars['Bytes'];
};

export type WrappedTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  domain?: InputMaybe<Scalars['String']>;
  domain_?: InputMaybe<Domain_Filter>;
  domain_contains?: InputMaybe<Scalars['String']>;
  domain_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_ends_with?: InputMaybe<Scalars['String']>;
  domain_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_gt?: InputMaybe<Scalars['String']>;
  domain_gte?: InputMaybe<Scalars['String']>;
  domain_in?: InputMaybe<Array<Scalars['String']>>;
  domain_lt?: InputMaybe<Scalars['String']>;
  domain_lte?: InputMaybe<Scalars['String']>;
  domain_not?: InputMaybe<Scalars['String']>;
  domain_not_contains?: InputMaybe<Scalars['String']>;
  domain_not_contains_nocase?: InputMaybe<Scalars['String']>;
  domain_not_ends_with?: InputMaybe<Scalars['String']>;
  domain_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  domain_not_in?: InputMaybe<Array<Scalars['String']>>;
  domain_not_starts_with?: InputMaybe<Scalars['String']>;
  domain_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  domain_starts_with?: InputMaybe<Scalars['String']>;
  domain_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum WrappedTransfer_OrderBy {
  BlockNumber = 'blockNumber',
  Domain = 'domain',
  Id = 'id',
  Owner = 'owner',
  TransactionId = 'transactionID',
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type GetDomainsByNamehashQueryVariables = Exact<{
  domainId: Scalars['ID'];
  chainId?: InputMaybe<Scalars['Int']>;
}>;

export type GetDomainsByNamehashQuery = {
  __typename?: 'Query';
  domain?: {
    __typename?: 'Domain';
    id: string;
    labelName?: string | null;
    subdomains: Array<{
      __typename?: 'Domain';
      id: string;
      labelName?: string | null;
      labelhash?: any | null;
      isMigrated: boolean;
      name?: string | null;
      owner: { __typename?: 'Account'; id: string };
    }>;
  } | null;
};

export type GetDomainsOwnedOrControlledByQueryVariables = Exact<{
  addressID: Scalars['ID'];
  addressString: Scalars['String'];
  searchString?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Domain_OrderBy>;
  chainId?: InputMaybe<Scalars['Int']>;
}>;

export type GetDomainsOwnedOrControlledByQuery = {
  __typename?: 'Query';
  account?: {
    __typename?: 'Account';
    domainsOwned: Array<{
      __typename?: 'Domain';
      id: string;
      labelName?: string | null;
      labelhash?: any | null;
      name?: string | null;
      parent?: { __typename?: 'Domain'; name?: string | null } | null;
    }>;
  } | null;
  domainsControlled: Array<{
    __typename?: 'Domain';
    id: string;
    labelName?: string | null;
    labelhash?: any | null;
    name?: string | null;
    owner: { __typename?: 'Account'; id: string };
  }>;
};

export type GetDomainFromSubgraphQueryVariables = Exact<{
  domainId: Scalars['ID'];
  chainId?: InputMaybe<Scalars['Int']>;
}>;

export type GetDomainFromSubgraphQuery = {
  __typename?: 'Query';
  domain?: {
    __typename?: 'Domain';
    id: string;
    name?: string | null;
    labelName?: string | null;
    labelhash?: any | null;
    owner: { __typename?: 'Account'; id: string };
  } | null;
};

export const GetDomainsByNamehashDocument = `
    query getDomainsByNamehash($domainId: ID!, $chainId: Int) {
  domain(id: $domainId) {
    id
    labelName
    subdomains {
      id
      labelName
      labelhash
      isMigrated
      name
      owner {
        id
      }
    }
  }
}
    `;
export const useGetDomainsByNamehashQuery = <TData = GetDomainsByNamehashQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetDomainsByNamehashQueryVariables,
  options?: UseQueryOptions<GetDomainsByNamehashQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetDomainsByNamehashQuery, TError, TData>(
    ['getDomainsByNamehash', variables],
    fetcher<GetDomainsByNamehashQuery, GetDomainsByNamehashQueryVariables>(
      client,
      GetDomainsByNamehashDocument,
      variables,
      headers
    ),
    options
  );

useGetDomainsByNamehashQuery.getKey = (variables: GetDomainsByNamehashQueryVariables) => [
  'getDomainsByNamehash',
  variables,
];
export const useInfiniteGetDomainsByNamehashQuery = <TData = GetDomainsByNamehashQuery, TError = unknown>(
  pageParamKey: keyof GetDomainsByNamehashQueryVariables,
  client: GraphQLClient,
  variables: GetDomainsByNamehashQueryVariables,
  options?: UseInfiniteQueryOptions<GetDomainsByNamehashQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetDomainsByNamehashQuery, TError, TData>(
    ['getDomainsByNamehash.infinite', variables],
    (metaData) =>
      fetcher<GetDomainsByNamehashQuery, GetDomainsByNamehashQueryVariables>(
        client,
        GetDomainsByNamehashDocument,
        { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
        headers
      )(),
    options
  );

useInfiniteGetDomainsByNamehashQuery.getKey = (variables: GetDomainsByNamehashQueryVariables) => [
  'getDomainsByNamehash.infinite',
  variables,
];
useGetDomainsByNamehashQuery.fetcher = (
  client: GraphQLClient,
  variables: GetDomainsByNamehashQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetDomainsByNamehashQuery, GetDomainsByNamehashQueryVariables>(
    client,
    GetDomainsByNamehashDocument,
    variables,
    headers
  );
export const GetDomainsOwnedOrControlledByDocument = `
    query getDomainsOwnedOrControlledBy($addressID: ID!, $addressString: String!, $searchString: String, $first: Int, $skip: Int, $orderBy: Domain_orderBy, $chainId: Int) {
  account(id: $addressID) {
    domainsOwned: domains(
      first: $first
      skip: $skip
      orderBy: $orderBy
      where: {name_contains_nocase: $searchString}
    ) {
      id
      labelName
      labelhash
      name
      parent {
        name
      }
    }
  }
  domainsControlled: domains(
    first: $first
    skip: $skip
    orderBy: $orderBy
    where: {name_contains_nocase: $searchString, owner: $addressString}
  ) {
    id
    labelName
    labelhash
    name
    owner {
      id
    }
  }
}
    `;
export const useGetDomainsOwnedOrControlledByQuery = <TData = GetDomainsOwnedOrControlledByQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetDomainsOwnedOrControlledByQueryVariables,
  options?: UseQueryOptions<GetDomainsOwnedOrControlledByQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetDomainsOwnedOrControlledByQuery, TError, TData>(
    ['getDomainsOwnedOrControlledBy', variables],
    fetcher<GetDomainsOwnedOrControlledByQuery, GetDomainsOwnedOrControlledByQueryVariables>(
      client,
      GetDomainsOwnedOrControlledByDocument,
      variables,
      headers
    ),
    options
  );

useGetDomainsOwnedOrControlledByQuery.getKey = (variables: GetDomainsOwnedOrControlledByQueryVariables) => [
  'getDomainsOwnedOrControlledBy',
  variables,
];
export const useInfiniteGetDomainsOwnedOrControlledByQuery = <
  TData = GetDomainsOwnedOrControlledByQuery,
  TError = unknown
>(
  pageParamKey: keyof GetDomainsOwnedOrControlledByQueryVariables,
  client: GraphQLClient,
  variables: GetDomainsOwnedOrControlledByQueryVariables,
  options?: UseInfiniteQueryOptions<GetDomainsOwnedOrControlledByQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetDomainsOwnedOrControlledByQuery, TError, TData>(
    ['getDomainsOwnedOrControlledBy.infinite', variables],
    (metaData) =>
      fetcher<GetDomainsOwnedOrControlledByQuery, GetDomainsOwnedOrControlledByQueryVariables>(
        client,
        GetDomainsOwnedOrControlledByDocument,
        { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
        headers
      )(),
    options
  );

useInfiniteGetDomainsOwnedOrControlledByQuery.getKey = (variables: GetDomainsOwnedOrControlledByQueryVariables) => [
  'getDomainsOwnedOrControlledBy.infinite',
  variables,
];
useGetDomainsOwnedOrControlledByQuery.fetcher = (
  client: GraphQLClient,
  variables: GetDomainsOwnedOrControlledByQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetDomainsOwnedOrControlledByQuery, GetDomainsOwnedOrControlledByQueryVariables>(
    client,
    GetDomainsOwnedOrControlledByDocument,
    variables,
    headers
  );
export const GetDomainFromSubgraphDocument = `
    query getDomainFromSubgraph($domainId: ID!, $chainId: Int) {
  domain(id: $domainId) {
    id
    name
    labelName
    labelhash
    owner {
      id
    }
  }
}
    `;
export const useGetDomainFromSubgraphQuery = <TData = GetDomainFromSubgraphQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetDomainFromSubgraphQueryVariables,
  options?: UseQueryOptions<GetDomainFromSubgraphQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetDomainFromSubgraphQuery, TError, TData>(
    ['getDomainFromSubgraph', variables],
    fetcher<GetDomainFromSubgraphQuery, GetDomainFromSubgraphQueryVariables>(
      client,
      GetDomainFromSubgraphDocument,
      variables,
      headers
    ),
    options
  );

useGetDomainFromSubgraphQuery.getKey = (variables: GetDomainFromSubgraphQueryVariables) => [
  'getDomainFromSubgraph',
  variables,
];
export const useInfiniteGetDomainFromSubgraphQuery = <TData = GetDomainFromSubgraphQuery, TError = unknown>(
  pageParamKey: keyof GetDomainFromSubgraphQueryVariables,
  client: GraphQLClient,
  variables: GetDomainFromSubgraphQueryVariables,
  options?: UseInfiniteQueryOptions<GetDomainFromSubgraphQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<GetDomainFromSubgraphQuery, TError, TData>(
    ['getDomainFromSubgraph.infinite', variables],
    (metaData) =>
      fetcher<GetDomainFromSubgraphQuery, GetDomainFromSubgraphQueryVariables>(
        client,
        GetDomainFromSubgraphDocument,
        { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
        headers
      )(),
    options
  );

useInfiniteGetDomainFromSubgraphQuery.getKey = (variables: GetDomainFromSubgraphQueryVariables) => [
  'getDomainFromSubgraph.infinite',
  variables,
];
useGetDomainFromSubgraphQuery.fetcher = (
  client: GraphQLClient,
  variables: GetDomainFromSubgraphQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetDomainFromSubgraphQuery, GetDomainFromSubgraphQueryVariables>(
    client,
    GetDomainFromSubgraphDocument,
    variables,
    headers
  );
