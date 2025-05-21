
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/components/product-form";
import { ProductFormValues } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const NewProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('products')
        .insert([{
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category
        }]);
      
      if (error) throw error;
      
      toast({
        title: "Product created",
        description: "The product has been successfully created."
      });
      
      navigate("/products");
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast({
        title: "Error creating product",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Product</h1>
        <p className="text-muted-foreground">Add a new product to your inventory</p>
      </div>
      
      <ProductForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default NewProduct;
