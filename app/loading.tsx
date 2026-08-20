import { Home } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <div className="relative mb-7">
          <div className="absolute inset-0 scale-150 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative flex size-16 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
            <Home
              className="size-7 animate-pulse text-primary"
              strokeWidth={1.7}
            />
          </div>

          <span className="absolute -right-1 -top-1 size-2.5 animate-ping rounded-full bg-primary" />
          <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-primary" />
        </div>

        <div className="mb-4 text-center">
          <h1 className="text-lg font-semibold tracking-tight">
            Rent<span className="text-primary">Nest</span>
          </h1>

          <p className="mt-1 text-xs text-muted-foreground">
            Finding your peaceful place
          </p>
        </div>

        <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-[loading_1.4s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(250%);
          }
        }
      `}</style>
    </div>
  );
}