import { auth } from "../auth"
import Image from "next/image"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  const imageSrc = session.user.image ?? undefined;

  return (
    <div>
      <Image 
        src={imageSrc || "/default-avatar.png"} 
        alt="User Avatar" 
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  )
}