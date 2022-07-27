export type Response = {
    status: string,
    token: string,
    user: User
}
export type User = {
    balance?: number,
    canBorrow?: boolean,
    email: string,
    name?: string,
    password: string,
    passwordConfirm?: string,
    role?: string,
    tn?: string,
    _id?: string
}
