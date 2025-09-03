import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Product {
  _id: string;
  name: string;
  images: string[];
}

interface StockProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  isLoading?: boolean;
}

const StockProductDialog: React.FC<StockProductDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  isLoading = false,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<Product[]>([]);
  const [usingCamera, setUsingCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start webcam when user clicks "Use Webcam"
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setUsingCamera(true);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      alert("Could not access webcam");
    }
  };

  // Take snapshot from video
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) setFile(new File([blob], "photo.jpg", { type: "image/jpeg" }));
      }, "image/jpeg");
    }
  };

  // Stop webcam when dialog closes
  useEffect(() => {
    if (!isOpen && streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setUsingCamera(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/recognize", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setResults(data.matches);
    }
  };

  const selectProduct = (product: Product) => {
    onSave(product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Find Product by Image</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            {/* Hidden file input for upload */}
            <Input
              id="fileInput"
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <Button onClick={() => document.getElementById("fileInput")?.click()}>
              Upload Image
            </Button>

            <Button type="button" onClick={startCamera}>
              {usingCamera ? "Using Camera" : "Use Webcam"}
            </Button>
          </div>

          {usingCamera && (
            <div className="mt-2">
              <video ref={videoRef} autoPlay className="w-full rounded border" />
              <Button type="button" onClick={capturePhoto} className="mt-2">
                Capture Photo
              </Button>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {file && <p className="text-sm mt-1">Selected: {file.name}</p>}

          <Button type="submit" disabled={isLoading || !file}>
            {isLoading ? "Searching..." : "Find Product"}
          </Button>
        </form>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {results.map((product) => (
            <div
              key={product._id}
              onClick={() => selectProduct(product)}
              className="cursor-pointer border rounded-lg p-2 hover:bg-gray-100"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-32 object-cover rounded"
              />
              <p className="text-sm mt-2">{product.name}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockProductDialog;
