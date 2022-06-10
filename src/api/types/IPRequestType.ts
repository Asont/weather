export type IPType = {
    ip: string;
    location: RootObjectLocation;
    domains: string[];
    as: RootObjectAs;
    isp: string;
}
export type RootObjectLocation = {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
}
export type RootObjectAs = {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
}