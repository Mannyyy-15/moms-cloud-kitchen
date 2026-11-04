export type FranchiseType = 'Single Franchisee' | 'Master Franchise';

export interface FranchiseFormData {
  fullName: string;
  contactNumber: string;
  email: string;
  city: string;
  brand: string;
  franchiseType: FranchiseType;
  message: string;
  consent: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

export interface StatItem {
  value: string;
  label: string;
  detail: string;
}

export interface BrandValue {
  title: string;
  description: string;
  iconName: string;
}
