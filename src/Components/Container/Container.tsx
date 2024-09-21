import React from "react";
interface TContainer {
  children: React.ReactNode;
}
function Container({ children }: TContainer) {
  return <div className="container mx-auto">{children}</div>;
}

export default Container;
