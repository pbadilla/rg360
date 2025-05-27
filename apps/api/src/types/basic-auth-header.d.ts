// src/types/basic-auth-header.d.ts
declare module 'basic-auth-header' {
  type BasicAuthHeader = (username: string, password: string) => string;
  const basicAuthHeader: BasicAuthHeader;
  export = basicAuthHeader;
}
