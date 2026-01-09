'use server'
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteReport(id: string) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "You must be logged in to delete records." };
    }
    const { error } = await supabase
      .from('career_reports')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error("Supabase deletion error:", error.message);
      return { success: false, error: error.message };
    }
    revalidatePath('/history');
    return { success: true };
  }
  catch (err) {
    console.error("Unexpected deletion error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}