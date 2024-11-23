"use client";

import React from "react";
import Image from "next/image";
import Empty_search from "./empty-search";
import { useParams } from "next/navigation";
import EmptyOrg from "./EmptyOrg";
import Empty_F from "./empty-favourite";
import Empty_all from "./empty-all";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { query } from "@/convex/_generated/server";
import { BoardCard } from "./board-card";
import Overlay from "./board-card/Overlay";
import NewBoardButton from "./NewBoardButton";

export const BoardList = ({ searchParams }: any) => {
  const { search }: any = React.use(searchParams);
  const { favourites }: any = React.use(searchParams);
  const { organization } = useOrganization();
  const orgId = organization?.id!;
  const data = useQuery(api.boards.get, { orgId ,search : search ,favourites : favourites});

  if (data===undefined) {
    return (
      <div>
        <div>
          <h2 className="text-3xl">
            {favourites ? "Favourite boards" : "Team boards"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10 "><NewBoardButton orgId={orgId} disabled/>
          <BoardCard.Skeleton/></div>
        </div>
      </div>
    );
  }
  if (!data.length && search) {
    return <Empty_search />;
  }

  if (!data.length && favourites) {
    return <Empty_F />;
  }

  if (!data.length) {
    return <Empty_all />;
  }

  return (
    <>
      <div>
        <h2 className="text-3xl">
          {favourites ? "Favourite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10 ">
          <NewBoardButton orgId={orgId} disabled={false} />
          {data?.map((board) => (
            <BoardCard
              key={board._id}
              id={board._id}
              title={board.title}
              imageUrl={board.imageUrl}
              authorId={board.authorId}
              authorName={board.authorName}
              createdAt={board._creationTime}
              orgId={organization?.id!}
              isFavourite={board.isFavourite!}
            />
          ))}
        </div>
      </div>
    </>
  );
};
