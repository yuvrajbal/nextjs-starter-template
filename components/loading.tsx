import { Loader2 } from "lucide-react"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function Loading({ size = "md", text }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loading size="lg" text="Loading..." />
    </div>
  )
}

export function LoadingButton({ children, loading, ...props }: { children: React.ReactNode, loading: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button disabled={loading} {...props}>
      {loading ? <Loading size="sm" /> : children}
    </button>
  )
}
