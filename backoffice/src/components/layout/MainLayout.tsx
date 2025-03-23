
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
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
  Boxes
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    id: 'products',
    label: 'Products',
    icon: <Package size={20} />,
    link: '/products',
    submenu: [
      {
        id: 'allProducts',
        label: 'All Products',
        link: '/products/all',
      },
      {
        id: 'categories',
        label: 'Categories',
        link: '/products/categories',
      },
      {
        id: 'inventory',
        label: 'Inventory',
        link: '/products/inventory',
      },
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingBag size={20} />,
    link: '/orders',
  },
  {
    id: 'users',
    label: 'Users',
    icon: <Users size={20} />,
    link: '/users',
    submenu: [
      {
        id: 'allUsers',
        label: 'All Users',
        link: '/users/all',
      },
      {
        id: 'roles',
        label: 'Roles',
        link: '/users/roles',
      },
      {
        id: 'permissions',
        label: 'Permissions',
        link: '/users/permissions',
      },
    ],
  },
  {
    id: 'promotions',
    label: 'Promotions',
    icon: <BadgePercent size={20} />,
    link: '/promotions',
    submenu: [
      {
        id: 'activePromotions',
        label: 'Active Promotions',
        link: '/promotions/active',
      },
      {
        id: 'scheduledPromotions',
        label: 'Scheduled',
        link: '/promotions/scheduled',
      },
      {
        id: 'createPromotion',
        label: 'Create New',
        link: '/promotions/create',
      },
    ],
  },
  {
    id: 'abandonedCarts',
    label: 'Abandoned Carts',
    icon: <AlertTriangle size={20} />,
    link: '/abandoned-carts',
  },
  {
    id: 'logistics',
    label: 'Logistics',
    icon: <Truck size={20} />,
    link: '/logistics',
    submenu: [
      {
        id: 'warehouses',
        label: 'Warehouses',
        link: '/logistics/warehouses',
      },
      {
        id: 'shipping',
        label: 'Shipping Methods',
        link: '/logistics/shipping',
      },
      {
        id: 'tracking',
        label: 'Order Tracking',
        link: '/logistics/tracking',
      },
    ],
  },
  {
    id: 'transports',
    label: 'Transports',
    icon: <Train size={20} />,
    link: '/transports',
    submenu: [
      {
        id: 'vehicles',
        label: 'Vehicles',
        link: '/transports/vehicles',
      },
      {
        id: 'routes',
        label: 'Routes',
        link: '/transports/routes',
      },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: <CreditCard size={20} />,
    link: '/payments',
    submenu: [
      {
        id: 'methods',
        label: 'Payment Methods',
        link: '/payments/methods',
      },
      {
        id: 'transactions',
        label: 'Transactions',
        link: '/payments/transactions',
      },
      {
        id: 'refunds',
        label: 'Refunds',
        link: '/payments/refunds',
      },
    ],
  },
  {
    id: 'dropshipping',
    label: 'Dropshipping',
    icon: <ArrowDown size={20} />,
    link: '/dropshipping',
    submenu: [
      {
        id: 'suppliers',
        label: 'Suppliers',
        link: '/dropshipping/suppliers',
      },
      {
        id: 'products',
        label: 'Products',
        link: '/dropshipping/products',
      },
      {
        id: 'fulfillment',
        label: 'Fulfillment',
        link: '/dropshipping/fulfillment',
      },
    ],
  },
  {
    id: 'bulkActions',
    label: 'Bulk Actions',
    icon: <Boxes size={20} />,
    link: '/bulk-actions',
    submenu: [
      {
        id: 'import',
        label: 'Import',
        link: '/bulk-actions/import',
      },
      {
        id: 'export',
        label: 'Export',
        link: '/bulk-actions/export',
      },
      {
        id: 'update',
        label: 'Batch Update',
        link: '/bulk-actions/update',
      },
    ],
  },
];

const Logo = () => (
  <div className="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 mr-2 text-sidebar-primary"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
    </svg>
    <span className="font-semibold text-base">Horizon</span>
  </div>
);

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        menuItems={menuItems} 
        logo={<Logo />} 
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        {
          "ml-72": !sidebarCollapsed && !isMobile,
          "ml-[72px]": sidebarCollapsed && !isMobile,
          "ml-0": isMobile,
        }
      )}>
        <Header collapsed={sidebarCollapsed} />
        <main className="pt-16">
          <div className="mx-auto px-0 py-8 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
