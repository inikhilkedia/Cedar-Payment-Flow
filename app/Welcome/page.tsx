"use client";

import { useContext } from "react";
import AppContext from "../AppContext";

/**
 * Welcome component
 *
 * Displays a welcome message and payment summary to the user.
 *
 * @returns {JSX.Element} The welcome component
 */
export default function Welcome() {
  const context = useContext(AppContext!);
  const { amount, setEditing, setStage } = context!;

  /**
   * Handles the continue button click event
   *
   * @param {Object} e - Event object
   * @param {Function} e.preventDefault - Prevents the default action of the event
   * @returns {void}
   */
  const handleContinue = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStage?.("payandreview");
    setEditing(true);
  };

  return (
    <div className="flex h-screen min-h-screen flex-col">
      <main className="flex flex-col items-center justify-center text-center">
        <section className="grow basis-2/5 px-80 py-32 max-[768px]:px-10 max-[768px]:py-10 md:px-32">
          <h1 className="mb-4 font-georgia text-4xl font-bold text-custom-blue max-[768px]:text-xl">
            Hi, Taylor
          </h1>
          <p className="font-400 mb-4 text-center font-arial text-base leading-[24px] tracking-[0.2px] text-custom-dark">
            You have 6 medical bills ready from ABC Health System. You can pay
            your bills here or verify your identity to view full bill details.
          </p>
        </section>
        <section className="relative bottom-0 flex min-h-screen w-full flex-col rounded-t-2xl bg-white shadow-md">
          <div className="absolute inset-x-0 top-24 px-20 max-[768px]:px-0">
            <div className="mb-4 flex justify-around">
              <div className="mr-2 text-2xl font-bold text-custom-gray">
                Total due
              </div>
              <div className="font-georgia text-3xl font-bold text-custom-blue">
                ${amount}
              </div>
            </div>

            <button
              className="w-10/12 rounded-lg bg-blue-600 px-4 py-2 text-white md:w-8/12"
              onClick={handleContinue}
            >
              Pay total
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
