"use client";

import Layout from "../components/Layout";

export default function ThankYou(): JSX.Element {
	return (
		<Layout>
			<h1 className="py-32 font-georgia text-4xl font-bold text-custom-blue max-[768px]:px-10 max-[768px]:text-2xl">
				Thank you for your payment!
			</h1>
		</Layout>
	);
}
