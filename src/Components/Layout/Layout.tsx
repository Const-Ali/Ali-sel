import React from "react";
import Nav_Bar from "../Nav-Bar/Nav_Bar";
import Footer from "../Footer/Footer";
interface ILayout {
  children: React.ReactNode;
}
function Layout({ children }: ILayout) {
  return (
    <>
      <Nav_Bar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
