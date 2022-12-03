import {InnovationCurve} from './innovation';

export enum USP {
    Cheaper = 1,
    Better = 2,
    Niche = 3,
    Local = 4,
    New = 5,
    FirstInCountry = 6,
    FirstGlobally = 7,
}

export enum SalesModels {
    Other,
    B2B,
    B2C,
    B2B2C,
}

export enum RevenueChannels {
    Advertising = 1,
    BrickAndMortar = 2,
    Bookings = 3,
    Content = 4,
    Direct = 5,
    Distribution = 6,
    eCommerce = 7,
    Fee = 8,
    Freemium = 9,
    Franchise = 10,
    LeadGeneration = 11,
    Licensing = 12,
    Markup = 13,
    Marketplace = 14,
    Membership = 15,
    Manufacturing = 16,
    PAYG = 17,
    Renting = 18,
    Retailing = 19,
    Sponsorship = 20,
    ThirdParty = 21,
}

export enum BusinessModels {
    HIGH_VAL_CUSTOMERS = 1,
    SIGNIFICANT_VALUE = 2,
    HIGH_MARGINS = 3,
    CUSTOMER_SATISFACTION = 4,
    MARKET_POSITION = 5,
    FUND = 6,
}

export type Metrics =
    | 'UniqueUsers'
    | 'Signups'
    | 'Downloads'
    | 'DAU'
    | 'MAU'
    | 'GPM' // Also called NPM
    | 'ConversionRate'
    | 'ChurnRate'
    | 'RetentionRate'
    | 'EngagementRate'
    | 'ReturnRate'
    | 'NewUsers'
    | 'CAC' // Also called CPA
    | 'LTV'
    | 'ARPU';

export type SocialMedia = 'Other' | 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'WhatsApp' | 'Pinterest';

export interface Markets {
    TAM: number;
    SAM: number;
    SOM: number;
    innovationCurve: InnovationCurve;
}
