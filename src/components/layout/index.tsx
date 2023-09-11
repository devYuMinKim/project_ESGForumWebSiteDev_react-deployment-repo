import type { IProps } from "../../types/common.interface";
import { BrowserRouter as Router } from "react-router-dom";
import Body from "./body";
import Header from "./header";
import Footer from "./footer/Footer";

const Layout = ({ children }: IProps) => {
  return (
    <Router>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Router>
  );
};

export default Layout;
