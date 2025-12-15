import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-white/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">Page Not Found</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-white/60 text-base">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action */}
        <ButtonLink
          href="/"
          variant="cta"
          size="lg"
        >
          Back to Home
        </ButtonLink>
      </div>
    </div>
  );
}
