import './globals.css';
import '@radix-ui/themes/styles.css';
import './theme-config.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import { Theme } from '@radix-ui/themes';
import AuthProvider from './auth/AuthProvider';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({
  subsets: ['latin'], variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet" radius="small">
              <NavBar />
              <main>
                {children}
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html >
  )
}
