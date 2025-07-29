import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductForm } from "@/components/Products/product-form";
import { Product, ProductFormValues } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          // Convert Supabase data format to match our Product type
          setProduct({
            id: data.id,
            name: data.name,
            description: data.description || "",
            price: parseFloat(data.price),
            stock: data.stock,
            category: data.category,
            createdAt: new Date(data.created_at),
          });
        } else {
          toast({
            title: "Error",
            description: "Product not found",
            variant: "destructive",
          });
          navigate("/products");
        }
      } catch (error: any) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, toast]);

  const onSubmit = async (data: ProductFormValues) => {
    if (!product) return;

    try {
      setIsSubmitting(true);

      const { error } = await supabase
        .from("products")
        .update({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category,
        })
        .eq("id", product.id);

      if (error) throw error;

      toast({
        title: "Product updated",
        description: "The product has been successfully updated.",
      });

      navigate("/products");
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast({
        title: "Error updating product",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">Loading...</div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">Make changes to the product</p>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditProduct;
