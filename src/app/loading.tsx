export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <div className="relative">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-white/10 rounded-full animate-ping"></div>
      </div>
      
      <p className="mt-6 text-white/60 text-sm font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
}
