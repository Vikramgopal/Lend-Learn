export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md w-full text-center">
        <img
          src="https://assets.codepen.io/6093409/gear.svg.png"
          alt="404"
          className="mx-auto mb-4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
        />
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found{" "}
        </h1>
        <p className="text-sm text-gray-500">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
      </div>
    </div>
  );
}
