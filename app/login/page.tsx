"use client"
import { signInWithProvider } from './actions'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4 gap-y-10">
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-5xl">
          CAREER MAP
        </h1>
        <p className="text-slate-500 text-lg max-w-sm mx-auto leading-relaxed">
          Your journey to a new career starts here. <br />
          Please sign in to access your dashboard.
        </p>
      </div>

      <Card className="w-full max-w-md shadow-2xl shadow-slate-200 border-none bg-white rounded-2xl">
        <CardContent className="grid gap-5 p-8">

          <form action={() => signInWithProvider('google')}>
            <Button
              variant="outline"
              className="w-full py-7 text-lg font-bold border-slate-200 hover:bg-slate-50 transition-all relative group"
              type="submit"
            >
              <FcGoogle />
              Continue with Google
            </Button>
          </form>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-semibold tracking-widest">
                Secure Access
              </span>
            </div>
          </div>

          <form action={() => signInWithProvider('github')}>
            <Button
              className="w-full py-7 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all relative group"
              type="submit"
            >
              <FaGithub />
              Continue with GitHub
            </Button>
          </form>

        </CardContent>
      </Card>

      <p className="mt-8 text-center text-sm text-slate-400">
        By continuing, you agree to our Terms of Service.
      </p>
    </div>
  )
}