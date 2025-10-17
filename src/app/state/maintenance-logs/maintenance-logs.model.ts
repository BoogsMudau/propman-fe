export interface MaintenanceLog {
  id?: number;
  creatorName: string;
  description: string;
  title: string;
  status: string;
  image?: string;
  updatedAt?: string;
  created_at: string;
  category?: string;
  unit?: number;
  priority: string;
  notes?: string;
  creatorId?: string;
}
