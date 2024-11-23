import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { NextRequest, NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCK_SECRET_KEY!, // Make sure the secret is secure
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Check if the user is authenticated
    const authorization = await auth();
    console.log(authorization);

    const user = await currentUser();
    console.log("current user : ", user);

    if (!authorization || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { room } : {room : Id<"Board">} = await request.json();
    console.log("room : ", room);

    if (!room) {
      return new NextResponse("Bad Request: Missing room", { status: 400 });
    }

    // Try querying the board and catch any potential errors
    // let board;
    // try {
    //   board = await convex.query(api.board.hehe, { id: room });
    //   console.log("boardId : ", board?._id);
    // } catch (error) {
    //   console.error("Error querying Convex board: ", error);
    //   return new NextResponse("Error querying Convex board", { status: 500 });
    // }

    // if (board?.orgId !== authorization.orgId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    // Prepare user info for Liveblocks
    const userInfo = {
      name: user.firstName || "Anonymous",
      picture: user.imageUrl!,
    };

    // Prepare Liveblocks session
    const session = liveblocks.prepareSession(user.id, {
      userInfo,
    });

    if (room) {
      session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();
    return new NextResponse(body, { status });
  } catch (error) {
    console.error("General error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
