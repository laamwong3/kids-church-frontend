"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const childSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date (YYYY-MM-DD)"),
  allergies: z.string().optional(),
  specialNeeds: z.string().optional(),
});

const formSchema = z.object({
  parentFirstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),
  parentLastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .min(10, "Please enter a valid emergency contact phone number"),
  children: z.array(childSchema).min(1, "Please add at least one child"),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentFirstName: "",
      parentLastName: "",
      email: "",
      phone: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      children: [
        {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          allergies: "",
          specialNeeds: "",
        },
      ],
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    // In a real application, you would send this data to your backend
    console.log(data);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Registration successful!", {
        description:
          "Your family has been registered. You can now check in your children.",
      });
      router.push("/dashboard/qrcodes");
    }, 1500);
  }

  const addChild = () => {
    const children = form.getValues("children");
    form.setValue("children", [
      ...children,
      {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        allergies: "",
        specialNeeds: "",
      },
    ]);
  };

  const removeChild = (index: number) => {
    const children = form.getValues("children");
    if (children.length > 1) {
      form.setValue(
        "children",
        children.filter((_, i) => i !== index),
      );
    } else {
      toast.error("Cannot remove child", {
        description: "You must have at least one child registered.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Register Your Family</CardTitle>
          <CardDescription>
            Create a family profile to check in and check out your children
            using our QR code system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium">Parent Information</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="parentFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parentLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium">Emergency Contact</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="emergencyContactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 987-6543" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Children Information</h3>
                  <Button
                    type="button"
                    onClick={addChild}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Child
                  </Button>
                </div>

                {form.watch("children").map((child, index) => (
                  <div key={index} className="mt-6 rounded-md border p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-medium">Child {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removeChild(index)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`children.${index}.firstName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`children.${index}.lastName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`children.${index}.dateOfBirth`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`children.${index}.allergies`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allergies</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="List allergies (if any)"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Leave blank if none
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`children.${index}.specialNeeds`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Special Needs or Instructions</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Any special needs or instructions"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Leave blank if none
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <CardFooter className="flex justify-end px-0">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register Family"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
