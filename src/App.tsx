import Router from "./Router";
import Layout from "./components/layout";
import LogoutCleanup from "./services/login.service";

function App(): JSX.Element {
  return (
    <Layout>
      <Router />
      <LogoutCleanup />
    </Layout>
  );
}

export default App;
