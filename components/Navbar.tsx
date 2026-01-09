import { createClient } from '@/utils/supabase/server';
import { logout } from '@/app/login/actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
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

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="font-black text-2xl tracking-tighter text-blue-600 uppercase">
            CAREER MAP
          </Link>
        </div>
      </nav>
    );
  }

  const userInitial = user.email?.charAt(0).toUpperCase() || 'U';

  const SignOutDialog = () => (
    <AlertDialogContent className="rounded-2xl">
      <AlertDialogHeader>
        <AlertDialogTitle>Ready to leave?</AlertDialogTitle>
        <AlertDialogDescription>
          You will need to sign in again to access your career roadmaps.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
        <form action={logout}>
          <AlertDialogAction type="submit" className="bg-red-600 hover:bg-red-700 w-full rounded-xl font-semibold">
            Sign Out
          </AlertDialogAction>
        </form>
      </AlertDialogFooter>
    </AlertDialogContent>
  );

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-black text-2xl tracking-tighter text-blue-600 uppercase">
          CAREER MAP
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/history" className="text-sm font-bold text-slate-600 hover:text-blue-600">
            History
          </Link>
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="font-semibold text-slate-500 hover:text-red-600">
                  Sign Out
                </Button>
              </AlertDialogTrigger>
              <SignOutDialog />
            </AlertDialog>
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              {userInitial}
            </div>
          </div>
        </div>
        <MobileMenu 
          userInitial={userInitial} 
          signOutTrigger={
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex w-full items-center gap-3 text-lg font-semibold text-red-500 hover:bg-red-50 p-3 rounded-xl transition-colors">
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </AlertDialogTrigger>
              <SignOutDialog />
            </AlertDialog>
          } 
        />
      </div>
    </nav>
  );
}