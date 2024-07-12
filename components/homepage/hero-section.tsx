"use client"
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { v4 as uuidv4 } from 'uuid';
import { createRequest } from "@/utils/actions/create-request";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d

const FormSchema = z.object({
    request: z.string(),
})

export default function HeroSection() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            request: "",
        }
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const requestId = uuidv4()

        const numOfPrayers = "0"
        try {
            const response = await createRequest(requestId, data?.request, numOfPrayers)

            form.reset()

            return response
        } catch (error) {
            console.log('error', error)
            return error
        }
    }




    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4 w-full">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Need prayer? Let us know</h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">Want to pray for others? Scroll below.</p>
            {/* <div className="flex w-full max-w-[600px]"> */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full max-w-md">
                    <FormField
                        control={form.control}
                        name="request"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="w-full">
                                    <Textarea {...field} placeholder="Enter your prayer request" className="flex-1" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>

            </Form>
            {/* </div> */}
        </div>
    )
}
