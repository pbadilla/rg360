import {
  Package,
  ShoppingBag,
  Users,
  BadgePercent,
  AlertTriangle,
  Truck,
  CreditCard,
  ArrowDown,
  FileBox,
  BadgeDollarSign,
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
    id: "pos",
    label: "POS",
    icon: <BadgeDollarSign size={20} />,
    link: "/pos",
    submenu: [
      {
        id: "posProduts",
        label: "Products",
        link: "/pos/products",
      },
      {
        id: "posStats",
        label: "Stats",
        link: "/pos/stats",
      },
      {
        id: "posSellers",
        label: "Sellers",
        link: "/pos/sellers",
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
  },
  {
    id: "payments",
    label: "Payments",
    icon: <CreditCard size={20} />,
    link: "/payments",
  },
  {
    id: "dropshipping",
    label: "Dropshipping",
    icon: <ArrowDown size={20} />,
    link: "/dropshipping",
  },
];
