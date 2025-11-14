import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  birthDate: string;
  passwordHash?: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (email: string, phoneNumber: string, password: string, birthDate: string) => Promise<void>;
  login: (emailOrPhone: string, password: string) => Promise<void>;
  verifyTwoFactor: (code: string) => Promise<void>;
  logout: () => void;
  setupTwoFactor: (email: string, phoneNumber: string) => Promise<{ code: string; method: "email" | "phone" }>;
  confirmTwoFactor: (code: string) => Promise<void>;
  pendingUser: { email: string; phoneNumber: string; birthDate: string } | null;
  awaitingTwoFactor: boolean;
  tempUserId: string | null;
  twoFactorMethod: "email" | "phone" | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingUser, setPendingUser] = useState<{ email: string; phoneNumber: string; birthDate: string } | null>(null);
  const [awaitingTwoFactor, setAwaitingTwoFactor] = useState(false);
  const [tempUserId, setTempUserId] = useState<string | null>(null);
  const [twoFactorMethod, setTwoFactorMethod] = useState<"email" | "phone" | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("authUser");
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (
    email: string,
    phoneNumber: string,
    password: string,
    birthDate: string
  ) => {
    // In a real app, this would call a backend API
    // For demo purposes, we'll simulate it with localStorage
    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.find((u: User) => u.email === email)) {
      throw new Error("Email already registered");
    }

    if (users.find((u: User) => u.phoneNumber === phoneNumber)) {
      throw new Error("Phone number already registered");
    }

    // Store pending user
    setPendingUser({ email, phoneNumber, birthDate });
    
    // Setup 2FA and get the method
    const { method } = await setupTwoFactor(email, phoneNumber);
    setTwoFactorMethod(method);
    setAwaitingTwoFactor(true);
    
    // Generate a temp user ID
    const tempId = `temp_${Date.now()}`;
    setTempUserId(tempId);
    
    // Store the temp registration data
    localStorage.setItem(
      `tempUser_${tempId}`,
      JSON.stringify({
        email,
        phoneNumber,
        birthDate,
        password: btoa(password), // Simple encoding, NOT secure for production
      })
    );
  };

  const login = async (emailOrPhone: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    const foundUser = users.find(
      (u: User) =>
        u.email === emailOrPhone ||
        u.phoneNumber === emailOrPhone
    );

    if (!foundUser) {
      throw new Error("User not found");
    }

    // Verify password (in real app, this would be hashed)
    if (foundUser.passwordHash !== btoa(password)) {
      throw new Error("Invalid password");
    }

    if (foundUser.twoFactorEnabled) {
      // Set up for 2FA verification
      setPendingUser({
        email: foundUser.email,
        phoneNumber: foundUser.phoneNumber,
        birthDate: foundUser.birthDate,
      });
      
      // Setup 2FA and get the method
      const { method } = await setupTwoFactor(foundUser.email, foundUser.phoneNumber);
      setTwoFactorMethod(method);
      setAwaitingTwoFactor(true);
      setTempUserId(foundUser.id);
    } else {
      // Direct login
      setUser(foundUser);
      localStorage.setItem("authUser", JSON.stringify(foundUser));
    }
  };

  const setupTwoFactor = async (
    email: string,
    phoneNumber: string
  ): Promise<{ code: string; method: "email" | "phone" }> => {
    // Randomly choose between email and phone for sending the code
    const method = Math.random() > 0.5 ? "email" : "phone";
    
    // Generate a 6-digit code
    const code = Math.random().toString().slice(2, 8).padEnd(6, "0");
    
    // Store the code for verification
    localStorage.setItem(`2fa_${email}`, code);
    
    // Simulate sending via email or SMS
    const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1***$3");
    const maskedPhone = phoneNumber.replace(/(\d{3})[\d-]*(\d{4})/, "$1-***-$2");
    
    if (method === "email") {
      console.log(`📧 2FA Code sent to ${maskedEmail}: ${code}`);
    } else {
      console.log(`📱 2FA Code sent to ${maskedPhone}: ${code}`);
    }
    
    return { code, method };
  };

  const confirmTwoFactor = async (code: string) => {
    if (!tempUserId || !pendingUser) {
      throw new Error("No pending registration");
    }

    const storedCode = localStorage.getItem(`2fa_${pendingUser.email}`);
    
    if (storedCode !== code) {
      throw new Error("Invalid 2FA code");
    }

    // Check if this is a new registration or login
    const tempData = localStorage.getItem(`tempUser_${tempUserId}`);
    
    if (tempData) {
      // New registration
      const { password } = JSON.parse(tempData);
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: pendingUser.email,
        phoneNumber: pendingUser.phoneNumber,
        birthDate: pendingUser.birthDate,
        passwordHash: password,
        twoFactorEnabled: true,
        twoFactorSecret: code,
      };

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem(`tempUser_${tempUserId}`);

      setUser(newUser);
      localStorage.setItem("authUser", JSON.stringify(newUser));
    } else {
      // Existing user login - fetch and set the user
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find(
        (u: User) => u.email === pendingUser.email || u.phoneNumber === pendingUser.phoneNumber
      );
      
      if (existingUser) {
        setUser(existingUser);
        localStorage.setItem("authUser", JSON.stringify(existingUser));
      }
    }

    // Clear pending state
    setPendingUser(null);
    setAwaitingTwoFactor(false);
    setTempUserId(null);
    localStorage.removeItem(`2fa_${pendingUser.email}`);
  };

  const verifyTwoFactor = async (code: string) => {
    await confirmTwoFactor(code);
  };

  const logout = () => {
    setUser(null);
    setPendingUser(null);
    setAwaitingTwoFactor(false);
    setTempUserId(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        register,
        login,
        verifyTwoFactor,
        logout,
        setupTwoFactor,
        confirmTwoFactor,
        pendingUser,
        awaitingTwoFactor,
        tempUserId,
        twoFactorMethod,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
