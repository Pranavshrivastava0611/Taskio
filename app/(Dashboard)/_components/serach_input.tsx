"use client"

import { UserButton } from "@clerk/nextjs"
import qs, { Stringifiable } from "query-string"
import { Search } from "lucide-react"
import {useDebounce} from "use-debounce"
import { useRouter } from "next/navigation"
import { useState,useEffect,ChangeEvent } from "react"
import { Input } from "@/components/ui/input"


const Searchinput= ()=>{
    const router = useRouter();
    const [value,Setvalue] = useState("");
    const [debounce] = useDebounce(value,500);

    const handleChange = (e : ChangeEvent<HTMLInputElement>)=>{
        Setvalue(e.target.value)
    }

    useEffect(()=>{
        const url = qs.stringifyUrl({
            url : "/",
            query : {
                search : debounce,
            }
        },{skipEmptyString : true , skipNull : true})

        router.push(url)
    },[debounce,router])
    

return (
    <div className="text-black w-full relative">
        <Search className="absolute top-5 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
        <Input className="w-full max-w-[516px] pl-9 " placeholder="Search" value={value} onChange={handleChange}/>
    </div>
)



}

export default Searchinput
