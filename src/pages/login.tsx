import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    console.log("🔐 Starting login process...");
    console.log("Email:", email);

    try {
      // Test Supabase connection first
      console.log("🔍 Testing Supabase connection...");
      const { data: testData, error: testError } = await supabase.auth.getSession();
      
      if (testError) {
        console.error("❌ Supabase connection test failed:", testError);
        throw new Error("فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.");
      }
      
      console.log("✅ Supabase connection successful");

      // Now try to sign in
      console.log("🔐 Attempting to sign in...");
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("❌ Sign in error:", signInError);
        throw signInError;
      }

      console.log("✅ Login successful!", data);
      router.push("/dashboard");

    } catch (err: any) {
      console.error("❌ Login error:", err);
      console.error("Error details:", {
        message: err.message,
        status: err.status,
        code: err.code,
      });
      
      // Better error messages in Arabic
      let errorMessage = "حدث خطأ أثناء تسجيل الدخول";
      
      if (err.message?.includes("Failed to fetch") || err.message?.includes("fetch")) {
        errorMessage = "❌ فشل الاتصال بالخادم. يرجى التحقق من:\n• اتصال الإنترنت\n• إعدادات Supabase\n• جدار الحماية";
      } else if (err.message?.includes("Invalid login credentials")) {
        errorMessage = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
      } else if (err.message?.includes("Email not confirmed")) {
        errorMessage = "يرجى تأكيد بريدك الإلكتروني أولاً";
      } else if (err.message?.includes("User not found")) {
        errorMessage = "لا يوجد حساب بهذا البريد الإلكتروني";
      } else if (err.message) {
        errorMessage = `${err.message}\n\nإذا استمرت المشكلة، تحقق من Console (F12)`;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO title="تسجيل الدخول - داريوم" />
      
      <div className="min-h-screen flex">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Link href="/" className="inline-block mb-8">
              <Image 
                src="/داريوم.png" 
                alt="داريوم" 
                width={160}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <h1 className="text-3xl font-bold mb-2">مرحباً بعودتك</h1>
            <p className="text-muted-foreground mb-6">سجل دخولك لإدارة عقاراتك</p>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 mb-6 text-sm whitespace-pre-line">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-11 text-right"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-right block">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-11 pl-11 text-right"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جارٍ تسجيل الدخول...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    تسجيل الدخول
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-8 text-center text-sm">
              <span className="text-muted-foreground">ليس لديك حساب؟ </span>
              <Link href="/register" className="text-primary font-semibold hover:underline">
                إنشاء حساب جديد
              </Link>
            </div>

            {/* Help Message */}
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm">
              <p className="font-semibold mb-2 text-center text-primary">💡 تلميح</p>
              <p className="text-muted-foreground text-center">
                يجب إنشاء حساب جديد أولاً عبر صفحة التسجيل
              </p>
            </div>

            {/* Debug Info */}
            <div className="mt-6 p-4 bg-muted/50 rounded-xl text-xs space-y-2">
              <p className="font-semibold">🔍 معلومات التشخيص:</p>
              <p className="font-mono text-muted-foreground">
                • افتح Console (اضغط F12)<br/>
                • ابحث عن رسائل "🔐" و "✅" و "❌"<br/>
                • شارك الأخطاء إذا ظهرت
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}