export interface MaintenanceLog {
  id?: number;
  name: string;
  description: string;
  date: string;
  status: string;
  image?: string;
  updatedAt?: string;
  message?: string;
  category?: string;
  unitNumber?: number;
}
