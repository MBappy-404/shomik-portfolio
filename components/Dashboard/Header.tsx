
"use client";
import Link from "next/link";
 
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeSwitch from "../theme-switch";
type UserProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};
const Header = ({ session }: { session: UserProps | null }) => {
  const pathname = usePathname();

  return (
    <header className="z-50  border-b border-gray-200 dark:border-gray-700   bg-white dark:bg-gray-900 sticky top-0 pt-2">
      <div className="flex flex-wrap items-center w-full relative tracking-wide">
        <div className="flex items-center gap-y-6  z-50 w-full pb-2">
          <div className="flex items-center gap-4 w-full px-6 bg-white dark:bg-gray-900  min-h-[48px] sm:mr-20 rounded-md outline-none border-none">
            <h2 className=" hidden md:block text-sm md:text-base uppercase">
              {pathname.split("/")[2]}
            </h2>
          </div>

          <div className="flex items-center justify-end gap-6 ml-auto">
            <div className="flex items-center space-x-6">
              <Link
                href="https://shomikujzaman.vercel.app"
                target="_blank"
                className=" w-20 px-2 h-[38px] flex items-center justify-center rounded-lg relative dark:bg-blue-950 bg-blue-200 cursor-pointer"
              >
                Lets Go
              </Link>

              <div className="w-9 h-[38px] flex items-center justify-center rounded-xl relative  bg-gray-100 dark:bg-gray-800   cursor-pointer">
                <ThemeSwitch />
              </div>
            </div>

            <div className="w-1 h-10 border-l border-gray-200 dark:border-gray-600 "></div>
            <div className="dropdown-menu relative flex shrink-0 group">
              <div className="flex items-center gap-4">
                <p className="dark:text-gray-200 text-gray-800  text-sm hidden md:block">
                  {session?.user?.name}
                </p>
                {session?.user?.image && (
                  <Image
                    src={session?.user?.image}
                    width={100}
                    height={100}
                    alt="profile-pic"
                    className="w-[38px] h-[38px] rounded-full border-2 border-gray-300 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
