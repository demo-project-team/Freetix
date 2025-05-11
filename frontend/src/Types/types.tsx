export type Organization = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  vendor: Vendor[];
  OrganizationRegister: string;
  request: "PENDING" | "CANCELLED" | "APPROVED";
};
export type Vendor = {
  images : Image[]
  id: string;
  name: string;
  description: string | null;
  categories: Category[];
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
  rooms: Room[];
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
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "UNPAID" | "PAID";
  notes?: string | null;
  createdAt: Date;
  pcs: PC[];
  startTime: Date;
  endTime: Date;
};
export type Review = {
  id: string;
  userId: string;
  vendorId: string;
  user : User
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
export type Room = {
  id: string;
  name: string;
  vendorId: string;
  tables: Table[];
  createdAt: Date;
  updatedAt: Date;
  type: RoomType;
  pcPricePerHour: number;
};
export type Table = {
  id: string;
  name: string;
  roomId: string;
  pcs: PC[];
  createdAt: Date;
  updatedAt: Date;
};
export type PC = {
  id: string;
  name: string;
  tableId: string;
  row: number;
  column: number;
  status: PCStatus;
  createdAt: Date;
  updatedAt: Date;
};
export enum PCStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  IN_USE = "IN_USE",
  MAINTENANCE = "MAINTENANCE",
}
export enum RoomType {
  VIP = "VIP",
  STANDART = "STANDART",
}
export type City = {
  name: string;
  district: District[];
  id: string;
  Address: Address[];
};
export type District = {
  id: string;
  name: string;
  cityId: string;
  Address: Address[];
};
export type Payment = {
  id: string;
  status: PaymentStatus;
  bookingId: string;
  amount: number;
  transactionId: string;
  paidAt: Date | null;
  method: string;
  booking: Booking;
};
export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}
export type Image ={
  id : string
  url : string
  vendor : Vendor
  vendorId : string
}
<<<<<<< Updated upstream

=======
export type User ={
  id : string
  email : string
  name : string
  profileImage : string
}
>>>>>>> Stashed changes
