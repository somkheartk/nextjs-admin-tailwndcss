import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { db, userRoleAssignments } from './db';
import { eq } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async session({ session, token }) {
      if (session.user?.email) {
        // Fetch user role
        const userRole = await db
          .select()
          .from(userRoleAssignments)
          .where(eq(userRoleAssignments.userEmail, session.user.email))
          .limit(1);

        if (userRole.length > 0) {
          session.user.roleId = userRole[0].roleId;
        }
      }
      return session;
    }
  }
});
