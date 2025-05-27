import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Product } from "@/types/stocks";
import { generateMockProducts } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Trash2, QrCode } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const mockProducts = generateMockProducts();
    const foundProduct = mockProducts.find((p) => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      });
      navigate("/products");
    }

    setLoading(false);
  }, [id, navigate, toast]);

  const handleDelete = () => {
    // In a real app, this would be an API call
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    });
    navigate("/products");
  };

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const formattedDate = new Date(product.createdAt).toLocaleDateString();
  const qrValue = `product:${product.id}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/products"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            ← Back to products
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mt-2">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{product.category}</Badge>
            <p className="text-sm text-muted-foreground">
              Added on {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={toggleQRCode}>
            <QrCode className="mr-2 h-4 w-4" />
            {showQRCode ? "Hide QR" : "Show QR"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/products/${product.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  product from your inventory.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {showQRCode && (
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4">Product QR Code</h2>
            <div className="p-4 bg-white rounded-lg">
              <svg
                width="128"
                height="128"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="border border-gray-200"
              >
                <rect width="29" height="29" fill="white" />
                <path
                  d="M0 0h7v7h-7zM11 0h1v1h-1zM13 0h1v1h-1zM16 0h1v1h-1zM19 0h1v1h-1zM22 0h7v7h-7zM1 1h5v5h-5zM23 1h5v5h-5zM2 2h3v3h-3zM11 2h1v1h-1zM13 2h1v2h-1zM15 2h1v1h-1zM24 2h3v3h-3zM1 8h1v1h-1zM3 8h3v1h-3zM8 8h1v1h-1zM10 8h1v2h-1zM12 8h1v2h-1zM18 8h1v1h-1zM20 8h2v1h-2zM24 8h1v1h-1zM27 8h2v1h-2zM2 9h1v1h-1zM4 9h1v1h-1zM6 9h1v1h-1zM14 9h1v2h-1zM17 9h1v1h-1zM19 9h1v2h-1zM22 9h1v1h-1zM25 9h1v1h-1zM0 10h2v1h-2zM3 10h1v2h-1zM5 10h2v1h-2zM8 10h1v2h-1zM16 10h1v1h-1zM21 10h1v1h-1zM24 10h1v1h-1zM26 10h1v1h-1zM1 11h2v1h-2zM5 11h2v1h-2zM13 11h1v1h-1zM15 11h2v1h-2zM18 11h1v1h-1zM23 11h1v2h-1zM25 11h1v1h-1zM27 11h1v1h-1zM0 12h1v1h-1zM4 12h1v1h-1zM7 12h1v1h-1zM9 12h1v1h-1zM11 12h2v1h-2zM17 12h2v1h-2zM20 12h1v1h-1zM27 12h2v1h-2zM1 13h1v2h-1zM4 13h1v1h-1zM6 13h2v1h-2zM12 13h1v1h-1zM14 13h1v2h-1zM16 13h1v1h-1zM18 13h1v3h-1zM20 13h1v2h-1zM22 13h1v1h-1zM26 13h1v1h-1zM0 14h1v1h-1zM3 14h1v1h-1zM5 14h1v2h-1zM8 14h1v1h-1zM10 14h2v1h-2zM15 14h1v2h-1zM22 14h1v1h-1zM24 14h2v2h-2zM27 14h2v2h-2zM2 15h1v3h-1zM4 15h1v1h-1zM7 15h1v1h-1zM9 15h1v1h-1zM11 15h1v2h-1zM13 15h1v1h-1zM17 15h1v1h-1zM19 15h1v1h-1zM22 15h1v1h-1zM26 15h1v1h-1zM0 16h2v1h-2zM3 16h1v1h-1zM6 16h1v1h-1zM8 16h1v1h-1zM10 16h1v1h-1zM13 16h1v1h-1zM16 16h1v1h-1zM20 16h2v1h-2zM7 17h1v1h-1zM12 17h1v1h-1zM14 17h1v1h-1zM17 17h1v1h-1zM19 17h1v1h-1zM22 17h1v2h-1zM24 17h1v1h-1zM26 17h1v1h-1zM1 18h1v1h-1zM3 18h1v1h-1zM5 18h1v1h-1zM10 18h1v1h-1zM13 18h1v1h-1zM15 18h1v2h-1zM18 18h1v1h-1zM20 18h1v1h-1zM23 18h1v1h-1zM25 18h1v1h-1zM27 18h2v1h-2zM0 19h1v1h-1zM2 19h1v1h-1zM4 19h1v1h-1zM6 19h1v1h-1zM9 19h1v1h-1zM11 19h1v1h-1zM14 19h1v1h-1zM16 19h1v1h-1zM19 19h3v1h-3zM24 19h1v1h-1zM26 19h1v2h-1zM0 20h1v2h-1zM5 20h1v1h-1zM8 20h1v1h-1zM10 20h1v1h-1zM12 20h1v1h-1zM17 20h1v1h-1zM22 20h2v1h-2zM25 20h1v1h-1zM6 21h1v1h-1zM9 21h1v1h-1zM11 21h1v1h-1zM14 21h2v1h-2zM17 21h1v2h-1zM19 21h1v1h-1zM22 21h1v1h-1zM0 22h7v7h-7zM8 22h1v1h-1zM10 22h1v1h-1zM12 22h1v1h-1zM15 22h1v1h-1zM20 22h1v2h-1zM23 22h1v1h-1zM25 22h1v1h-1zM27 22h2v1h-2zM1 23h5v5h-5zM8 23h1v1h-1zM13 23h1v1h-1zM16 23h1v1h-1zM18 23h2v1h-2zM22 23h1v1h-1zM24 23h1v1h-1zM26 23h1v1h-1zM8 24h1v3h-1zM10 24h1v1h-1zM13 24h1v1h-1zM15 24h1v1h-1zM17 24h1v1h-1zM19 24h1v1h-1zM21 24h1v1h-1zM25 24h1v1h-1zM27 24h1v1h-1zM2 25h3v3h-3zM9 25h1v1h-1zM11 25h1v1h-1zM14 25h1v1h-1zM16 25h1v2h-1zM18 25h1v1h-1zM20 25h1v1h-1zM22 25h1v1h-1zM24 25h1v1h-1zM26 25h1v1h-1zM10 26h1v1h-1zM12 26h2v1h-2zM15 26h1v1h-1zM17 26h1v1h-1zM19 26h3v1h-3zM23 26h2v1h-2zM26 26h1v1h-1zM9 27h1v1h-1zM15 27h1v1h-1zM17 27h1v1h-1zM24 27h1v1h-1zM27 27h1v1h-1zM13 28h1v1h-1zM16 28h1v1h-1zM20 28h1v1h-1zM22 28h1v1h-1zM26 28h1v1h-1z"
                  fill="#000000"
                />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Scan this code to quickly access product details
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button variant="outline" onClick={toggleQRCode}>
              Close
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Stock:</span>
                <span
                  className={`font-medium ${
                    product.stock < 10 ? "text-red-500" : ""
                  }`}
                >
                  {product.stock} {product.stock < 10 ? "(Low stock)" : ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Product ID:</span>
                <span className="font-medium text-xs text-muted-foreground">
                  {product.id}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
