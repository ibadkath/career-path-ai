import { z } from 'zod';

export const careerSchema = z.object({
  roadmap: z.array(z.object({
    role: z.string().describe("The specific job title suggested"),
    description: z.string().describe("Short explanation of why this fits the user"),
    salaryRange: z.string().describe("Estimated market salary"),
    steps: z.array(z.string()).describe("4 actionable steps to get this job"),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe("Learning curve level"),
  })),
});

export type CareerRoadmap = z.infer<typeof careerSchema>;