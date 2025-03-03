"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface QrScannerProps {
  onScan: (data: string) => void;
}

export function QrScanner({ onScan }: QrScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would use a library like html5-qrcode or react-qr-reader
    // For this demo, we'll simulate a QR code scan after a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Simulate a successful scan
      onScan("FAMILY_DOE123");
    }, 3000);

    return () => clearTimeout(timer);
  }, [onScan]);

  // This is a placeholder for the actual QR scanner component
  // In a real application, you would render the scanner here
  return (
    <Card className="p-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        {isLoading ? (
          <>
            <div className="flex size-64 items-center justify-center bg-muted">
              <div className="flex animate-pulse flex-col items-center">
                <div className="size-16 rounded-full bg-muted-foreground/20"></div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Accessing camera...
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Please allow camera access when prompted
            </p>
          </>
        ) : error ? (
          <div className="text-center">
            <p className="text-destructive">{error}</p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setError(null)}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex size-64 items-center justify-center bg-muted">
              <div className="animate-pulse">
                <p className="text-muted-foreground">Scanning...</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Position the QR code within the frame
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
