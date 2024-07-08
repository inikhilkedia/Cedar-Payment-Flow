"use client";

import { useContext } from "react";
import Layout from "./components/Layout";
import AppContext from "./AppContext";
import Welcome from "./Welcome/page";
import PayAndReview from "./PayAndReview/page";

/**
 * Home component
 *
 * Renders different stages of the payment process based on the current stage.
 *
 * @returns {JSX.Element} The home component
 */
export default function Home(): JSX.Element {
  const context = useContext(AppContext);
  const { stage } = context;

  return (
    <Layout>
      {stage === "welcome" && <Welcome />}
      {stage === "payandreview" && <PayAndReview />}
      {stage === "thankyou" && (
        <h1 className="py-32 font-georgia text-4xl font-bold text-custom-blue max-[768px]:px-10 max-[768px]:text-2xl">
          Thank you for your payment!
        </h1>
      )}
    </Layout>
  );
}
