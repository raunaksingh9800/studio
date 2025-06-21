'use client';

import type { PrintOrder, PaperType } from "@/types";

const INITIAL_ORDERS: PrintOrder[] = [
  {
    id: "ORD-005",
    fileName: "wedding_invites.pdf",
    quantity: 150,
    paperType: "A4 Glossy",
    status: "Pending",
    uploadDate: "2023-10-29",
    price: 9660.00,
  },
  {
    id: "ORD-004",
    fileName: "quarterly_review.pdf",
    quantity: 5,
    paperType: "A3 Plain",
    status: "Pending",
    uploadDate: "2023-10-29",
    price: 1456.00,
  },
  {
    id: "ORD-003",
    fileName: "event_flyer.png",
    quantity: 50,
    paperType: "A4 Plain",
    status: "Ready for Pickup",
    uploadDate: "2023-10-28",
    price: 2000.00,
  },
  {
    id: "ORD-002",
    fileName: "project_report_v2.docx",
    quantity: 1,
    paperType: "A4 Plain",
    status: "Printing",
    uploadDate: "2023-10-27",
    price: 460.00,
  },
    {
    id: "ORD-001",
    fileName: "final_presentation.pdf",
    quantity: 2,
    paperType: "A4 Glossy",
    status: "Completed",
    uploadDate: "2023-10-26",
    price: 1000.00,
  },
];


const LOCAL_STORAGE_KEY = 'print-orders';

export function getOrders(): PrintOrder[] {
  if (typeof window === 'undefined') {
    return INITIAL_ORDERS;
  }
  try {
    const items = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (items) {
      return JSON.parse(items);
    } else {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return INITIAL_ORDERS;
  }
}

export function addOrder(order: {
  fileName: string;
  quantity: number;
  paperType: PaperType;
  price: number;
}) {
  if (typeof window === 'undefined') {
    return;
  }
  const orders = getOrders();
  const newOrder: PrintOrder = {
    ...order,
    id: `ORD-${String(orders.length + 10).padStart(3, '0')}`,
    uploadDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
  };
  const updatedOrders = [newOrder, ...orders];
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedOrders));
  window.dispatchEvent(new Event('storage'));
}
