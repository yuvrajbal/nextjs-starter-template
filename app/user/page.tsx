import { Suspense } from "react"
import { auth } from "@/auth"
import { UserProfile } from "@/components/user-profile"
import { LoadingPage } from "@/components/loading"
import { ErrorBoundary } from "@/components/error-boundary"
import { redirect } from "next/navigation"

export default async function UserPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/signin")
  }

  return (
    <div className="container mx-auto py-8">
      <ErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <UserProfile user={session.user} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
