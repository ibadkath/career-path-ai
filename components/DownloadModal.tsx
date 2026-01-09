"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FileText, FileJson } from "lucide-react";

export function DownloadModal({ path, open, onOpenChange }: any) {
  const downloadTXT = () => {
    const text = `Role: ${path.role}\nSalary: ${path.salaryRange}\n\nSteps:\n${path.steps?.join("\n")}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${path.role}.txt`;
    a.click();
    onOpenChange(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(path.role, 10, 20);
    doc.setFontSize(12);
    doc.text(`Salary: ${path.salaryRange}`, 10, 30);
    doc.text("Steps to success:", 10, 50);
    path.steps.forEach((step: string, i: number) => {
      doc.text(`${i + 1}. ${step}`, 10, 60 + i * 10);
    });
    doc.save(`${path.role}.pdf`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Roadmap</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <Button variant="outline" onClick={downloadTXT} className="justify-start gap-2">
            <FileText className="w-4 h-4" /> Download as Text (.txt)
          </Button>
          <Button onClick={downloadPDF} className="justify-start gap-2 bg-blue-600">
            <FileJson className="w-4 h-4" /> Download as PDF (.pdf)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}