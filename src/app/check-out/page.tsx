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

export default function CheckOutPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [checkedOutChildren, setCheckedOutChildren] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would search the database
      mockCheckOut();
    }
  };

  const handleQrCodeScanned = () => {
    // In a real app, this would validate the QR code against the database
    mockCheckOut();
    setShowScanner(false);
  };

  const mockCheckOut = () => {
    // Mock data - in a real app, this would come from your database
    const mockChildren = ["John Doe", "Jane Doe"];

    setCheckedOutChildren(mockChildren);
    setIsCheckedOut(true);

    toast("Check-out successful!", {
      description: `${mockChildren.length} children have been checked out.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 size-4" /> Back to Home
        </Link>
      </Button>

      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Check Out Your Children</CardTitle>
          <CardDescription>
            Scan your family QR code or search by your family name to check out
            your children.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isCheckedOut ? (
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
                    <QrCode className="mr-2 size-4" /> Scan QR Code
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
                      <Search className="mr-2 size-4" /> Search
                    </Button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <svg
                      className="size-5 text-blue-400"
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
                    <h3 className="text-sm font-medium text-blue-800">
                      Check-out successful!
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>The following children have been checked out:</p>
                      <ul className="mt-1 list-disc pl-5">
                        {checkedOutChildren.map((child, index) => (
                          <li key={index}>{child}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Check-out time: {new Date().toLocaleTimeString()}</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isCheckedOut && (
            <Button variant="outline" onClick={() => setIsCheckedOut(false)}>
              Check Out Another Family
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
