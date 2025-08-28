"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Wrapper(props: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex justify-center">
			
			<div className="mt-20 lg:w-7/12 w-full">{props.children}</div>
		</div>
	);
}

const queryClient = new QueryClient();

export function WrapperWithQuery(props: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	);
}