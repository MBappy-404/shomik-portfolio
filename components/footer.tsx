import Link from "next/link";
import SocialLinks from "./social-links";
 

const  Footer =() =>{
  return (
    <footer className="border-t dark:border-gray-700 bg-muted dark:bg-muted/40 flex justify-center w-full">
      <div className="container px-4 pt-12 pb-5 md:px-6 flex flex-col items-center w-full">
        <div className="grid gap-4 md:grid-cols-4 w-full justify-items-center">
          <div className="space-y-4 text-center md:text-left w-full md:w-auto">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Shomik Ujzaman
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creative Content Creator, SEO Specialist, and Visual Storyteller
              helping brands grow through strategic content.
            </p>
            <div className="flex justify-center md:justify-start">
              <SocialLinks />
            </div>
          </div>
          <div className="space-y-3 text-center md:text-left w-full md:w-auto">
            <h4 className="text-sm font-semibold text-muted-foreground">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground/80">
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                >
                  SEO Blog Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                >
                  Content Creation
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                >
                  Video Editing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                >
                  Visual Design
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3 text-center md:text-left w-full md:w-auto">
            <h4 className="text-sm font-semibold text-muted-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground/80">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-primary transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="hover:text-primary transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3 text-center md:text-left w-full md:w-auto">
            <h4 className="text-sm font-semibold text-muted-foreground">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground/80">
              <li>Available for freelance projects</li>
              <li>Remote collaboration worldwide</li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Get in touch →
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors"
                >
                 Admin Area  →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t dark:border-gray-700  pt-8 text-center text-sm text-muted-foreground/70 w-full">
          <p>
            &copy; {new Date().getFullYear()} Shomik Ujzaman. All rights
            reserved.
          </p>
          <p>
            Developed By{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-semibold underline"
              href="https://dev-bappy.vercel.app/"
            >
              Bappy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;