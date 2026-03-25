import cn from "@/lib/utils"
import Link from "next/link"
import { 
  FaLinkedin, 
  FaInstagram, 
  FaTwitter, 
  FaFacebook, 
  FaPinterest,
  FaShare
} from "react-icons/fa"

interface SocialLinksProps {
  className?: string
}

const SocialLinks = ({ className }: SocialLinksProps) => {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/shomikujzaman/",
      icon: <FaLinkedin className="h-5 w-5" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/crazy_shomik",
      icon: <FaInstagram className="h-5 w-5" />,
    },
    {
      name: "Twitter",
      href: "https://x.com/crazy_shomik",
      icon: <FaTwitter className="h-5 w-5" />,
    },
    {
      name: "Pinterest",
      href: "https://www.pinterest.com/shomikujzaman/",
      icon: <FaPinterest className="h-5 w-5" />,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/crazyshomik",
      icon: <FaFacebook className="h-5 w-5" />,
    },
  ]

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <span className="text-sm text-muted-foreground font-medium flex items-center gap-2">
        
        Follow me:
      </span>
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
          aria-label={link.name}
        >
          {link.icon}
        </Link>
      ))}
    </div>
  )
}

export default SocialLinks
