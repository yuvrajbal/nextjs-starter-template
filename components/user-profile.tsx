"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Mail, Calendar, Clock, Globe, MapPin, Edit, Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UserProfileProps {
  user: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    emailVerified?: Date | null
  }
}

export  function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
  })

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
    })
    setIsEditing(false)
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      
      // TODO: Implement actual profile update API call
      // await updateProfile(user.id, formData)
      
      // For now, just show success toast
      toast.success("Profile updated!", {
        description: "Your profile has been updated successfully."
      })
      
      setIsEditing(false)
    } catch (error) {
      toast.error("Failed to update profile", {
        description: "Please try again later."
      })
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

  const createdAt = new Date().toLocaleDateString() // You can get this from your database
  const lastSignIn = new Date().toLocaleDateString() // You can get this from session data

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Personal Information
              
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.image || ""} alt={user.name || ""} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
          
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
               
                  <p className="text-sm text-muted-foreground">{user.name}</p>
               
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {user.emailVerified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-200">
                        Verified
                      </span>
                    )}
                  </div>
               
              </div>
            </div>
          </CardContent>
        </Card>

      

        
      </div>
    </div>
  )
}
