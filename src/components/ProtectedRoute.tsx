import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔐 ProtectedRoute: Checking authentication...");
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log("Session:", session);
        console.log("Error:", error);

        if (error) {
          console.error("❌ Session error:", error);
          router.push("/login");
          return;
        }

        if (!session) {
          console.log("❌ No session found - redirecting to login");
          router.push("/login");
          return;
        }

        console.log("✅ Session found! User authenticated:", session.user.email);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("❌ Auth check error:", err);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("🔄 Auth state changed:", _event);
      
      if (!session) {
        console.log("❌ Session lost - redirecting to login");
        router.push("/login");
      } else {
        console.log("✅ Session active:", session.user.email);
        setIsAuthenticated(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">جارٍ التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">جارٍ التحويل لتسجيل الدخول...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}