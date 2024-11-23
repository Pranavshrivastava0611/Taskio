import { error } from "console";
import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (Mutationfunction : any)=>{
    const [pending,setPending] = useState(false);
    const apiMutation = useMutation(Mutationfunction);
    
    const mutate = (payload : any)=>{
        setPending(true);
        return apiMutation(payload).finally(()=>setPending(false)).then((result)=> {
            return result;
        }).catch((error) =>{
            throw error
        })

        
    }
    return {
        mutate,pending
    }
}