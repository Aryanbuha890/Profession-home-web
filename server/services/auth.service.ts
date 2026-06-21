import { createClient } from "@/lib/supabase/server";
import { TEST_CREDENTIALS, type AppRole, type AuthUser } from "@/lib/auth/test-credentials";

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function mapTestUser(email: string, password: string): AuthUser | null {
  const match = TEST_CREDENTIALS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!match) return null;
  return {
    id: `test-${match.role}`,
    email: match.email,
    name: match.name,
    role: match.role,
  };
}

export const authService = {
  async login(email: string, password: string) {
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      if (!supabase) throw new Error("Supabase client unavailable");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, email, full_name, role")
        .eq("id", data.user.id)
        .single();

      const user: AuthUser = {
        id: data.user.id,
        email: data.user.email ?? email,
        name: profile?.full_name ?? data.user.user_metadata?.full_name ?? email.split("@")[0],
        role: (profile?.role as AppRole) ?? (data.user.user_metadata?.role as AppRole) ?? "student",
      };

      return { session: data.session, user };
    }

    const user = mapTestUser(email, password);
    if (!user) throw new Error("Invalid email or password. Use test accounts from seed-test-users.md");
    return { token: "mock-jwt-token", user };
  },

  async signup(name: string, email: string, password: string, role: AppRole) {
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      if (!supabase) throw new Error("Supabase client unavailable");

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, role },
        },
      });
      if (error) throw new Error(error.message);
      if (!data.user) throw new Error("Signup failed");

      const user: AuthUser = {
        id: data.user.id,
        email: data.user.email ?? email,
        name,
        role,
      };

      return { session: data.session, user };
    }

    const existing = TEST_CREDENTIALS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) throw new Error("User already exists");

    const user: AuthUser = {
      id: `mock-${Date.now()}`,
      email,
      name,
      role,
    };

    return { token: "mock-jwt-token", user };
  },
};
