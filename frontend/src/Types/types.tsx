export type Organization = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  vendor: Vendor[];
  OrganizationRegister: string
  request:  "PENDING" | "CANCELLED" | "APPROVED";
};
export type Vendor = {
  id: string;
  name: string;
  description: string | null;
  categories: Category[];
  location: string;
  mapLat: number | null;
  mapLng: number | null;
  phone: string;
  email: string;
  imageUrl: string | null;
  ratingAvg: number;
  services: Service[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  address: Address | null;
  addressID: string | null;
  admin: Organization;
  OrganizationId: string;
};
export type Category = {
  name: string;
  id: string;
  icon: string | null;
  vendors: Vendor[];
  Service: Service[];
};
export type Service = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  category: Category;
  categoryId: string;
  imageUrl: string | null;
  vendor: Vendor;
  vendorId: string;
  schedules: ServiceSchedule[];
  createdAt: Date;
};

export type ServiceSchedule = {
  id: string;
  service: Service;
  serviceId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  booking: Booking[];
};
export type Booking = {
  id: string;
  userId: string;
  serviceScheduleId: string;
  serviceSchedule: ServiceSchedule;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "UNPAID" | "PAID";
  notes?: string | null;
  createdAt: Date;
};
export type Review = {
  id: string;
  userId: string;
  vendorId: string;
  rating: number;
  comment?: string | null;
  createdAt: Date;
};
export type Address = {
  id: string;
  street: string;
  cityId: string;
  SumOrKhoroo: string;
  vendorID: string;
  districtId: string;
};
