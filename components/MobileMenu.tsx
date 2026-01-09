'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, LogOut, History, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface MobileMenuProps {
  userInitial: string;
  signOutTrigger: React.ReactNode; 
}

export function MobileMenu({ userInitial, signOutTrigger }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="md:hidden flex items-center gap-4">
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
        {userInitial}
      </div>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-slate-600">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-75">
          <SheetHeader className="text-left pb-6 border-b">
            <SheetTitle className="text-blue-600 font-black text-xl uppercase">CAREER MAP</SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col gap-2 py-8">
            <Link 
              href="/" 
              className="flex items-center gap-3 text-lg font-semibold text-slate-700 hover:text-blue-600 p-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link 
              href="/history" 
              className="flex items-center gap-3 text-lg font-semibold text-slate-700 hover:text-blue-600 p-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <History className="w-5 h-5" /> History
            </Link>
            
            <hr className="my-4 border-slate-100" />
            <div className="px-1">
              {signOutTrigger}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}