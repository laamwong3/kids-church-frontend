"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FamilyPage() {
  // Mock data - in a real app, this would come from your database
  const [familyData] = useState({
    parents: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
    },
    emergencyContact: {
      name: "Jane Smith",
      phone: "(555) 987-6543",
    },
    children: [
      {
        id: "CHILD1",
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "2015-05-12",
        allergies: "Peanuts",
        specialNeeds: "None",
      },
      {
        id: "CHILD2",
        firstName: "Jane",
        lastName: "Doe",
        dateOfBirth: "2018-09-23",
        allergies: "None",
        specialNeeds: "Requires assistance with stairs",
      },
    ],
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 size-4" /> Back to Home
        </Link>
      </Button>

      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Family Profile</h1>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Parent Information</CardTitle>
                <CardDescription>
                  Primary parent contact details
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 size-4" /> Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Name
                </dt>
                <dd className="text-sm">
                  {familyData.parents.firstName} {familyData.parents.lastName}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Email
                </dt>
                <dd className="text-sm">{familyData.parents.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Phone
                </dt>
                <dd className="text-sm">{familyData.parents.phone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>
                  Person to contact in case of emergency
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 size-4" /> Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Name
                </dt>
                <dd className="text-sm">{familyData.emergencyContact.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Phone
                </dt>
                <dd className="text-sm">{familyData.emergencyContact.phone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Children</CardTitle>
                <CardDescription>
                  Information about your registered children
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 size-4" /> Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {familyData.children.map((child) => (
                <div key={child.id} className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">
                    {child.firstName} {child.lastName}
                  </h3>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Date of Birth
                      </dt>
                      <dd className="text-sm">{child.dateOfBirth}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Allergies
                      </dt>
                      <dd className="text-sm">{child.allergies}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-muted-foreground">
                        Special Needs
                      </dt>
                      <dd className="text-sm">{child.specialNeeds}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
