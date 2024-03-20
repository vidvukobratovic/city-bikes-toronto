// Extra.ts

export interface Extra {
    address?: string;
    altitude?: number;
    ebikes: number;
    has_ebikes: boolean;
    last_updated?: number;
    normal_bikes?: number;
    payment?: string[];
    'payment-terminal'?: boolean;
    renting?: number;
    returning?: number;
    slots?: number;
    uid?: string;
    // Add other properties from `extra` as needed
}
