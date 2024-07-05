"use client";

import Layout from "./components/Layout";
import { useContext } from "react";
import AppContext from "./AppContext";
import Welcome from "./Welcome/page";
import PayAndReview from "./PayAndReview/page";

export default function Home() {
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
