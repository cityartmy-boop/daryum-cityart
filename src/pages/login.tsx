import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
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
            <p className="text-muted-foreground">سجل دخولك لإدارة عقاراتك</p>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 mb-6 text-sm text-center">
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

              <div className="flex items-center justify-between text-sm">
                <Link href="/forgot-password" className="text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full gradient-primary text-white text-lg h-12 glow-hover"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جارٍ تسجيل الدخول...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
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

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/30 rounded-xl text-sm">
              <p className="font-semibold mb-2 text-center">للتجربة السريعة:</p>
              <p className="text-muted-foreground text-center">أي بريد إلكتروني + أي كلمة مرور</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}