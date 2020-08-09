interface Roles {
    admin?: boolean;
    basic?: boolean;
    petshop?: boolean;
}

export interface User {
    uid: string;
    name: string;
    lastName: string;
    email?: string;
    sex: string;
    birthDate: string;
    active?: boolean;
    roles?: Roles;
    registerDate?: Date;
    theme?: string;
}