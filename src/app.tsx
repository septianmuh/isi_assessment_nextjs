'use client';
import React from 'react';
import { SessionProvider } from "next-auth/react";

export default function App(props: React.PropsWithChildren): React.ReactElement {
	return (
		<SessionProvider>
            {props.children}
		</SessionProvider>
	);
}