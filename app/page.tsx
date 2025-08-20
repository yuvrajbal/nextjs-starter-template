import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Database, Shield, Palette, Smartphone } from "lucide-react";

// Function to check database connection
async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { connected: true, error: null }
  } catch (error) {
    console.error('Database connection error:', error)
    return { connected: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export default async function Home() {
  const session = await auth()
  const dbStatus = await checkDatabaseConnection()
  const features = [
    {
      icon: Shield,
      title: "Authentication",
      description: "NextAuth.js with Google OAuth, JWT sessions, and Prisma adapter"
    },
    {
      icon: Palette,
      title: "UI Components",
      description: "shadcn/ui components with dark/light theme support"
    },
    {
      icon: Database,
      title: "Database Ready",
      description: "PostgreSQL with Prisma ORM, migrations, and type safety"
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first design with Tailwind CSS"
    },
    {
      icon: Users,
      title: "User Management",
      description: "Complete user profiles, settings, and account management"
    }
  ]
  
  return (
   <div className="container mx-auto py-8 space-y-8 px-4">
    {/* Hero Section */}
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold gradient-text">Welcome to NextTemplate</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Hello {session?.user?.name || 'User'}! 👋 You&apos;re using a modern Next.js starter template 
        with authentication, theming, and all the essentials for your next project.
      </p>
    </div>

    {/* Stats Cards */}
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Status</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {session?.user?.email && <div className="text-2xl font-bold text-green-600">Active</div>}
          {session?.user?.email && <p className="text-xs text-muted-foreground">
            Signed in with Google
          </p>}
         {/* if session is null show not connected */}
         {!session?.user?.email && <div className="text-2xl font-bold text-red-600">Not Connected</div>}
         {!session?.user?.email && <p className="text-xs text-muted-foreground">
            Sign in with Google
          </p>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Theme</CardTitle>
          <Palette className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">System</div>
          <p className="text-xs text-muted-foreground">
            Auto dark/light mode
          </p>
         
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Database</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${dbStatus.connected ? 'text-green-600' : 'text-red-600'}`}>
            {dbStatus.connected ? 'Connected' : 'Not Connected'}
          </div>
          <p className="text-xs text-muted-foreground">
            PostgreSQL with Prisma
          </p>
          {!dbStatus.connected && dbStatus.error && (
            <p className="text-xs text-red-500 mt-1">
              Error: {dbStatus.error}
            </p>
          )}
        </CardContent>
      </Card>
    </div>

    {/* Features Grid */}
    <div>
      <h2 className="text-2xl font-bold mb-6">What&apos;s Included</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <feature.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    {/* Quick Actions */}
    <div>
      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link href="/user">View Profile</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/test-db">Test Database</Link>
        </Button>
      
        <Button variant="secondary" asChild>
          <Link href="https://github.com/yourusername/nextjs-starter" target="_blank">
            View on GitHub
          </Link>
        </Button>
      </div>
    </div>
   </div>
  );
}
