"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type AttendanceRecord = {
  id: string;
  childName: string;
  checkInTime: string;
  checkOutTime: string;
  date: string;
  classroom: string;
};

export default function AttendancePage() {
  // Mock data - in a real app, this would come from your database
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: "ATT1",
      childName: "John Doe",
      checkInTime: "09:30 AM",
      checkOutTime: "12:30 PM",
      date: "2024-02-18",
      classroom: "Preschool",
    },
    {
      id: "ATT2",
      childName: "Jane Doe",
      checkInTime: "09:35 AM",
      checkOutTime: "12:25 PM",
      date: "2024-02-18",
      classroom: "Elementary",
    },
    {
      id: "ATT3",
      childName: "John Doe",
      checkInTime: "09:28 AM",
      checkOutTime: "12:35 PM",
      date: "2024-02-11",
      classroom: "Preschool",
    },
    {
      id: "ATT4",
      childName: "Jane Doe",
      checkInTime: "09:32 AM",
      checkOutTime: "12:30 PM",
      date: "2024-02-11",
      classroom: "Elementary",
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 size-4" /> Back to Home
        </Link>
      </Button>

      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center gap-4">
          <Calendar className="size-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Attendance History</h1>
            <p className="text-muted-foreground">
              View your children&apos;s attendance records
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>
              Showing attendance records for the past weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Child Name</TableHead>
                  <TableHead>Classroom</TableHead>
                  <TableHead>Check-in Time</TableHead>
                  <TableHead>Check-out Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell className="font-medium">
                      {record.childName}
                    </TableCell>
                    <TableCell>{record.classroom}</TableCell>
                    <TableCell>{record.checkInTime}</TableCell>
                    <TableCell>{record.checkOutTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="rounded-lg bg-muted p-4">
          <h3 className="mb-2 font-medium">Note:</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Attendance records are automatically created when you check in and
              check out your children.
            </li>
            <li>Records are organized by date, with the most recent first.</li>
            <li>
              If you notice any discrepancies, please contact the Kids Church
              staff.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
