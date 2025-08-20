import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ErrorBoundary } from "@/components/error-boundary"
import { RefreshButton } from "@/components/refresh-button"
import { Database, CheckCircle, XCircle, Users, Activity, Clock } from "lucide-react"
import Link from "next/link"

// Database connection test
async function testDatabaseConnection() {
  try {
    // Test basic connection
    await prisma.$queryRaw`SELECT 1`
    
    // Get some stats
    const userCount = await prisma.user.count()
    const accountCount = await prisma.account.count()
    const sessionCount = await prisma.session.count()
    
    return {
      connected: true,
      error: null,
      stats: {
        users: userCount,
        accounts: accountCount,
        sessions: sessionCount
      },
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Database test error:', error)
    return {
      connected: false,
      error: error instanceof Error ? error.message : String(error),
      stats: null,
      timestamp: new Date().toISOString()
    }
  }
}

export default async function TestDatabasePage() {
  const session = await auth()
  const dbTest = await testDatabaseConnection()
  
  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="h-8 w-8" />
            Database Connection Test
          </h1>
          <p className="text-muted-foreground">
            Test and monitor your PostgreSQL database connection
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/">← Back to Dashboard</Link>
        </Button>
      </div>

      <ErrorBoundary>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Connection Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {dbTest.connected ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                Connection Status
              </CardTitle>
              <CardDescription>
                Real-time database connectivity check
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant={dbTest.connected ? "default" : "destructive"}>
                  {dbTest.connected ? "Connected" : "Failed"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database:</span>
                <span className="text-sm text-muted-foreground">PostgreSQL</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">ORM:</span>
                <span className="text-sm text-muted-foreground">Prisma</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Checked:</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(dbTest.timestamp).toLocaleString()}
                </span>
              </div>

              {!dbTest.connected && dbTest.error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                  <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                    Connection Error:
                  </h4>
                  <p className="text-xs text-red-600 dark:text-red-300 font-mono">
                    {dbTest.error}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Database Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Database Statistics
              </CardTitle>
              <CardDescription>
                Current data in your database
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dbTest.connected && dbTest.stats ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Users:</span>
                    </div>
                    <Badge variant="secondary">{dbTest.stats.users}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Accounts:</span>
                    </div>
                    <Badge variant="secondary">{dbTest.stats.accounts}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Sessions:</span>
                    </div>
                    <Badge variant="secondary">{dbTest.stats.sessions}</Badge>
                  </div>

                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                    <p className="text-xs text-green-700 dark:text-green-300">
                      ✅ All database tables are accessible and functioning properly.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-red-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Unable to fetch database statistics
                  </p>
                  <p className="text-xs text-red-500 mt-1">
                    Database connection failed
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Database management and testing tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/api/test">API Test Endpoint</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/api/admin">Admin API</Link>
              </Button>
              <RefreshButton />
              {session?.user && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/user">View Profile</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Environment Info */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">NODE_ENV:</span>
                <Badge variant="outline">{process.env.NODE_ENV}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">DATABASE_URL:</span>
                <Badge variant={process.env.DATABASE_URL ? "default" : "destructive"}>
                  {process.env.DATABASE_URL ? "Configured" : "Missing"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">User Session:</span>
                <Badge variant={session ? "default" : "secondary"}>
                  {session ? "Authenticated" : "Anonymous"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </ErrorBoundary>
    </div>
  )
}
