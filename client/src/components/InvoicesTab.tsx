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

  if (isError) return <ErrorAnimation/>
  if (isLoading) return <LoadingAnimation/>
  if (!data || !data.customers) return <UploadAnimation/>

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
            <TableCell>{invoice.serialNumber}</TableCell>
            <TableCell>{invoice.customerName}</TableCell>
            <TableCell>{invoice.productName}</TableCell>
            <TableCell>{invoice.quantity}</TableCell>
            <TableCell>{invoice.totalAmount}</TableCell>
            <TableCell>{invoice.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
