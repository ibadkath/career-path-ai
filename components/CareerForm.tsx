"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { careerSchema } from "@/lib/schema";
import { useCareerStore } from "@/lib/store";
import { RoadmapCard } from "./RoadmapCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function CareerForm() {
  const { savedRoadmap, setSavedRoadmap, clearRoadmap } = useCareerStore();

  const { submit, isLoading, object } = useObject({
    api: "/api/generate",
    schema: careerSchema,
    onFinish: ({ object }) => {
      if (object?.roadmap) setSavedRoadmap(object.roadmap);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submit({
      education: formData.get("education"),
      skills: formData.get("skills"),
      interests: formData.get("interests"),
    });
  };

  const displayRoadmap = isLoading ? object?.roadmap : savedRoadmap

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-xl border shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="education" className="font-bold">Education</Label>
          <Input id="education" name="education" placeholder="e.g. Bachelor in IT" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skills" className="font-bold">Skills</Label>
          <Input id="skills" name="skills" placeholder="e.g. React, Python" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interests" className="font-bold">Interests</Label>
          <Input id="interests" name="interests" placeholder="e.g. AI, Design" required />
        </div>

        <div className="md:col-span-3 flex gap-2">
          <Button type="submit" className="flex-1 bg-blue-600" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Roadmaps"}
          </Button>
          {savedRoadmap && (
            <Button type="button" variant="outline" onClick={clearRoadmap}>Clear</Button>
          )}
        </div>
      </form>

      {displayRoadmap && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayRoadmap.map((path: any, index: number) => (
            <RoadmapCard key={index} path={path} />
          ))}
        </div>
      )}
    </div>
  );
}