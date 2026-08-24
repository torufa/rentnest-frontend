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