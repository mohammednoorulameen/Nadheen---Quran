
function ErrorPage() {
  return (
    <div className="bg-black flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-gray-700 select-none animate-float">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-20 w-20 text-red-500 animate-spin-slow" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M11 17l-5-5m0 0l5-5m-5 5h12" 
              />
            </svg>
          </div>
        </div>
        <p className="mt-4 text-xl text-gray-600">Oops! The page youre looking for does not exist.</p>
        <p className="mt-2 text-gray-500">It might have been moved or deleted.</p>
        <a 
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white border bg-black hover:bg-blue-700 rounded-md shadow-md transition-all duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;
// "use client"

// export default function Error({ error, reset }: { error?: Error; reset: () => void }) {
//   return (
//     <main className="mx-auto max-w-3xl px-6 py-16 text-center">
//       <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
//       <p className="mt-2 text-sm text-foreground/70">{error?.message || "Unexpected error"}</p>
//       <button
//         className="mt-6 inline-block rounded-md border border-border px-4 py-2 hover:bg-muted"
//         onClick={() => reset()}
//       >
//         Try again
//       </button>
//     </main>
//   )
// }
