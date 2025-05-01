"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form' 
import * as z from 'zod'
import Link from 'next/link'
import { useState, useEffect } from 'react'
// import { useToast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

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
import { signinSchema } from '@/schemas/signinSchema'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { Toaster } from "@/components/ui/sonner"

  
function Page() {

//   const { toast } = useToast()
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/");
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false)


  // zod implimentation
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: '',
      password: '', 
    }
  })

  const onSubmit = async(data: z.infer<typeof signinSchema>) => {
    setIsSubmitting(true)

    const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
    })

    if(result?.error){
      toast.error(result.error)
    }else{
      toast.success("login successfull")
    }

    setIsSubmitting(false)
    
    
    router.replace(`/`)
   
  }

  return (
    <div className=' relative w-full h-screen flex flex-col items-center justify-center bg-zinc-50'>
        <Toaster  position="top-center" richColors />
    {/* <Image
      src={bg}
      className='h-screen w-full object-cover opacity-60'   
      alt="Funny meme"
      width={600}
      height={400}
    /> */}
       <div className='absolute w-80 '>
        <h1 className='text-6xl text-zinc-950 mb-10 font-bold ' >Let Me In </h1>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xl'>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" 
                   className="px-4 py-2 w-80 bg-white border border-gray-300 rounded shadow-[4px_4px_0px_#000] transition-all duration-200   all-[unset]"
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
                <FormLabel className='text-xl'>Password</FormLabel>
                <FormControl>
                  <Input type='password'
                   className="px-4 py-2 w-80 bg-white border border-gray-300 rounded shadow-[4px_4px_0px_#000] transition-all duration-200   all-[unset]"
                  placeholder="password" 
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
          <Button type="submit" 
           className="px-4 py-2 w-80 bg-black  rounded shadow-[4px_4px_0px_#0b4dbf] transition-all duration-200   all-[unset] text-white"
          disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
              <Loader2 className='h-4 w-4 animate-spin' /> please wait
              </>
            ) : ('signin')} 
  
          </Button>
        </form>
        <div className='mt-5'>
          don’t have an account?{' '}
          <Link className='text-blue-600' href="/signup">signup</Link> {/* ✅ Corrected */}
        </div>
        <h1 className='text-center mt-20 opacity-60'>@MemeHub</h1>
      </Form>
       </div>
    </div>
  )
}

export default Page