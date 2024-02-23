import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: '7 Solutions: Frontend Assignment',
	description: 'Assignee: Waraht Punyarote'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
