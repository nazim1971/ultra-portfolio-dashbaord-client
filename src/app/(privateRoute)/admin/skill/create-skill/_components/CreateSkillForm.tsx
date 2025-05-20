/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { skillValidationSchema } from "./SkillValidation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TSkillInput } from "@/types"; // Only import the input type
import { createSkill } from "../_actions";
import { useRouter } from "next/navigation";

const CreateSkillForm = () => {
  const form = useForm<TSkillInput>({
    resolver: zodResolver(skillValidationSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });
   const router = useRouter(); 

  const onSubmit: SubmitHandler<TSkillInput> = async (data) => {
    try {
      await createSkill(data)
      toast.success("Skill created successfully!");
      router.push("/admin/skill/manage-skill");
    } catch (err: any) {
      toast.error(err.message || "Failed to create skill.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Skill</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Docker" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.svg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit Skill
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateSkillForm;
