import { ReactNode } from "react";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout component
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to be rendered
 *
 * @returns {JSX.Element} The layout component
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <header className="flex min-h-20 items-center bg-white p-4 shadow-md">
        <div className="flex items-center">
          <Image
            src="/ABC-Logo.svg"
            alt="ABC Health System"
            width={100}
            height={100}
            className="h-auto w-auto"
          />
        </div>
      </header>
      <main className="min-h-screen flex-grow text-center">{children}</main>
    </div>
  );
};

export default Layout;
