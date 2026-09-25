import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    access_token?: string;
    userreturn?: any;
  }

  interface Session {
    access_token?: string;
    userreturn?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    userreturn?: any;
  }
}