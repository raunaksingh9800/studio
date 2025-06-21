"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PrintOrder } from "@/types";
import { Download, Printer, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { getOrders } from "@/lib/order-store";
import { QrDialog } from "@/components/qr-dialog";


export default function PrintQueue() {
  const [orders, setOrders] = useState<PrintOrder[]>([]);

  useEffect(() => {
    setOrders(getOrders());

    const handleStorageChange = () => {
      setOrders(getOrders());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  const getStatusBadge = (status: PrintOrder['status']) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-400/20 text-yellow-600 border-yellow-400/30';
      case 'Printing': return 'bg-blue-400/20 text-blue-600 border-blue-400/30';
      case 'Completed': return 'bg-green-400/20 text-green-600 border-green-400/30';
      case 'Ready for Pickup': return 'bg-purple-400/20 text-purple-600 border-purple-400/30';
      default: return 'bg-gray-400/20 text-gray-600 border-gray-400/30';
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Incoming Orders</CardTitle>
        <CardDescription>
          This is the queue of all current print jobs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.fileName}</TableCell>
                <TableCell>
                  {order.quantity}x, {order.paperType}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", getStatusBadge(order.status))}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.uploadDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <QrDialog orderId={order.id}>
                      <Button variant="outline" size="sm">
                        <QrCode className="mr-2 h-4 w-4" />
                        QR Code
                      </Button>
                    </QrDialog>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
