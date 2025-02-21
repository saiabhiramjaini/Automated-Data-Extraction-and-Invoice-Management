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
import { Customer } from "@/utils/types";
import { LoadingAnimation } from "./animations/LoadingAnimation";
import { ErrorAnimation } from "./animations/ErrorAnimation";
import { UploadAnimation } from "./animations/UploadAnimation";

export const CustomersTab = () => {
  const { isLoading, data, isError } = useSelector((state: any) => state.data);

  if (isError) return <ErrorAnimation />;
  if (isLoading) return <LoadingAnimation />;
  if (!data || !data.customers) return <UploadAnimation />;

  return (
    <Table>
      <TableCaption>A list of customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Total Purchase Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.customers.map((customer: Customer, index: number) => (
          <TableRow key={index}>
            <TableCell
              className={customer.customerName === "NA" ? "text-red-600" : ""}
            >
              {customer.customerName}
            </TableCell>
            <TableCell
              className={customer.phoneNumber === "NA" ? "text-red-600" : ""}
            >
              {customer.phoneNumber}
            </TableCell>
            <TableCell
              className={
                customer.totalPurchaseAmount === "NA" ? "text-red-600" : ""
              }
            >
              {customer.totalPurchaseAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
