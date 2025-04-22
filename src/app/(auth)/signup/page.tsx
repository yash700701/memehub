"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form' 
import * as z from 'zod'
import Link from 'next/link'
import axios, {AxiosError} from 'axios'
import { useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
// import { useToast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { signupSchema } from '@/schemas/signupSchema'
import { toast } from 'sonner'
import { Toaster } from "@/components/ui/sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
  
function Page() {

//   const { toast } = useToast()
  const router = useRouter();

  const [userName, setUserName] = useState('')
  const [userNameMessage, setUserNameMessage] = useState('')
  const [isCheckingUserName, setIsCheckingUserName] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // usehooks-ts
  const debounced = useDebounceCallback(setUserName, 600)

  // zod implimentation
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '', 
    }
  })

  useEffect(()=>{
    const checkUserNameUnique = async()=>{
      if(userName){
        setIsCheckingUserName(true)
        setUserNameMessage('')
        try {
          const res = await axios.get(`/api/checkUserNameUniqueness?username=${userName}`)
          setUserNameMessage(res.data.message)
        }catch (error) {
            const axiosError = error as AxiosError;
          
            const message =
              (axiosError.response?.data as { message?: string })?.message ??
              "error checking userName";
          
            setUserNameMessage(message);
          }
           finally {
          setIsCheckingUserName(false)
        }
      }
    } 
    checkUserNameUnique();
  },[userName])

  const onSubmit = async(data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true)
    try {
      console.log(data.email);
      
      await axios.post('/api/signup', data )
      toast.success("signup successfull")
      router.replace(`/verify/${userName}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error("error in signup of user", error);
    //   const axiosError = error as AxiosError
    //   let errorMessage = (axiosError.response?.data as { message?: string })?.message
         toast.error("signup failed")
      setIsSubmitting(false)
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
         <Toaster  position="top-center" richColors />
     <div className=' w-80 my-20'>
     <h1 className='text-6xl mb-10 font-bold'>New here? Let&apos;s fix that</h1>
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>Username</FormLabel>
                <FormControl>
                  <Input  className="px-4 py-2 w-80 bg-white border border-gray-300 rounded shadow-[4px_4px_0px_#000] transition-all duration-200   all-[unset]" placeholder="username" 
                  {...field}
                  onChange={(e)=>{
                    field.onChange(e)
                    debounced(e.target.value)
                  }} 
                  />
                </FormControl>
                {isCheckingUserName && <Loader2 className='animate-spin'/>}
                <p className={`text-sm ${userNameMessage === "username available" ? 'text-green-500' : "text-red-500"}`}>
                    {userNameMessage}
                </p>
                <FormMessage />                               
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>Email</FormLabel>
                <FormControl>
                  <Input  className="px-4 py-2 w-80 bg-white border border-gray-300 rounded shadow-[4px_4px_0px_#000] transition-all duration-200   all-[unset]" placeholder="email" 
                  {...field}
                  // onChange={(e)=>{
                  //   field.onChange(e)
                  //   setUserName(e.target.value)
                  // }}   
                  />
                </FormControl>
                <FormMessage />                               
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>Password</FormLabel>
                <FormControl>
                  <Input  className="px-4 py-2 w-80 bg-white border border-gray-300 rounded shadow-[4px_4px_0px_#000] transition-all duration-200   all-[unset]" type='password' placeholder="password" 
                  {...field}
                  // onChange={(e)=>{
                  //   field.onChange(e)
                  //   setUserName(e.target.value)
                  // }}   
                  />
                </FormControl>
                <FormMessage />                               
              </FormItem>
            )}
          />
          <Button  className="px-4 py-2 w-80 bg-black rounded shadow-[4px_4px_0px_#0b4dbf] transition-all duration-200   all-[unset]" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
              <Loader2 className='h-4 w-4 animate-spin' /> please wait
              </>
            ) : ('signup')} 
          </Button>
        </form>
        <div className='mt-5'>
          already a member? {' '}
          <Link className='text-blue-600' href={'/signin'}>
          signin
          </Link>
        </div>
        <h1 className='text-center mt-20 opacity-60'>@MemeHub</h1>
      </Form>
     </div>
    </div>
  )
}

export default Page