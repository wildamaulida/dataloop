import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to DataLoop</h1>
        <p className="text-gray-600 mb-8">
          The ultimate platform for handling your research data.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="rounded-md border border-transparent bg-blue-600 py-2.5 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200"
          >
            Register Now
          </Link>
        </div>
      </div>
    </main>
  );
}
