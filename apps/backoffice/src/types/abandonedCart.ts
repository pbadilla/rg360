export interface AbandonedCart {
  id: string;
  user: string; // Assuming it's a user ID or username; adjust if it's a full object
  items: any[]; // You can define a proper item interface if needed
  totalAmount: number;
  status: "abandoned" | "recovered";
  createdAt: string;
  lastUpdatedAt: string;
  reminderCount: number;
  reminderHistory: {
    sentAt: string;
  }[];
  lastReminderSentAt: string;
}
