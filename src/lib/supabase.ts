import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
};

export async function submitContactForm(data: ContactFormData) {
  const { error } = await supabase.from("contact_submissions").insert([
    {
      ...data,
      created_at: new Date().toISOString(),
    },
  ]);
  if (error) throw error;
}
