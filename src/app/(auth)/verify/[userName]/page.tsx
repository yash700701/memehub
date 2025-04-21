"use client"

import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'

function page() {

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

        toast({
            title: "success",
            description: response.data.message
        })
    } catch (error) {
        console.error("error in signup of user", error);
        const axiosError = error as AxiosError
        let errorMessage = axiosError.response?.data.message
    //   toast({
    //     title: "signup failed",
    //     description: errorMessage,
    //     varient: "destructive"
    //   })
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
                <FormItem>
                <FormLabel>verification code</FormLabel>
                <FormControl>
                    <Input placeholder="verification code" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
           <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
              <Loader2 className='h-4 w-4 animate-spin' /> please wait
              </>
            ) : ('submit')} 
          </Button>
        </form>
        </Form>
    </div>
  )
}

export default page