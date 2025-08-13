import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'UNB Bangladeshi Student Society',
  description:
    'Official website of the UNB Bangladeshi Student Society, fostering community, culture, and academic support for Bangladeshi students at the University of New Brunswick.',
  keywords:
    'UNB BSS, Bangladeshi Student Society, University of New Brunswick, cultural events, student community',
  openGraph: {
    title: 'UNB Bangladeshi Student Society',
    description:
      'Join the UNB BSS for cultural events, mentorship, and a vibrant student community at the University of New Brunswick.',
    url: 'https://unbbss.com', // Replace with your actual domain
    siteName: 'UNB BSS',
    locale: 'en_CA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen"> {/* Make sure there is no background here */}
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
