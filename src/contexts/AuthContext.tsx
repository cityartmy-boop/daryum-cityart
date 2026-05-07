import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: "admin" | "manager" | "owner" | "staff";
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  company: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem("daryum_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: "usr_123456",
        name: "أحمد محمد الشمري",
        email: email,
        phone: "+966 50 123 4567",
        company: "مجموعة الشمري العقارية",
        role: "admin",
        createdAt: "2026-01-15T10:00:00Z"
      };
      
      setUser(mockUser);
      localStorage.setItem("daryum_user", JSON.stringify(mockUser));
      router.push("/dashboard");
    } catch (error) {
      throw new Error("فشل تسجيل الدخول. تحقق من البريد الإلكتروني وكلمة المرور.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: "usr_" + Math.random().toString(36).substr(2, 9),
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        role: "manager",
        createdAt: new Date().toISOString()
      };
      
      setUser(newUser);
      localStorage.setItem("daryum_user", JSON.stringify(newUser));
      router.push("/dashboard");
    } catch (error) {
      throw new Error("فشل إنشاء الحساب. حاول مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("daryum_user");
    router.push("/login");
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...data } as User;
      setUser(updatedUser);
      localStorage.setItem("daryum_user", JSON.stringify(updatedUser));
    } catch (error) {
      throw new Error("فشل تحديث الملف الشخصي.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}