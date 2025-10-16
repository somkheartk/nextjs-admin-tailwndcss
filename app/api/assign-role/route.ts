import { db, userRoleAssignments } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userEmail, roleId } = await request.json();

    if (!userEmail || !roleId) {
      return Response.json(
        { error: 'userEmail and roleId are required' },
        { status: 400 }
      );
    }

    // Check if user already has a role assignment
    const existing = await db
      .select()
      .from(userRoleAssignments)
      .where(eq(userRoleAssignments.userEmail, userEmail))
      .limit(1);

    if (existing.length > 0) {
      // Update existing role
      await db
        .update(userRoleAssignments)
        .set({ roleId })
        .where(eq(userRoleAssignments.userEmail, userEmail));

      return Response.json({
        message: 'User role updated successfully'
      });
    } else {
      // Insert new role assignment
      await db.insert(userRoleAssignments).values({
        userEmail,
        roleId
      });

      return Response.json({
        message: 'User role assigned successfully'
      });
    }
  } catch (error: any) {
    return Response.json(
      {
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const assignments = await db.select().from(userRoleAssignments);
    return Response.json(assignments);
  } catch (error: any) {
    return Response.json(
      {
        error: error.message
      },
      { status: 500 }
    );
  }
}
