import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, ChevronRight, QrCode, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-6 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Kids Church Management System</h1>
          <p className="mt-2">Safely check in and check out your children</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Kids Church</CardTitle>
              <CardDescription>
                Our secure check-in system helps keep your children safe while
                they learn and play.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Use our easy QR code system to check in and check out your
                children quickly and securely.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/check-in">
                    Check In <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/check-out">
                    Check Out <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>New Parents</CardTitle>
              <CardDescription>
                First time visiting? Register your family to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Create a family profile and add your children to our system for
                a smooth check-in experience.
              </p>
              <Button asChild>
                <Link href="/register">
                  Register Your Family <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Family Management</CardTitle>
                <CardDescription>Manage your family profile</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/dashboard/family">
                  View Family Profile <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <QrCode className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Your QR Codes</CardTitle>
                <CardDescription>
                  Access your family&apos;s QR codes
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/dashboard/qrcodes">
                  View QR Codes <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>
                  View your children&apos;s attendance
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/dashboard/attendance">
                  View History <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="mt-12 bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Kids Church Management System</p>
        </div>
      </footer>
    </div>
  );
}
