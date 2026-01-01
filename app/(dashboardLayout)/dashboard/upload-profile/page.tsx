"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, MousePointer, Plus, Upload, Trash2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// প্রোফাইলের টাইপ ডিফাইন করুন
type TProfile = {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  createdAt?: string;
  updatedAt?: string;
}

const BlogsPage = () => {
  const [profile, setProfile] = useState<TProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const heroRef = useRef(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://shomik-server.vercel.app/api/profile")
      if (!response.ok) throw new Error(`Profile fetch failed with status ${response.status}`)
      
      const data = await response.json()
      // প্রোফাইল ডেটা একটি অ্যারে হতে পারে, তাই প্রথম প্রোফাইল নিন
      setProfile(Array.isArray(data.data) ? data.data[0] : data.data)
    } catch (err) {
      console.error(err)
      setError("Failed to load profile.")
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    try {
      setUploading(true)
      
      const formData = new FormData()
      const profileData = {
        name: profile?.name || "Shomik",
        email: profile?.email || "shomikujzaman@gmail.com"
      }
      
      formData.append("data", JSON.stringify(profileData))
      formData.append("file", file)

      const response = await fetch("https://shomik-server.vercel.app/api/profile/create-profile", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()
      
      if (result.success) {
        toast.success("Profile image uploaded successfully!")
        fetchProfile() // Refresh profile data
      } else {
        throw new Error(result.message || "Upload failed")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUpdateProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile?._id) return

    try {
      setUploading(true)
      
      const formData = new FormData()
      const profileData = {
        name: profile?.name || "Shomik",
        email: profile?.email || "shomik@example.com"
      }
      
      formData.append("data", JSON.stringify(profileData))
      formData.append("file", file)

      const response = await fetch(`https://shomik-server.vercel.app/api/profile/${profile._id}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Update failed")
      }

      const result = await response.json()
      
      if (result.success) {
        toast.success("Profile image updated successfully!")
        fetchProfile() // Refresh profile data
      } else {
        throw new Error(result.message || "Update failed")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to update image")
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteProfile = async () => {
    if (!profile?._id) return

    if (!window.confirm("Are you sure you want to delete your profile image?")) {
      return
    }

    try {
      setDeleting(true)
      
      const response = await fetch(`https://shomik-server.vercel.app/api/profile/${profile._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      const result = await response.json()
      
      if (result.success) {
        toast.success("Profile image deleted successfully!")
        setProfile(prev => prev ? { ...prev, profileImage: "" } : null)
      } else {
        throw new Error(result.message || "Delete failed")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete profile image")
    } finally {
      setDeleting(false)
    }
  }

  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" /></div>

  return (
    <div className="min-h-screen bg-background dark:bg-black">
      <main>
        {/* --- DYNAMIC HERO SECTION --- */}
        <section ref={heroRef} className="relative min-h-[90vh] py-20 flex items-center justify-center overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex flex-col items-center gap-8">
                <Badge className="w-fit bg-primary/10 text-primary border-primary/20">
                  <Star className="w-3 h-3 mr-1" /> Profile Management
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                  <span className="bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
                    Profile
                  </span>{" "}
                  Dashboard
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[600px] mx-auto">
                  Manage your profile image and personal information. Upload, update, or delete your profile picture.
                </p>

                {/* Profile Image Section */}
                <div className="relative mt-8">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-600 to-pink-600 p-1 animate-pulse" />
                    
                    <div className="absolute inset-1 rounded-full overflow-hidden bg-background">
                      {profile?.profileImage ? (
                        <Image 
                          src={profile.profileImage}
                          alt={profile.name || "Profile"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 256px, 320px"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20">
                          <div className="text-4xl font-bold text-primary">
                            {profile?.name?.[0]?.toUpperCase() || "S"}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Profile Info Badge */}
                    {profile?.name && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                        {profile.name}
                      </div>
                    )}
                    
                    {/* Email Badge */}
                    {profile?.email && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                        {profile.email}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center mt-12">
                    {/* Upload/Update Button */}
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-purple-600"
                      onClick={handleFileSelect}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                          {profile?.profileImage ? "Updating..." : "Uploading..."}
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          {profile?.profileImage ? "Update Image" : "Upload Image"}
                        </>
                      )}
                    </Button>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={profile?.profileImage ? handleUpdateProfile : handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    {/* Delete Button (only show if image exists) */}
                    {profile?.profileImage && (
                      <Button
                        size="lg"
                        variant="destructive"
                        onClick={handleDeleteProfile}
                        disabled={deleting}
                      >
                        {deleting ? (
                          <>
                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Image
                          </>
                        )}
                      </Button>
                    )}

                    {/* Create Profile Button (if no profile exists) */}
                    {!profile && (
                      <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600">
                        <Link href="/create-profile">
                          <Plus className="mr-2 h-4 w-4" /> Create Profile
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Instructions */}
                  <div className="mt-8 text-sm text-muted-foreground max-w-md mx-auto">
                    <p className="mb-2">• Supported formats: JPG, PNG, WebP</p>
                    <p className="mb-2">• Maximum file size: 5MB</p>
                    <p>• Recommended size: 400x400 pixels (square image)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
            <MousePointer className="h-5 w-5" />
          </div>
        </section>

        {/* --- INFO SECTION --- */}
        <section className="py-20 container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card dark:bg-gray-900 border border-border/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{profile?.name || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{profile?.email || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Profile Status</p>
                    <Badge variant={profile?.profileImage ? "default" : "secondary"} className="mt-1">
                      {profile?.profileImage ? "Image Uploaded" : "No Image"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-gray-900 border border-border/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Profile Image</p>
                      <p className="text-sm text-muted-foreground">
                        {profile?.profileImage 
                          ? `Last updated: ${profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : "Recently"}` 
                          : "No image uploaded yet"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Account Created</p>
                      <p className="text-sm text-muted-foreground">
                        {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Recently"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default BlogsPage