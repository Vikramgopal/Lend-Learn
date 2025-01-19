import Spinner from "./Spinner";

function SpinnerFullPage() {
  return (
    <div className="bg-violet-400">
      <div className="flex flex-col items-center justify-center w-full h-screen bg-black bg-opacity-50">
        {/* Spinner */}
        <Spinner />

        {/* Loading text with dots */}
        <div className="mt-6 md:mt-8 lg:mt-10 text-lg md:text-xl lg:text-2xl font-bold text-white flex items-center">
          Loading
          <span className="dots"></span>
        </div>
      </div>
    </div>
  );
}

export default SpinnerFullPage;
