import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Invoice } from "@/utils/types";
import { LoadingAnimation } from "./animations/LoadingAnimation";
import { ErrorAnimation } from "./animations/ErrorAnimation";
import { UploadAnimation } from "./animations/UploadAnimation";

export const InvoicesTab = () => {
  const { isLoading, data, isError } = useSelector((state: any) => state.data);

  if (isError) return <ErrorAnimation />;
  if (isLoading) return <LoadingAnimation />;
  if (!data || !data.customers) return <UploadAnimation />;

  return (
    <Table>
      <TableCaption>A list of invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Serial Number</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.invoices.map((invoice: Invoice, index: number) => (
          <TableRow key={index}>
            <TableCell
              className={invoice.serialNumber === "NA" ? "text-red-600" : ""}
            >
              {invoice.serialNumber}
            </TableCell>
            <TableCell
              className={invoice.customerName === "NA" ? "text-red-600" : ""}
            >
              {invoice.customerName}
            </TableCell>
            <TableCell
              className={invoice.productName === "NA" ? "text-red-600" : ""}
            >
              {invoice.productName}
            </TableCell>
            <TableCell
              className={invoice.quantity === "NA" ? "text-red-600" : ""}
            >
              {invoice.quantity}
            </TableCell>
            <TableCell
              className={invoice.totalAmount === "NA" ? "text-red-600" : ""}
            >
              {invoice.totalAmount}
            </TableCell>
            <TableCell className={invoice.date === "NA" ? "text-red-600" : ""}>
              {invoice.date}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
