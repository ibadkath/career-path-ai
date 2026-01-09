import { createClient } from '@/utils/supabase/server';
import { RoadmapCard } from '@/components/RoadmapCard';
import { DeleteButton } from './DeleteButton'; // Import the client component
import { Briefcase, Calendar } from 'lucide-react';

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const supabase = await createClient();

  const { data: reports, error } = await supabase
    .from('career_reports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block border border-red-200">
          Failed to load history. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Career Journey History
          </h1>
          <p className="text-slate-500 mt-2">
            View and manage your previously generated AI career roadmaps.
          </p>
        </header>

        {reports.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No roadmaps found</h3>
            <p className="text-slate-500">Your generated career paths will appear here.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {reports.map((report) => (
              <section key={report.id} className="group relative">
                {/* Header for each history item */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 px-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white border px-3 py-1.5 rounded-full shadow-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(report.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {report.education} Roadmap
                    </h2>
                  </div>
                  <DeleteButton id={report.id} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Array.isArray(report.recommendations) ? (
                    report.recommendations.map((path: any, idx: number) => (
                      <RoadmapCard key={`${report.id}-${idx}`} path={path} />
                    ))
                  ) : (
                    <div className="col-span-3 p-8 bg-amber-50 rounded-xl border border-amber-200 text-amber-700 text-sm">
                      We encountered an issue displaying this specific roadmap's data.
                    </div>
                  )}
                </div>
                <div className="mt-12 h-px bg-slate-200 w-full" />
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}