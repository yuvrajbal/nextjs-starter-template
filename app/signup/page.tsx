import { Suspense } from "react"
import Link from "next/link"
import SignUpForm  from "@/components/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loading } from "@/components/loading"

export default function SignUpPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left side - Hero */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-700" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">NT</span>
          </div>
          Next Template
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &quot;Join thousands of developers who are building amazing apps with this starter template.&quot;
            </p>
            <footer className="text-sm">Yuvraj  - Engineer</footer>
          </blockquote>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Get started with your free account today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loading text="Loading sign up options..." />}>
                <SignUpForm />
              </Suspense>
              
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link 
                  href="/signin" 
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
