// In this root layout under this root folder, we want to have our components/layouts
// that would be common in across the different pages like Home, etc. Apart from the auth page

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

// And the two components that would be common are the header and the footer.

// Lets create the Header & Footer components

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex h-screen flex-col">
        <Header/>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    );
  }