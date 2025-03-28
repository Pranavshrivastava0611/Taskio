import { v } from "convex/values";
import { defineSchema,defineTable } from "convex/server";

export default defineSchema(
    {
        Board : defineTable({
            title : v.string(),
            orgId : v.string(),
            authorId : v.string(),
            authorName : v.string(),
            imageUrl : v.string(),
            isFavourite : v.optional(v.boolean()),
        })
        .index("by_org",["orgId"])
        .searchIndex("search_title",{
            searchField : "title",
            filterFields : ["orgId"]
        }),
        userFavourite : defineTable({
            orgId : v.string(),
            userId : v.string(),
            boardId : v.id("Board"),
        })
        .index("by_board",["boardId"])
        .index("by_user_org",["userId","orgId"])
        .index("by_user_board",["userId","boardId"])
        .index("by_user_board_org",["userId","boardId","orgId"])

    }   
);



