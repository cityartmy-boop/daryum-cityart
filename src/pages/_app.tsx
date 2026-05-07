import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleProvider } from "@/contexts/RoleContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RoleProvider>
        <Component {...pageProps} />
      </RoleProvider>
    </AuthProvider>
  );
}
