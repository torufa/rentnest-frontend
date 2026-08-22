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