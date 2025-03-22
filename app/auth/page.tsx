// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { createUser,getuser } from "@/actions/actions"

// import { Button } from "@/components/ui/Button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"


// // Define the form schema
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   password : z.string().min(8,{
//     message : "Password must be at least 8 characters."
//   })
// })

// export function ProfileForm() {
//   // Define your form using useForm
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       password : ""
//     },
//   })

//   // Handle form submission
//   const onSubmit = (data: z.infer<typeof formSchema>) => {
//         const id = createUser(data.username,data.password);
//         console.log(id);
//   }

//   const getUSER = (data : z.infer<typeof formSchema>)=>{
//     const id = getuser(data.username,data.password);
//     console.log("yes")
//   }

//   return (
//     <div className="w-full h-full flex justify-center items-center">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(getUSER)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input placeholder="shadcn" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   This is your public display name.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="••••••••" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   Fill the password
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit">Submit</Button>
          
//         </form>
//       </Form>
//     </div>
//   )
// }

// export default ProfileForm


"use client"
import { useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react"; // Import icons
import { useRouter } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const router = useRouter();
  const user = useUser().user;
  

  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-black transition-all duration-500">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="text-4xl font-extrabold text-gray-900 dark:text-gray-200">
        </div>
        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300 font-bold">
          <li className="hover:text-indigo-500 cursor-pointer">About</li>
          <li className="hover:text-indigo-500 cursor-pointer">Features</li>
          <li className="hover:text-indigo-500 cursor-pointer">Contact</li>
        </ul>
        {/* <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition" onClick={() => router.push("/signIn")}>
          {user?.fullName ? (
            <SignOutButton redirectUrl="/auth" />
          ) : "sign in"}
        </button> */}
        <UserButton/>
      </nav>

      {/* Hero Section */}
      <section className="text-center flex flex-col justify-center items-center px-6 py-16">
        <h1 className="text-6xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 transition-all">
          Welcome <br></br>
          to <br/> Taskio

        </h1>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-3 px-6 rounded-full text-gray-800 dark:text-gray-800 shadow-md"
          />
          <button className="absolute right-4 top-3 text-gray-600 dark:text-gray-400">
            🔍
          </button>
        </div>
        {/* { !user?.fullName ? (
        <div className="flex space-x-4 mt-6">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transform hover:scale-105 transition duration-300">
            FREE TRIAL
          </button>
          <button className="border-2 border-gray-800 dark:border-gray-300 px-6 py-2 rounded-full hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black transition">
            See More
          </button>
        </div>
        ): (
          <>
          <div className="flex-1 w-72 my-5">
          <code className="text-3xl space-y-4 font-bold ">{"Welcome back " + user?.fullName}</code>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg flex space-x-4 mt-6 " onClick={()=> router.push("/")}>
            go ahead
          </button>
          </>
        ) */}
      {/* } */}
      <div className="flex-1 w-72 my-5">
          <code className="text-3xl space-y-4 font-bold ">{"Welcome back " + user?.fullName}</code>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg flex space-x-4 mt-6 " onClick={()=> router.push("/")}>
            go ahead
          </button>
      </section>

      {/* Abstract Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      </div>

      {/* Toggle Dark Mode */}
      <div className="fixed bottom-10 right-10">
        <button
          onClick={toggleDarkMode}
          className="flex items-center space-x-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-black px-4 py-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          {isDarkMode ? (
            <>
              <SunIcon className="h-6 w-6 text-yellow-400" /> <span>Light Mode</span>
            </>
          ) : (
            <>
              <MoonIcon className="h-6 w-6 text-gray-300" /> <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

