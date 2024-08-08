import React from 'react';
import { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Web site created with Next.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {' '}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
