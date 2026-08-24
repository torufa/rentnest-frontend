export type LoginState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    }
}

export type User = {
    name?: string;
    email: string;
    password: string;
    description?: string;
    role?: string;
    accountStatus?: string;
}

export type RegisterState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        result : User
    }
}

export type NavbarProps = {
    user : RegisterState
}

export type UserRole = "LANDLORD" | "TENANT" | "ADMIN";
export type AccountStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export type UserData = {
    id: string;
    name: string;
    email: string;
    password?: string;
    description?: string | null;
    role: UserRole;
    accountStatus: AccountStatus;
    createdAt: string;
    updatedAt: string;
}

export type PropertyStatus = "AVAILABLE" | "RENTED" | "UNAVAILABLE";

export type Review = {
  id: string;
  review: string;
  rating: number;
  status: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  updatedAt: string;
};

export interface Property {
  id: string;
  propertyName: string;
  picture: string | null;
  description: string;
  amenities: string[];
  location: string;
  price: string;
  status: PropertyStatus;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

  category: {
    categoryName: string;
  };

  user: User;

  reviews: Review[];
}

export type RentalRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "PAID";

export type LandlordProperty = {
  id: string;
  propertyName: string;
  picture: string | null;
  description: string;
  amenities: string[];
  location: string;
  price: string;
  status: PropertyStatus;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type RentalCustomer = {
  id: string;
  name: string;
  email: string;
  description?: string | null;
  role: UserRole;
  accountStatus: AccountStatus;
  createdAt: string;
  updatedAt: string;
};

export type LandlordRentalRequest = {
  id: string;
  status: RentalRequestStatus;
  customerId: string;
  propertyId: string;
  rentDate: string;
  rentalExpiryDate: string;
  createdAt: string;
  updatedAt: string;
  customer: RentalCustomer;
  property: LandlordProperty;
};

export type CreatePropertyData = {
  propertyName: string;
  description: string;
  location: string;
  amenities: string[];
  price: number;
  status: PropertyStatus;
  categoryId: string;
  picture?: string;
};

export type UpdatePropertyData = {
  propertyName?: string;
  description?: string;
  location?: string;
  amenities?: string[];
  price?: number;
  status?: PropertyStatus;
  categoryId?: string;
  picture?: string;
};

export type TenantRentalProperty = {
  id: string;
  propertyName: string;
  picture: string | null;
  description: string;
  amenities: string[];
  location: string;
  price: string;
  status: PropertyStatus;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type TenantRentalRequest = {
  id: string;
  status: RentalRequestStatus;
  customerId: string;
  propertyId: string;
  rentDate: string;
  rentalExpiryDate: string;
  createdAt: string;
  updatedAt: string;
  property: TenantRentalProperty;
};

export type TenantPayment = {
  id: string;
  transactionId: string;
  rentalRequestId: string;
  amount: string;
  method: string;
  status: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  rental: {
    id: string;
    status: string;
    rentDate: string;
    rentalExpiryDate: string;
    property: {
      id: string;
      propertyName: string;
      picture: string;
      location: string;
      price: string;
    };
  };
};