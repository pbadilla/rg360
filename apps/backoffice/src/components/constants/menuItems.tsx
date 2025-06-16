import {
  Package,
  ShoppingBag,
  Users,
  BadgePercent,
  AlertTriangle,
  Truck,
  Train,
  CreditCard,
  ArrowDown,
  Boxes,
  FileBox,
} from "lucide-react";

export const menuItems = [
  {
    id: "products",
    label: "Products",
    icon: <Package size={20} />,
    link: "/products",
    submenu: [
      { id: "allProducts", label: "All Products", link: "/products/all" },
      { id: "categories", label: "Categories", link: "/products/categories" },
    ],
  },
  {
    id: "stock",
    label: "Stocks",
    icon: <FileBox size={20} />,
    link: "/stocks",
    submenu: [
      {
        id: "dashboardStocks",
        label: "Dashboard",
        link: "/stocks/dashboard",
      },
      {
        id: "productsStocks",
        label: "Products",
        link: "/stocks/products",
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: <ShoppingBag size={20} />,
    link: "/orders",
  },
  {
    id: "users",
    label: "Users",
    icon: <Users size={20} />,
    link: "/users",
    submenu: [
      { id: "allUsers", label: "All Users", link: "/users/all" },
      { id: "roles", label: "Roles", link: "/users/roles" },
      { id: "permissions", label: "Permissions", link: "/users/permissions" },
    ],
  },
  {
    id: "promotions",
    label: "Promotions",
    icon: <BadgePercent size={20} />,
    link: "/promotions",
    submenu: [
      {
        id: "activePromotions",
        label: "Active Promotions",
        link: "/promotions/active",
      },
      {
        id: "scheduledPromotions",
        label: "Scheduled",
        link: "/promotions/scheduled",
      },
      {
        id: "createPromotion",
        label: "Create New",
        link: "/promotions/create",
      },
    ],
  },
  {
    id: "abandonedCarts",
    label: "Abandoned Carts",
    icon: <AlertTriangle size={20} />,
    link: "/abandoned-carts",
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: <Truck size={20} />,
    link: "/logistics",
    submenu: [
      { id: "warehouses", label: "Warehouses", link: "/logistics/warehouses" },
      {
        id: "shipping",
        label: "Shipping Methods",
        link: "/logistics/shipping",
      },
      { id: "tracking", label: "Order Tracking", link: "/logistics/tracking" },
    ],
  },
  {
    id: "transports",
    label: "Transports",
    icon: <Train size={20} />,
    link: "/transports",
    submenu: [
      { id: "vehicles", label: "Vehicles", link: "/transports/vehicles" },
      { id: "routes", label: "Routes", link: "/transports/routes" },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    icon: <CreditCard size={20} />,
    link: "/payments",
    submenu: [
      { id: "methods", label: "Payment Methods", link: "/payments/methods" },
      {
        id: "transactions",
        label: "Transactions",
        link: "/payments/transactions",
      },
      { id: "refunds", label: "Refunds", link: "/payments/refunds" },
    ],
  },
  {
    id: "dropshipping",
    label: "Dropshipping",
    icon: <ArrowDown size={20} />,
    link: "/dropshipping",
    submenu: [
      { id: "suppliers", label: "Suppliers", link: "/dropshipping/suppliers" },
      { id: "products", label: "Products", link: "/dropshipping/products" },
      {
        id: "fulfillment",
        label: "Fulfillment",
        link: "/dropshipping/fulfillment",
      },
    ],
  },
];
