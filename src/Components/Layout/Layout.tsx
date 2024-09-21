import React from "react";
import Nav_Bar from "../Nav-Bar/Nav_Bar";
interface ILayout {
  children: React.ReactNode;
}
function Layout({ children }: ILayout) {
  return (
    <>
      <Nav_Bar />
      {children}
    </>
  );
}

export default Layout;
