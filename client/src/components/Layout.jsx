import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }) {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-[100]">
        <Nav />
      </div>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
