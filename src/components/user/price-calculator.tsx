"use client";

import { useState, useRef, type DragEvent } from "react";
import { UploadCloud, File as FileIcon, Loader2, Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { PaperType } from "@/types";
import { addOrder } from "@/lib/order-store";

const paperTypes: { value: PaperType; label: string }[] = [
  { value: "A4 Plain", label: "A4 Plain (80gsm)" },
  { value: "A4 Glossy", label: "A4 Glossy (120gsm)" },
  { value: "A3 Plain", label: "A3 Plain (100gsm)" },
];

export default function PriceCalculator() {
  const [file, setFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [paperType, setPaperType] = useState<PaperType>("A4 Plain");
  const [price, setPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      setPrice(null);
    }
  };

  const handleDragEvents = (e: DragEvent<HTMLDivElement>, over: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(over);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const calculatePrice = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a file to calculate the price.",
        variant: "destructive",
      });
      return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      const pages = Math.max(1, Math.ceil(file.size / 5000));
      const paperCosts: Record<PaperType, number> = { "A4 Plain": 6.5, "A4 Glossy": 12, "A3 Plain": 15 };
      const baseCostPerPage = 8;
      const calculatedPrice = (pages * (baseCostPerPage + paperCosts[paperType])) * quantity;
      setPrice(calculatedPrice);
      setIsCalculating(false);
    }, 1200);
  };

  const handleSubmit = () => {
    if (!file || price === null) {
      toast({ title: "Error", description: "Please calculate price first.", variant: "destructive" });
      return;
    }
    setIsUploading(true);
    
    setTimeout(() => {
      addOrder({
        fileName: file.name,
        quantity,
        paperType,
        price,
      });

      setIsUploading(false);
      toast({
        title: "Upload Successful!",
        description: `Your order for "${file.name}" has been placed.`,
      });
      setFile(null);
      setPrice(null);
      setQuantity(1);
    }, 2000);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Price Estimator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div
            className={cn(
              "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition-colors",
              isDragOver ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
            )}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => handleDragEvents(e, true)}
            onDragLeave={(e) => handleDragEvents(e, false)}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
            />
            <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="font-semibold text-foreground">
              <span className="text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-muted-foreground">PDF, DOCX, PNG, JPG (max 20MB)</p>
          </div>

          {file && (
            <div className="flex items-center gap-3 rounded-md border bg-muted/50 p-3">
              <FileIcon className="h-6 w-6 shrink-0 text-primary" />
              <div className="flex-grow">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Remove</Button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paper-type">Paper Type</Label>
              <Select value={paperType} onValueChange={(v: PaperType) => setPaperType(v)}>
                <SelectTrigger id="paper-type">
                  <SelectValue placeholder="Select paper type" />
                </SelectTrigger>
                <SelectContent>
                  {paperTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={calculatePrice}
            disabled={isCalculating || !file}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            size="lg"
          >
            {isCalculating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Calculate Price
          </Button>

          {price !== null && (
            <div className="mt-6 rounded-lg bg-primary/10 p-6 text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                Estimated Price
              </p>
              <p className="font-headline text-5xl font-bold text-primary transition-all duration-300">
                ₹{price.toFixed(2)}
              </p>
            </div>
          )}

          {price !== null && (
            <Button
              onClick={handleSubmit}
              disabled={isUploading}
              className="w-full"
              size="lg"
            >
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload & Submit Order
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
