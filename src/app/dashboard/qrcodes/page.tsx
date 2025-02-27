"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  generateChildQRData,
  generateFamilyQRData,
  generateQRCode,
} from "@/lib/qr-utils";
import { ArrowLeft, Download, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QrCodesPage() {
  const [activeTab, setActiveTab] = useState("family");
  const [familyQrCode, setFamilyQrCode] = useState<string>("");
  const [childrenQrCodes, setChildrenQrCodes] = useState<
    Record<string, string>
  >({});

  // Mock data - in a real app, this would come from your database
  const familyData = {
    id: "DOE123",
    name: "Doe Family",
    children: [
      { id: "CHILD1", name: "John Doe", dateOfBirth: "2015-05-12" },
      { id: "CHILD2", name: "Jane Doe", dateOfBirth: "2018-09-23" },
    ],
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async (qrId: string, qrCode: string) => {
    const link = document.createElement("a");
    link.download = `qr-code-${qrId}.png`;
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const generateQrCodes = async () => {
      try {
        // Generate family QR code
        const familyQrData = generateFamilyQRData(familyData.id);
        const familyQr = await generateQRCode(familyQrData);
        setFamilyQrCode(familyQr);

        // Generate children QR codes
        const childrenQrs: Record<string, string> = {};
        for (const child of familyData.children) {
          const childQrData = generateChildQRData(child.id, familyData.id);
          childrenQrs[child.id] = await generateQRCode(childQrData);
        }
        setChildrenQrCodes(childrenQrs);
      } catch (error) {
        console.error("Error generating QR codes:", error);
      }
    };

    generateQrCodes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>

      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">Your QR Codes</h1>

        <Tabs
          defaultValue="family"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger value="family">Family QR Code</TabsTrigger>
            <TabsTrigger value="children">
              Individual Child QR Codes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="family">
            <Card>
              <CardHeader>
                <CardTitle>{familyData.name} QR Code</CardTitle>
                <CardDescription>
                  Use this QR code to check in or check out all your children at
                  once.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="mb-6 rounded-lg border-4 border-primary/10 p-4">
                  {familyQrCode ? (
                    <Image
                      src={familyQrCode}
                      alt="Family QR Code"
                      className="h-64 w-64"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <div className="flex h-64 w-64 items-center justify-center bg-muted">
                      <div className="text-6xl font-bold text-muted-foreground/50">
                        Loading...
                      </div>
                    </div>
                  )}
                  <p className="mt-2 text-center font-semibold">
                    {familyData.id}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" /> Print QR Code
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(familyData.id, familyQrCode)}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </div>

                <div className="mt-8 text-sm text-muted-foreground">
                  <p>
                    This QR code is linked to your family account and all your
                    registered children.
                  </p>
                  <p>
                    Present this code when dropping off or picking up your
                    children.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="children">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {familyData.children.map((child) => (
                <Card key={child.id}>
                  <CardHeader>
                    <CardTitle>{child.name}</CardTitle>
                    <CardDescription>
                      Individual QR code for {child.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="mb-6 rounded-lg border-4 border-primary/10 p-4">
                      {childrenQrCodes[child.id] ? (
                        <Image
                          src={childrenQrCodes[child.id]}
                          alt={`QR Code for ${child.name}`}
                          className="h-48 w-48"
                          width={200}
                          height={200}
                        />
                      ) : (
                        <div className="flex h-48 w-48 items-center justify-center bg-muted">
                          <div className="text-4xl font-bold text-muted-foreground/50">
                            Loading...
                          </div>
                        </div>
                      )}
                      <p className="mt-2 text-center font-semibold">
                        {child.id}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleDownload(child.id, childrenQrCodes[child.id])
                        }
                      >
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 rounded-lg bg-muted p-4">
          <h3 className="mb-2 font-medium">Instructions:</h3>
          <ol className="list-decimal space-y-2 pl-5 text-sm">
            <li>Print these QR codes or save them on your phone.</li>
            <li>
              When dropping off your children, present the QR code to the
              check-in volunteer.
            </li>
            <li>
              When picking up your children, present the same QR code to the
              check-out volunteer.
            </li>
            <li>
              For security reasons, only authorized adults can check out
              children.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
