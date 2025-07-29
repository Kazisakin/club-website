import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'UNB BSS',
  description: '_',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-300 min-h-screen">
        <Navbar />
        <main className="pt-18 pb-8"> {/* Increased padding-top to 16 (64px) to match navbar height */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}