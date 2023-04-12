import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "../components/Navbar";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";

import { configureStore } from "@reduxjs/toolkit";
import reducers from "@/redux/reducers/reducers";
import { Provider } from "react-redux";

const noAuthRequired = ["/", "/login", "/signup"];

const store = configureStore({ reducer: reducers });

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <NavbarComp />
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />

          </ProtectedRoute>
        )}
      </Provider>
    </AuthContextProvider>
  );
}

export default MyApp;
