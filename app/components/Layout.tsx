import { ReactNode, useContext } from "react";
import Image from "next/image";
import AppContext, { AppContextType } from "../AppContext";

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
const Layout = ({ children }: LayoutProps): JSX.Element => {
  const context = useContext(AppContext) as AppContextType;
  const {
    setError,
    setEditing,
    setStage,
    setCardNumber,
    setExpiry,
    setCvv,
    setName,
    setZip,
  } = context || {};

  /**
   * Handles logo click event
   */
  const handleLogoClick = () => {
    setError?.({});
    setEditing?.(false);
    setStage?.("welcome");
    setCardNumber?.("");
    setExpiry?.("");
    setCvv?.("");
    setName?.("");
    setZip?.("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <header className="flex items-center min-h-20 bg-white p-4 shadow-md">
        <div className="flex items-center">
          <Image
            src="/payment-flow/abclogo.svg"
            alt="ABC Health System"
            width={100}
            height={100}
            className="h-auto w-auto cursor-pointer"
            onClick={handleLogoClick}
            priority
          />
        </div>
      </header>
      <main className="flex-grow min-h-screen text-center">{children}</main>
    </div>
  );
};

export default Layout;
