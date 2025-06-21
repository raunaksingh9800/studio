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
import { Download, Printer } from "lucide-react";
import { cn } from "@/lib/utils";

const mockQueue: PrintOrder[] = [
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
    id: "ORD-002",
    fileName: "project_report_v2.docx",
    quantity: 1,
    paperType: "A4 Plain",
    status: "Printing",
    uploadDate: "2023-10-27",
    price: 5.75,
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
  {
    id: "ORD-005",
    fileName: "wedding_invites.pdf",
    quantity: 150,
    paperType: "A4 Glossy",
    status: "Pending",
    uploadDate: "2023-10-29",
    price: 120.75,
  },
    {
    id: "ORD-001",
    fileName: "final_presentation.pdf",
    quantity: 2,
    paperType: "A4 Glossy",
    status: "Completed",
    uploadDate: "2023-10-26",
    price: 12.50,
  },
];

export default function PrintQueue() {

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
            {mockQueue.map((order) => (
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
