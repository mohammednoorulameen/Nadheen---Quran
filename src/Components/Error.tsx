function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center transition-colors duration-300">
      {/* <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black transition-colors duration-300"> */}
      <div className="text-center">
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-gray-800 dark:text-gray-700 select-none animate-float">
            404
          </h1>

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

        <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
          Oops! The page you're looking for does not exist.
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          It might have been moved or deleted.
        </p>

        <a
          href="/"
          className="
    mt-6 inline-block rounded-md px-6 py-3 text-sm font-medium
    border border-gray-300 hover:bg-gray-100
    dark:border-gray-600 d dark:hover:bg-gray-800
    transition-all duration-300
  "
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;
