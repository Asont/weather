/*
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
}*/
export type IPType = {
	ip: string;
	version: string;
	city: string;
	region: string;
	region_code: string;
	country: string;
	country_name: string;
	country_code: string;
	country_code_iso3: string;
	country_capital: string;
	country_tld: string;
	continent_code: string;
	in_eu: boolean;
	postal: string;
	latitude: number;
	longitude: number;
	timezone: string;
	utc_offset: string;
	country_calling_code: string;
	currency: string;
	currency_name: string;
	languages: string;
	country_area: number;
	country_population: number;
	asn: string;
	org: string;
}