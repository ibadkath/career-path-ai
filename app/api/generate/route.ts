import { google } from '@ai-sdk/google';
import { streamText, Output } from 'ai';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const careerSchema = z.object({
  roadmap: z.array(z.object({
    role: z.string(),
    description: z.string(),
    salaryRange: z.string(),
    steps: z.array(z.string()),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  })),
});

export async function POST(req: Request) {

  const body = await req.json();
  const { education, skills, interests } = body;
  const supabase = await createClient();
  const model = google("gemini-2.5-flash-lite");

  const result = await streamText({
    model: model,
    experimental_output: Output.object({
      schema: careerSchema,
    }),
    prompt: `Analyze a person with Education: ${education}, Skills: ${skills}, and Interests: ${interests}. 
             Provide 3 career roadmaps.`,

    onFinish: async ({ text }) => {
      try {
        const supabase = await createClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("No user found, insert blocked.");
          return;
        }

        const cleanText = text.replace(/```json|```/g, "").trim();
        const parsedData = JSON.parse(cleanText);

        if (parsedData && parsedData.roadmap) {
          console.log(`Saving roadmap for user: ${user.id}`);

          const { error: insertError } = await supabase.from('career_reports').insert({
            education: education,
            skills: Array.isArray(skills) ? skills : [skills],
            interests: Array.isArray(skills) ? skills : [skills],
            recommendations: parsedData.roadmap,
            user_id: user.id,
          });

          if (insertError) {
            console.error("Supabase Insert Error:", insertError.message);
          } else {
            console.log("Successfully saved to database!");
            revalidatePath('/history');
          }
        }
      } catch (err) {
        console.error("Crash in onFinish:", err);
      }
    }
  });
  return result.toTextStreamResponse();
}