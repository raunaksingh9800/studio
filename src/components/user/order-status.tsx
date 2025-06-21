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
import type { PrintOrder } from "@/types";
import { cn } from "@/lib/utils";
import { PackageCheck, PackageSearch, Truck } from "lucide-react";

const mockOrders: PrintOrder[] = [
  {
    id: "ORD-001",
    fileName: "final_presentation.pdf",
    quantity: 2,
    paperType: "A4 Glossy",
    status: "Completed",
    uploadDate: "2023-10-26",
    price: 12.50,
  },
  {
    id: "ORD-002",
    fileName: "project_report_v2.docx",
    quantity: 1,
    paperType: "A4 Plain",
    status: "Printing",
    uploadDate: "2023-10-27",
    price: 5.75,
  },
  {
    id: "ORD-003",
    fileName: "event_flyer.png",
    quantity: 50,
    paperType: "A4 Plain",
    status: "Ready for Pickup",
    uploadDate: "2023-10-28",
    price: 25.00,
  },
  {
    id: "ORD-004",
    fileName: "quarterly_review.pdf",
    quantity: 5,
    paperType: "A3 Plain",
    status: "Pending",
    uploadDate: "2023-10-29",
    price: 18.20,
  },
];

export default function OrderStatus() {
  const getStatusBadge = (status: PrintOrder['status']) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-400/20 text-yellow-600 border-yellow-400/30';
      case 'Printing': return 'bg-blue-400/20 text-blue-600 border-blue-400/30';
      case 'Completed': return 'bg-green-400/20 text-green-600 border-green-400/30';
      case 'Ready for Pickup': return 'bg-purple-400/20 text-purple-600 border-purple-400/30';
      default: return 'bg-gray-400/20 text-gray-600 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: PrintOrder['status']) => {
    switch (status) {
      case 'Printing': return <Truck className="h-4 w-4" />;
      case 'Completed': return <PackageCheck className="h-4 w-4" />;
      case 'Ready for Pickup': return <PackageCheck className="h-4 w-4 text-primary" />;
      default: return <PackageSearch className="h-4 w-4" />;
    }
  }


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Orders</CardTitle>
        <CardDescription>Check the status of your recent print jobs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.fileName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", getStatusBadge(order.status))}>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${order.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
