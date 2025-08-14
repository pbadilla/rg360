import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Search,
  Plus,
  Edit,
  Star,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import InsideLayout from "@/components/layout/InsideLayout";

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  sales: number;
  orders: number;
  rating: number;
  status: "active" | "inactive";
  joinDate: string;
}

const mockSellers: Seller[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    sales: 15200,
    orders: 89,
    rating: 4.8,
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    phone: "+1 (555) 234-5678",
    sales: 18500,
    orders: 102,
    rating: 4.9,
    status: "active",
    joinDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    phone: "+1 (555) 345-6789",
    sales: 12800,
    orders: 76,
    rating: 4.6,
    status: "active",
    joinDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 456-7890",
    sales: 16900,
    orders: 94,
    rating: 4.7,
    status: "inactive",
    joinDate: "2023-01-05",
  },
];

const Sellers = () => {
  const [sellers] = useState<Seller[]>(mockSellers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeSellers = sellers.filter((s) => s.status === "active");
  const totalSales = sellers.reduce((sum, s) => sum + s.sales, 0);
  const totalOrders = sellers.reduce((sum, s) => sum + s.orders, 0);
  const averageRating =
    sellers.reduce((sum, s) => sum + s.rating, 0) / sellers.length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 hover:bg-green-200"
      : "bg-red-100 text-red-800 hover:bg-red-200";
  };

  return (
    <InsideLayout title="POS Product Management" subTitle="Seller Management.">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="default">
            <Plus className="h-4 w-4" />
            Add Seller
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-primary text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Sellers</p>
                <p className="text-2xl font-bold">{sellers.length}</p>
              </div>
              <Users className="h-8 w-8 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-success text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Sellers</p>
                <p className="text-2xl font-bold">{activeSellers.length}</p>
              </div>
              <Users className="h-8 w-8 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-blue-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Sales</p>
                <p className="text-2xl font-bold">
                  ${totalSales.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-purple-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Avg Rating</p>
                <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 opacity-80" />
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-6 bg-gradient-card border-0 shadow-md">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sellers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSellers.map((seller) => (
              <Card
                key={seller.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(seller.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{seller.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {seller.email}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(seller.status)}>
                    {seller.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Phone:
                    </span>
                    <span className="text-sm">{seller.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Sales:
                    </span>
                    <span className="text-sm font-medium">
                      ${seller.sales.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Orders:
                    </span>
                    <span className="text-sm font-medium">{seller.orders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Rating:
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {seller.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Joined:
                    </span>
                    <span className="text-sm">
                      {new Date(seller.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </InsideLayout>
  );
};

export default Sellers;
