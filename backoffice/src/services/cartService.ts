
import { AbandonedCart } from "@/types/cart";

// Mock data for abandoned carts
export const getMockAbandonedCarts = (): AbandonedCart[] => {
  return [
    {
      id: "cart-001",
      date: "2023-09-15T14:32:00Z",
      price: 149.99,
      email: "john.smith@example.com",
      name: "John Smith",
      items: [
        {
          id: "item-001",
          name: "Wireless Headphones",
          price: 99.99,
          quantity: 1,
          image: "/placeholder.svg"
        },
        {
          id: "item-002",
          name: "Phone Case",
          price: 24.99,
          quantity: 2,
          image: "/placeholder.svg"
        }
      ],
      lastActive: "2023-09-15T14:45:00Z",
      status: "abandoned"
    },
    {
      id: "cart-002",
      date: "2023-09-14T10:15:00Z",
      price: 499.95,
      email: "emma.johnson@example.com",
      name: "Emma Johnson",
      items: [
        {
          id: "item-003",
          name: "Tablet Pro",
          price: 499.95,
          quantity: 1,
          image: "/placeholder.svg"
        }
      ],
      lastActive: "2023-09-14T10:28:00Z",
      status: "reminder-sent"
    },
    {
      id: "cart-003",
      date: "2023-09-16T09:22:00Z",
      price: 79.98,
      email: "michael.williams@example.com",
      name: "Michael Williams",
      items: [
        {
          id: "item-004",
          name: "Smart Watch Band",
          price: 39.99,
          quantity: 2,
          image: "/placeholder.svg"
        }
      ],
      lastActive: "2023-09-16T09:35:00Z",
      status: "abandoned"
    },
    {
      id: "cart-004",
      date: "2023-09-13T16:50:00Z",
      price: 1299.00,
      email: "sophia.brown@example.com",
      name: "Sophia Brown",
      items: [
        {
          id: "item-005",
          name: "Laptop Pro",
          price: 1299.00,
          quantity: 1,
          image: "/placeholder.svg"
        }
      ],
      lastActive: "2023-09-13T17:10:00Z",
      status: "recovered"
    },
    {
      id: "cart-005",
      date: "2023-09-17T11:05:00Z",
      price: 189.97,
      email: "david.jones@example.com",
      name: "David Jones",
      items: [
        {
          id: "item-006",
          name: "Wireless Speaker",
          price: 129.99,
          quantity: 1,
          image: "/placeholder.svg"
        },
        {
          id: "item-007",
          name: "Charging Cable",
          price: 19.99,
          quantity: 3,
          image: "/placeholder.svg"
        }
      ],
      lastActive: "2023-09-17T11:22:00Z",
      status: "abandoned"
    },
    {
      id: "cart-006",
      date: "2023-09-12T08:40:00Z",
      price: 899.99,
      email: "olivia.miller@example.com",
      name: "Olivia Miller",
      items: [
        {
          id: "item-008",
          name: "Camera Plus",
          price: 899.99,
          quantity: 1,
          image: "/placeholder.svg"
        }
      ],
      lastActive: "2023-09-12T09:15:00Z",
      status: "reminder-sent"
    },
    {
      id: "cart-007",
      date: "2023-09-18T15:30:00Z",
      price: 59.98,
      email: "james.davis@example.com",
      name: "James Davis",
      items: [
        {
          id: "item-009",
          name: "Bluetooth Earbuds",
          price: 29.99,
          quantity: 2,
          image: "/placeholder.svg"
        }
      ],
      lastActive: "2023-09-18T15:42:00Z",
      status: "abandoned"
    },
    {
      id: "cart-008",
      date: "2023-09-11T13:20:00Z",
      price: 249.99,
      email: "ava.wilson@example.com",
      name: "Ava Wilson",
      items: [
        {
          id: "item-010",
          name: "Smart Home Hub",
          price: 249.99,
          quantity: 1,
          image: "/placeholder.svg"
        }
      ],
      lastActive: "2023-09-11T13:45:00Z",
      status: "recovered"
    }
  ];
};

// Function to simulate sending a reminder to a customer
export const sendCartReminder = async (cartId: string): Promise<boolean> => {
  console.log(`Sending reminder for cart ID: ${cartId}`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return true;
};
