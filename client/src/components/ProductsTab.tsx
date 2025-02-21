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
            <TableCell className={product.name === "NA" ? "text-red-600" : ""}>
              {product.name}
            </TableCell>
            <TableCell
              className={product.quantity === "NA" ? "text-red-600" : ""}
            >
              {product.quantity}
            </TableCell>
            <TableCell
              className={product.unitPrice === "NA" ? "text-red-600" : ""}
            >
              {product.unitPrice}
            </TableCell>
            <TableCell className={product.tax === "NA" ? "text-red-600" : ""}>
              {product.tax}
            </TableCell>
            <TableCell
              className={product.priceWithTax === "NA" ? "text-red-600" : ""}
            >
              {product.priceWithTax}
            </TableCell>
            <TableCell
              className={product.discount === "NA" ? "text-red-600" : ""}
            >
              {product.discount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
