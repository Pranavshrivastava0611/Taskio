import {v} from "convex/values"
import { mutation, query } from "./_generated/server"
import { favourite } from "./board";
import {getAllOrThrow} from "convex-helpers/server/relationships"

export const get = query({
    args : {
        orgId : v.string() ,
        search : v.optional(v.string()),
        favourites : v.optional(v.string()),
    },
    handler : async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const title  = args.search as string;
        const favourites = args.favourites as string
        let boards = [];
        if(favourites){
           const favouriteBoard = await ctx.db.query("userFavourite").withIndex("by_user_org",(q)=> q.eq("userId",identity.subject).eq("orgId",args.orgId)).order("desc").collect();

            const id = favouriteBoard.map((board)=> board.boardId)

            const boards = await getAllOrThrow(ctx.db,id)

            return boards.map((board)=>({
                ...board,isFavourite : true
            }))


        }
        if(title){
            boards =  await ctx.db.query("Board").withSearchIndex("search_title",(q)=> q.search("title",title).eq("orgId",args.orgId)).collect();
        }else{
             boards = await ctx.db.query("Board").withIndex("by_org",(q)=> q.eq("orgId",args.orgId)).order("desc").collect();
        }
        
        

        const boardsWithFavouriteRelation = boards.map((board)=>{

            return ctx.db.query("userFavourite")
            .withIndex("by_user_board",(q)=> 
            q.eq("userId",identity.subject)
            .eq("boardId",board._id)

        ).unique()
        .then((favourite)=>{
            return {
                ...board,isFavourite : !! favourite
            }
        })
        })
        const boardsWithFavouriteBoolean = Promise.all(boardsWithFavouriteRelation)
        return boardsWithFavouriteBoolean;
    },   
    
})

export const  getBoard = query({
    args : {
        id : v.id("Board")
    },
    handler : async (ctx,args)=>{
        const board = ctx.db.query("Board").withIndex("by_org",(q)=> q.eq("orgId",args.id))
    }
})



