'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
   email: z.string().email('Invalid email address'),
   message: z.string().min(10, 'Message must be at least 10 characters long')
})

type FormData = z.infer<typeof formSchema>;

export default function Home() {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const resetForm = () => {
    form.reset({
      name: '',
      email: '',
      message: ''
    });
  }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      setLoading(true);

      //Connect to API here

      await fetch('api/save-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(async () => {
        await fetch('api/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }).catch((error) => {
        setError(error);
      })


      setLoading(false);

      resetForm();
    }
  )};



  return (
    <div className="flex justify-center items-center h-screen">
    <Card className="w-[350px]">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle>Example Form</CardTitle>
        <CardDescription>Send info to Supabase.</CardDescription>
      </CardHeader>
      <CardContent>

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Joe Bloggs" {...field} />
              </FormControl>
              <FormDescription>
                This is your name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
            </div>
            <div className="flex flex-col space-y-1.5">
            <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@test.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
            </div>
            <div className="flex flex-col space-y-1.5">
            <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your message here..." {...field} />
              </FormControl>
              <FormDescription>
                This is your message.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
            </div>
          </div>

      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => resetForm()}>Cancel</Button>
        <Button type='submit' disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</Button>
      </CardFooter>
      </form>
      </Form>
    </Card>
    </div>
  );
}
