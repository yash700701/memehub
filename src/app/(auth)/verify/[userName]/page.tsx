"use client"

import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { Toaster } from "@/components/ui/sonner"

import { Button } from "@/components/ui/button"
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

  const router = useRouter()
  const params = useParams<{userName: string}>()
//   const {toast} = useToast
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true)
    try {
        const response = await axios.post('/api/verifyCode', {
            userName: params.userName, 
            code: data.code
        })

        router.replace(`/`)

        toast.success("verification successfull")
    } catch (error) {
        console.error("error in signup of user", error);
        toast("error in verifying code")
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
             <Toaster  position="top-center" richColors />
       <div className='w-80 my-20 '>
       <h1 className='text-6xl  mb-10 font-bold' >Slide that code in like it’s your crush’s DMs</h1>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
                <FormItem>
                <FormLabel className='text-lg'>We sent a 6 digit verification code to your email.</FormLabel>
                <FormControl>
                    <Input placeholder="verification code" className="px-4 py-2 w-80 bg-white border border-gray-300 rounded shadow-[4px_4px_0px_#000] transition-all duration-200   all-[unset]" {...field} />
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
                ) : ('submit')} 
            </Button>
        </form>
        </Form>
       <h1 className='text-center mt-20 opacity-60'>@MemeHub</h1>
       </div>
    </div>
  )
}

export default Page