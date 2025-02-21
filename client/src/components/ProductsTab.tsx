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
import { Product } from "@/utils/types";
import { LoadingAnimation } from "./animations/LoadingAnimation";
import { ErrorAnimation } from "./animations/ErrorAnimation";
import { UploadAnimation } from "./animations/UploadAnimation";

export const ProductsTab = () => {
  const { isLoading, data, isError } = useSelector((state: any) => state.data);

  if (isError && !isLoading) return <ErrorAnimation />;
  if (isLoading && !isError) return <LoadingAnimation />;
  if (!data || !data.customers) return <UploadAnimation />;

  return (
    <Table>
      <TableCaption>A list of products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead>Tax</TableHead>
          <TableHead>Price with Tax</TableHead>
          <TableHead>Discount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.products.map((product: Product, index: number) => (
          <TableRow key={index}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.unitPrice}</TableCell>
            <TableCell>{product.tax}</TableCell>
            <TableCell>{product.priceWithTax}</TableCell>
            <TableCell className={product.discount === "NA" ? "text-red-600" : ""}>{product.discount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
