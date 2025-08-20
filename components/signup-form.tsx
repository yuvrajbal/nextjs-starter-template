"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import {  Loader2, User } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  // const router = useRouter()

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true)
      await signIn("google")
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Failed to sign up with Google. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      toast.error("Name required ✍️", {
        description: "Please enter your full name."
      })
      return
    }
    
    if (!formData.email.trim()) {
      toast.error("Email required 📧", {
        description: "Please enter your email address."
      })
      return
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format ⚠️", {
        description: "Please enter a valid email address."
      })
      return
    }

    try {
      setIsLoading(true)
      
      // Create user account via API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create account")
      }

      // Show success message
      toast.success("Account created successfully! 🎉", {
        description: "Sending you a magic link to sign in..."
      })

      // Sign in the user automatically with magic link
      const signInResult = await signIn("resend", {
        email: formData.email,
        redirect: false,
      })

      if (signInResult?.ok) {
        toast.success("Check your email! 📧", {
          description: `We sent a magic link to ${formData.email}. Click it to sign in.`,
          duration: 6000,
        })
        // Reset form after successful submission
        setFormData({ name: "", email: "" })
      } else {
        toast.error("Account created but failed to send email", {
          description: "Please try signing in manually.",
        })
      }

    } catch (error) {
      console.error("Sign up error:", error)
      
      if (error instanceof Error) {
        if (error.message.includes("already exists")) {
          toast.error("Email already registered! 📮", {
            description: "Try signing in instead or use a different email.",
            duration: 5000,
          })
        } else {
          toast.error("Failed to create account ❌", {
            description: error.message,
            duration: 5000,
          })
        }
      } else {
        toast.error("Something went wrong ❌", {
          description: "Please check your connection and try again.",
          duration: 5000,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="space-y-4">
      {/* Google Sign Up */}
      <Button
        variant="outline"
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or create with email
          </span>
        </div>
      </div>

      {/* Email Form */}
      <form onSubmit={handleEmailSignUp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            className="transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            className="transition-all duration-200"
          />
        </div>
                <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <User className="mr-2 h-4 w-4" />
          )}
          Create account
        </Button>
      </form>

      <p className="text-xs text-center text-muted-foreground">
        We&apos;ll create your account and send you a magic link to sign in.
      </p> 
    </div>
  )
}
