"use client";

import { QrScanner } from "@/components/qr-scanner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, QrCode, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckInPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkedInChildren, setCheckedInChildren] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would search the database
      mockCheckIn();
    }
  };

  const handleQrCodeScanned = () => {
    // In a real app, this would validate the QR code against the database
    mockCheckIn();
    setShowScanner(false);
  };

  const mockCheckIn = () => {
    // Mock data - in a real app, this would come from your database
    const mockChildren = ["John Doe", "Jane Doe"];

    setCheckedInChildren(mockChildren);
    setIsCheckedIn(true);

    toast("Check-in successful!", {
      description: `${mockChildren.length} children have been checked in.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>

      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Check In Your Children</CardTitle>
          <CardDescription>
            Scan your family QR code or search by your family name to check in
            your children.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isCheckedIn ? (
            <>
              {showScanner ? (
                <div className="space-y-4">
                  <QrScanner onScan={handleQrCodeScanned} />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowScanner(false)}
                  >
                    Cancel Scanning
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowScanner(true)}
                  >
                    <QrCode className="mr-2 h-4 w-4" /> Scan QR Code
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or search by family name
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="family-search">Family Name</Label>
                      <Input
                        id="family-search"
                        placeholder="Enter family name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border border-green-200 bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Check-in successful!
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>The following children have been checked in:</p>
                      <ul className="mt-1 list-disc pl-5">
                        {checkedInChildren.map((child, index) => (
                          <li key={index}>{child}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Check-in time: {new Date().toLocaleTimeString()}</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isCheckedIn && (
            <Button variant="outline" onClick={() => setIsCheckedIn(false)}>
              Check In Another Family
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
