/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from "@/components/ui/button";
import { SignUpForm } from "./_features/SignUpForm";
import { useRouter } from "next/navigation";


export default function SignUp() {
    const router = useRouter()
  return (
    <div className="flex w-screen h-screen ">
      <div className="w-1/2 h-full  flex items-center justify-center relative">
        <img src="/image.jpg" className="w-full" />
      </div>
      <div className="w-1/2 h-full flex items-center justify-center relative">
        <Button onClick={()=>router.push('/login')} className="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ... h-10 px-4 py-2 absolute top-8 right-20 cursor-pointer text-lg font-medium text-black-600 italic">
          Login
        </Button>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-4xl font-extrabold text-center text-fuchsia-500">
              Create an bussiness
            </p>
            <p className="text-sm text-indigo-500 text-center">
              Choose a username for phone page
            </p>
          </div><SignUpForm/>
        </div>
      </div>
    </div>
  );
}
