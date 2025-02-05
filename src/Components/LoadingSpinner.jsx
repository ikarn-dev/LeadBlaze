const LoadingSpinner = () => {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  };
  
  export default LoadingSpinner;