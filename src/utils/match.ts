
import { connectDB } from "@/lib/db";
import { User } from "@/lib/model";
import { auth } from "@clerk/nextjs/server";
import type { Types } from "mongoose";


type MatchResult = { clerk_id: string; mongo_id: Types.ObjectId };

export async function matchClerkAndMongoUser(): Promise<MatchResult> {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    await connectDB();

    const dbUser = await User.findOne({ clerk_id: userId }, { clerk_id: 1, _id: 1 });
    if (!dbUser) throw new Error("Unauthorized");
    return {clerk_id: userId, mongo_id: dbUser._id}
}
