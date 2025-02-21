import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoicesTab } from "./InvoicesTab";
import { ProductsTab } from "./ProductsTab";
import { CustomersTab } from "./CustomersTab";

export const TabBar = () => {
  return (
    <Tabs defaultValue="invoices" className="flex flex-col justify-center items-center w-full">
      <TabsList className="">
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
      </TabsList>

      <TabsContent value="invoices">
        <InvoicesTab />
      </TabsContent>
      <TabsContent value="products">
        <ProductsTab />
      </TabsContent>
      <TabsContent value="customers">
        <CustomersTab />
      </TabsContent>
    </Tabs>
  );
};