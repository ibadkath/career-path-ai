'use client'
import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteReport } from './actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteButtonProps {
  id: string;
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteReport(id);
      if (result && !result.success) {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Deletion failed:", error);
      alert("An unexpected error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all border border-slate-100 shadow-sm group"
        >
          <Trash2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-slate-900">
            Delete this Roadmap?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500 text-base">
            This will permanently remove this career profile from your history.
            You cannot undo this action.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 gap-3">
          <AlertDialogCancel className="rounded-xl font-semibold border-slate-200">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold px-6 min-w-30"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}