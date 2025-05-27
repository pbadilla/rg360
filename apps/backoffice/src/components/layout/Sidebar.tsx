
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

// Type definitions
interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  link?: string;
  submenu?: MenuItem[];
}

interface SidebarProps {
  menuItems: MenuItem[];
  logo?: React.ReactNode;
  collapsed?: boolean;
  onToggle?: () => void;
}

// Animation variants
const sidebarVariants = {
  expanded: {
    width: '240px',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  collapsed: {
    width: '72px',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const menuItemVariants = {
  initial: { opacity: 0, y: -5 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

const SubMenu: React.FC<{
  items: MenuItem[];
  isOpen: boolean;
  level: number;
  parentId: string;
  activeItem: string | null;
  onItemClick: (id: string) => void;
  collapsed?: boolean;
}> = ({ items, isOpen, level, parentId, activeItem, onItemClick, collapsed }) => {
  if (!isOpen) return null;
  
  return (
    <motion.ul
      key={`${parentId}-submenu`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("pl-4 mt-1 space-y-1 overflow-hidden", {
        "ml-0 pl-0": collapsed,
      })}
    >
      {items.map((item, index) => (
        <MenuItem 
          key={item.id}
          item={item}
          level={level + 1}
          index={index}
          activeItem={activeItem}
          onItemClick={onItemClick}
          collapsed={collapsed}
        />
      ))}
    </motion.ul>
  );
};

const MenuItem: React.FC<{
  item: MenuItem;
  level: number;
  index: number;
  activeItem: string | null;
  onItemClick: (id: string) => void;
  collapsed?: boolean;
}> = ({ item, level, index, activeItem, onItemClick, collapsed }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const isActive = activeItem === item.id;
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  
  // Check if any child is active
  const isChildActive = (items?: MenuItem[]): boolean => {
    if (!items || !activeItem) return false;
    return items.some(
      subItem => subItem.id === activeItem || isChildActive(subItem.submenu)
    );
  };
  
  const childActive = hasSubmenu ? isChildActive(item.submenu) : false;
  
  // Auto-expand submenu if child is active
  useEffect(() => {
    if (childActive && !isSubMenuOpen) {
      setIsSubMenuOpen(true);
    }
  }, [childActive, isSubMenuOpen]);
  
  // Handle click on menu item
  const handleClick = () => {
    if (hasSubmenu) {
      setIsSubMenuOpen(!isSubMenuOpen);
    }
    // console.log('Item', item);
    // console.log(`Clicked on ${item.link}`);
    onItemClick(item.link);
  };
  
  return (
    <motion.li
      custom={index}
      initial="initial"
      animate="animate"
      variants={menuItemVariants}
      className={cn("relative", {
        "mb-1": hasSubmenu && isSubMenuOpen,
      })}
    >
      {item.link ? (
        <Link
          to={item.link}
          onClick={handleClick}
          className={cn(
            "flex items-center px-3 py-2 rounded-md cursor-pointer menu-item",
            "transition-all duration-200 ease-in-out",
            "hover:bg-sidebar-accent",
            {
              "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90": isActive,
              "bg-sidebar-accent/50": childActive && !isActive,
              "justify-center": collapsed && level === 1,
              "pl-5": level > 1,
              "pl-4": level === 1 && !collapsed,
            }
          )}
          aria-expanded={hasSubmenu ? isSubMenuOpen : undefined}
          role={hasSubmenu ? 'button' : undefined}
        >
        {item.icon && (
          <span className={cn("text-sidebar-foreground", {
            "text-sidebar-primary-foreground": isActive,
            "mr-3": !collapsed || level > 1,
          })}>
            {item.icon}
          </span>
        )}
        
        {(!collapsed || level > 1) && (
          <span className="flex-1 truncate text-sm font-medium">
            {item.label}
          </span>
        )}
        
        {hasSubmenu && !collapsed && (
          <span className="text-sidebar-foreground">
            {isSubMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        </Link>
      ) : (
        <div
          onClick={handleClick}
          className={cn( /* ...same classes */ )}
          aria-expanded={hasSubmenu ? isSubMenuOpen : undefined}
          role={hasSubmenu ? 'button' : undefined}
        >
        {item.icon && (
          <span className={cn("text-sidebar-foreground", {
            "text-sidebar-primary-foreground": isActive,
            "mr-3": !collapsed || level > 1,
          })}>
            {item.icon}
          </span>
        )}
        
        {(!collapsed || level > 1) && (
          <span className="flex-1 truncate text-sm font-medium">
            {item.label}
          </span>
        )}
        
        {hasSubmenu && !collapsed && (
          <span className="text-sidebar-foreground">
            {isSubMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        </div>
      )}

      {hasSubmenu && (
        <>
          {!collapsed ? (
            // Normal Inline Submenu
            <AnimatePresence>
              {isSubMenuOpen && (
                <SubMenu
                  items={item.submenu || []}
                  isOpen={true}
                  level={level}
                  parentId={item.id}
                  activeItem={activeItem}
                  onItemClick={onItemClick}
                  collapsed={collapsed}
                />
              )}
            </AnimatePresence>
          ) : (
            // Floating Submenu when collapsed
            <div 
                className="relative"
                onMouseEnter={() => setIsSubMenuOpen(true)}
                onMouseLeave={() => setIsSubMenuOpen(false)}
              >
                {isSubMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full top-0 ml-2 w-56 bg-sidebar-primary rounded-lg shadow-lg border border-sidebar-border z-[100] overflow-visible"
                  >
                    <ul className="py-2">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            to={subItem.link || "#"}
                            className="block px-4 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
                            onClick={() => onItemClick(subItem.id)}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
          )}
        </>
      )}
    </motion.li>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  logo,
  collapsed: externalCollapsed,
  onToggle,
}) => {
  const isMobile = useIsMobile();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Decide if we use external or internal collapsed state
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  
  const toggleSidebar = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };
  
  const handleItemClick = (id: string) => {
    setActiveItem(id);
    if (isMobile) {
      setMobileOpen(false);
    }
  };
  
  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        mobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, mobileOpen]);
  
  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 bg-black/30 z-20 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        />
      )}
      
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed top-4 left-4 z-30 p-2 rounded-md bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-sm"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      {/* Sidebar */}
      <motion.div
        ref={sidebarRef}
        variants={sidebarVariants}
        initial={false}
        animate={isMobile ? (mobileOpen ? "expanded" : "collapsed") : (collapsed ? "collapsed" : "expanded")}
        className={cn(
          "h-screen fixed top-0 left-0 z-30 flex flex-col",
          "border-r border-sidebar-border",
          "sidebar-blur",
          "transition-all duration-300 ease-in-out",
          {
            "translate-x-0": !isMobile || mobileOpen,
            "-translate-x-full": isMobile && !mobileOpen,
          }
        )}
      >
        {/* Sidebar Header */}
        <div className={cn(
          "h-16 flex items-center px-4 border-b border-sidebar-border",
          {
            "justify-center": collapsed && !isMobile,
          }
        )}>
          {logo ? (
            <div className={cn({
              "w-full flex justify-center": collapsed && !isMobile,
            })}>
              {logo}
            </div>
          ) : (
            <div className="text-lg font-semibold truncate">Your App</div>
          )}
          
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className={cn(
                "ml-auto p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground",
                { "hidden": collapsed }
              )}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>
        
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto pt-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <MenuItem
                key={item.id}
                item={item}
                level={1}
                index={index}
                activeItem={activeItem}
                onItemClick={handleItemClick}
                collapsed={collapsed && !isMobile}
              />
            ))}
          </ul>
        </div>
        
        {/* Sidebar Footer */}
        <div className={cn(
          "h-16 flex items-center justify-center px-4 border-t border-sidebar-border",
          {
            "flex-col": !collapsed || isMobile,
            "justify-center": collapsed && !isMobile,
          }
        )}>
          {!collapsed || isMobile ? (
            <div className="text-xs text-sidebar-foreground/70">
              © {new Date().getFullYear()} Your Company
            </div>
          ) : (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
              aria-label="Expand sidebar"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
};

const ChevronLeft = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);
