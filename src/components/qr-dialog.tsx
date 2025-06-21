"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

export function QrDialog({ orderId, children }: { orderId?: string; children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>{orderId ? `Order: ${orderId}` : "Pickup QR Code"}</DialogTitle>
          <DialogDescription>
            Show this QR code at the counter for pickup.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4">
          <Image
            src="https://placehold.co/256x256.png"
            alt="Dummy QR Code"
            width={256}
            height={256}
            data-ai-hint="qr code"
            className="rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
