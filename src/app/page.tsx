import PriceCalculator from "@/components/user/price-calculator";
import OrderStatus from "@/components/user/order-status";

export default function UserPage() {
  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h1 className="mb-6 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Upload Your File
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Get an instant price quote for your print job. Just upload your file, select your options, and see the magic happen.
          </p>
          <PriceCalculator />
        </div>
        <div className="lg:col-span-2">
          <OrderStatus />
        </div>
      </div>
    </div>
  );
}
