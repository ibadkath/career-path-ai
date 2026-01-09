import CareerForm from "@/components/CareerForm";

export default async function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Career Roadmap Generator
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Personalized AI paths based on your unique profile.
          </p>
        </div>
        <CareerForm />
      </div>
    </main>
  );
}