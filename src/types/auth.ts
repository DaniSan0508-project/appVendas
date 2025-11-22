export interface AuthState {
    isAuthenticated: boolean;
    user: UserProfile | null;
    loading: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
    remember: boolean;
    tenant_id: number;
}

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    status: string;
    profile: { id: number; name: string };
    tenant: Tenant;
}

export interface Tenant {
    id: number;
    name: string;
    logo_app: string;
}

export interface LoginResponse {
    msg: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    data: UserProfile;
    is_marketplace: string;
    sync_dataecom: string;
}