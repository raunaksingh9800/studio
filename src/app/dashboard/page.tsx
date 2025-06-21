import PrintQueue from "@/components/dashboard/print-queue";

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Print Shop Dashboard
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          View and manage incoming print orders.
        </p>
      </div>
      <PrintQueue />
    </div>
  );
}
