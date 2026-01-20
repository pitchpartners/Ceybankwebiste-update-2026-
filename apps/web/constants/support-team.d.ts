interface ISupportTeam {
    avatar: string;
    fullName: string;
    role: string;
    branch: string;
    mobile: string;
}
interface IBranch {
    location?: string;
    phone?: string;
    fax?: string;
    email?: string;
}
export declare const supportTeams: ISupportTeam[];
export declare const branches: IBranch[];
export {};
