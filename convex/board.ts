import {v} from "convex/values"
import {mutation} from "./_generated/server"
import { query } from "./_generated/server"
import { Id } from "./_generated/dataModel"

const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
   
]
export const create = mutation({
    args : {
        orgId : v.string(),
        title : v.string(),
    },

    handler : async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity()
;
if(!identity){
    throw new Error("Unauthorized");
} 

const randomImages =  images[ Math.floor(Math.random()*images.length)]

const board = await ctx.db.insert("Board",{
    title : args.title,
    orgId : args.orgId,
    authorId : identity.subject,
    authorName : identity.name!,
    imageUrl : randomImages,
})
}


})


export const remove = mutation({
    args : {
        id : v.id("Board"),
    },
    handler : async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;
        const existingFav = await ctx.db.query("userFavourite").withIndex("by_user_board",(q)=> q.eq("userId",userId).eq("boardId",args.id)).unique();

        if(existingFav){
            await ctx.db.delete(existingFav._id);
        }
        await ctx.db.delete(args.id);

    }
})


export const update = mutation({
    args : {
        id : v.id("Board"),
        title : v.string()
    },
    handler : async (ctx,args)=>{
        const title = args.title.trim();
        const identity = ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized");
        }

        identity.then((data)=>{
            console.log(data)
        })

        if(!title){
            throw new Error("Title is required");
        }

        if (title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters");
          }

          const board = ctx.db.patch(args.id,{
            title : args.title,
          })

          return board
    }
})

export const favourite = mutation({
    args: { id: v.id("Board"), orgId: v.string() },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Unauthorized");
      }
  
      const board = await ctx.db.get(args.id);
  
      if (!board) {
        throw new Error("Board not found");
      }
  
      const userId = identity.subject;
      const existingFavourite = await ctx.db
        .query("userFavourite")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", userId).eq("boardId", board._id)
        )
        .unique();
  
      if (existingFavourite) {
        throw new Error("Board already favourited");
      }
  
      await ctx.db.insert("userFavourite", {
        orgId: args.orgId,
        userId: userId,
        boardId: board._id,
      });
  
      return board;
    },
  });
  
  export const unfavourite = mutation({
    args: { id: v.id("Board") },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Unauthorized");
      }
  
      const board = await ctx.db.get(args.id);
  
      if (!board) {
        throw new Error("Board not found");
      }
  
      const userId = identity.subject;
  
      const existingFavourite = await ctx.db
        .query("userFavourite")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", userId).eq("boardId", board._id)
        )
        .unique();
  
      if (!existingFavourite) {
        throw new Error("Favourited board not found");
      }
  
      await ctx.db.delete(existingFavourite._id);
  
      return board;
    },
  });
  
//   export const get = query({ 
//     args: { id: v.id("Board") },
//     handler: async (ctx, args) => {
//       const board = await ctx.db.get(args.id);
  
//       if (!board) {
//         throw new Error("Board not found");
//       }
  
//       return board;
//     },
//   });
  








export const get = query({
    args: {
        id: v.id("Board"),
    },
    // returns: v.object({
    //     _id: v.id("Board"),
    //     title: v.string(),
    // }),
    handler: async (ctx, args) => {
        try {
            const board = await ctx.db.get(args.id);
            if (!board) {
                throw new Error("Board not found");
            }
            return {
                _id: board._id,
                title: board.title,
            };
        } catch (error) {
            console.error("Error in handler: ", error);
            throw new Error("Failed to fetch the board");
        }
    },
});







