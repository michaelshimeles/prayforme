"use client"
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { v4 as uuidv4 } from 'uuid';
import { createRequest } from "@/utils/actions/create-request";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons"

const FormSchema = z.object({
    request: z.string().describe("Your prayer request").min(10, "Your prayer request is too short. Please add more details")
})

const COOLDOWN_TIME = 3 * 60 * 1000; // 3 minutes in milliseconds

export default function HeroSection() {
    const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
    const [cooldownRemaining, setCooldownRemaining] = useState(0);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            request: "",
        }
    })

    useEffect(() => {
        // Load last submission time from localStorage
        const storedTime = localStorage.getItem('lastSubmissionTime');
        if (storedTime) {
            setLastSubmissionTime(parseInt(storedTime, 10));
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (lastSubmissionTime) {
                const elapsed = Date.now() - lastSubmissionTime;
                const remaining = Math.max(0, COOLDOWN_TIME - elapsed);
                setCooldownRemaining(remaining);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [lastSubmissionTime]);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        // if (data?.request === '') {
        //     return;
        // }

        // if (lastSubmissionTime && Date.now() - lastSubmissionTime < COOLDOWN_TIME) {
        //     toast("Please wait before submitting another request.");
        //     return;
        // }

        const requestId = uuidv4();
        const numOfPrayers = "0";

        try {
            const response = await createRequest(requestId, data?.request, numOfPrayers);

            console.log('response', response);
            if (response?.flagged) {
                toast("Prayer request has been flagged as inappropriate");
                return;
            }

            // Update last submission time
            const newSubmissionTime = Date.now();
            setLastSubmissionTime(newSubmissionTime);
            localStorage.setItem('lastSubmissionTime', newSubmissionTime.toString());

            form.reset();
            toast("Prayer request submitted successfully, be encouraged");

            return response;
        } catch (error) {
            console.log('error', error);
            toast("An error occurred while submitting your request");
            return error;
        }
    }

    const isOnCooldown = cooldownRemaining > 0;
    const cooldownMinutes = Math.floor(cooldownRemaining / 60000);
    const cooldownSeconds = Math.floor((cooldownRemaining % 60000) / 1000);

    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4 w-full">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Need prayer? Let us know</h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">Want to pray for others? Scroll below.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full max-w-md">
                    <FormField
                        control={form.control}
                        name="request"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="w-full">
                                    <Textarea {...field} placeholder="Enter your prayer request, please be as specific as possible" className="flex-1" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {!form.formState.isSubmitting ? <Button type="submit" disabled={isOnCooldown}>
                        {isOnCooldown
                            ? `Wait ${cooldownMinutes}m ${cooldownSeconds}s`
                            : "Submit"}
                    </Button> : <Button disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                    }
                </form>
            </Form>
        </div>
    )
}