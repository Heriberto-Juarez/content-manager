export interface auth {
    token: string | null;
    refreshToken: string | null;
    isLogged: boolean;
    role: string|null;
}