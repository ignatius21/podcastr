"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";
import { useState } from "react";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";


const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  podcastDescription: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

const CreatePodcast = () => {

  // images
  const [imagePrompt, setImagePrompt] = useState('')
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('')

  // audio
  const [audioUrl, setAudioUrl] = useState('')
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioDuration, setAudioDuration] = useState(0)

  // voice
  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState('')
  
  
  const [isSubmitting, setIsSubmitting] = useState(false)


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });
  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const voiceCategory = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];
  
  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-12"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Podcast Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ignacio Podcast"
                      {...field}
                      className="input-class focus:ring-offset-orange-1"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select a Voice
              </Label>
            </div>

            <Select onValueChange={(value) => setVoiceType(value)}>
              <SelectTrigger
                className={cn("text-16 border-none bg-black-1 text-gray-1")}
              >
                <SelectValue
                  placeholder="Select AI Voice"
                  className="placeholder-gray-1"
                />
              </SelectTrigger>
              <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-offset-orange-1">
                {voiceCategory.map((voice) => (
                  <SelectItem
                    key={voice}
                    value={voice}
                    className="capitalize focus:bg-orange-1"
                  >
                    {voice}
                  </SelectItem>
                ))}
              </SelectContent>
              {voiceType && (
                <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />
              )}
            </Select>
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide text to AI to generate audio"
                      {...field}
                      className="input-class focus:ring-offset-orange-1"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudioUrl={setAudioUrl}
              voiceType={voiceType}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />

            <GenerateThumbnail />
            <div className="mt-10 w-full">
              <Button className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-700 hover:bg-black-1 hover:text-orange-1">
                {isSubmitting ? (
                  <>
                  <Loader className="animate-spin mr-1" size={30} /> 
                  Submitting
                  </>
                ) : (
                  <>
                  Submit and publish podcast
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
