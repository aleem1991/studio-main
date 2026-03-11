import { Order, Store, UserProfile } from "@/types";

// Use fixed timestamps to avoid hydration mismatches between server and client renders
const BASE_TIME = 1710000000000;

export const MOCK_STORES: Store[] = [
  { id: 's1', name: 'Central Care Pharmacy', address: '123 Main St, Downtown', ownerId: 'owner1', isOpen: true },
  { id: 's2', name: 'Wellness Meds', address: '456 Oak Rd, Westside', ownerId: 'owner2', isOpen: true },
  { id: 's3', name: 'QuickAid Pharmacy', address: '789 Pine Ave, Northside', ownerId: 'owner3', isOpen: false },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1',
    userId: 'u1',
    userName: 'John Doe',
    status: 'PENDING',
    prescriptionUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
    createdAt: BASE_TIME - 3600000,
  },
  {
    id: 'o2',
    userId: 'u2',
    userName: 'Jane Smith',
    status: 'ACCEPTED',
    storeId: 's1',
    storeName: 'Central Care Pharmacy',
    prescriptionUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
    createdAt: BASE_TIME - 7200000,
    items: [
      { name: 'Amoxicillin', dosage: '500mg', instructions: 'Twice daily after meals' }
    ]
  }
];
