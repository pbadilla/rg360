
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
import { Link } from 'react-router-dom';
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
        id: 'universkate',
        label: 'Universkate',
        link: '/bulk-actions/universkate',
      },
      {
        id: 'rollerblade',
        label: 'Rollerblade',
        link: '/bulk-actions/rollerblade',
      },
      {
        id: 'micro',
        label: 'Micro',
        link: '/bulk-actions/micro',
      },
    ],
  },
];

const Logo = () => (
  <div className="flex items-center">
    <span className="font-semibold text-base">Rollergrind360</span>
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
          "ml-61": !sidebarCollapsed && !isMobile,
          "ml-[72px]": sidebarCollapsed && !isMobile,
          "ml-2": isMobile,
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
