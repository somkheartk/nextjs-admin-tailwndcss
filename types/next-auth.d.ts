import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    roleId?: number;
  }

  interface Session {
    user: {
      roleId?: number;
    } & DefaultSession['user'];
  }
}
