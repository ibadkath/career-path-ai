"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { DownloadModal } from "./DownloadModal";

export function RoadmapCard({ path }: any) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card className="flex flex-col h-full shadow-lg border-t-4 border-blue-500">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{path?.role}</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setModalOpen(true)}>
          <Download className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-green-600 font-bold mb-4">{path?.salaryRange}</p>
        <ul className="text-sm space-y-2">
          {path?.steps?.map((step: any, i: number) => (
            <li key={i} className="flex gap-2">
              <span className="text-blue-500 font-bold">•</span> {step}
            </li>
          ))}
        </ul>
      </CardContent>
      <DownloadModal path={path} open={modalOpen} onOpenChange={setModalOpen} />
    </Card>
  );
}