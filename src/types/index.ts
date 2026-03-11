export type UserRole = 'USER' | 'STORE' | 'DELIVERY' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  ownerId: string;
  isOpen: boolean;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  storeId?: string;
  storeName?: string;
  deliveryPartnerId?: string;
  status: 'PENDING' | 'ACCEPTED' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED';
  prescriptionUrl: string;
  items?: Array<{
    name: string;
    dosage: string;
    instructions: string;
  }>;
  createdAt: number;
  totalPrice?: number;
}