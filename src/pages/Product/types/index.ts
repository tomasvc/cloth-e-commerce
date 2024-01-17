export interface Product {
    id?:                        number;
    name?:                      string;
    description?:               string;
    alternateNames?:            AlternateName[];
    localisedData?:             LocalisedDatum[];
    gender?:                    string;
    productCode?:               string;
    pdpLayout?:                 string;
    brand?:                     Brand;
    sizeGuide?:                 null;
    sizeGuideAPIURL?:           null;
    isNoSize?:                  boolean;
    isOneSize?:                 boolean;
    isInStock?:                 boolean;
    countryOfManufacture?:      null;
    hasVariantsWithProp65Risk?: boolean;
    webCategories?:             any[];
    variants?:                  Variant[];
    media?:                     Media;
    badges?:                    any[];
    info?:                      Info;
    associatedProductGroups?:   any[];
    shippingRestriction?:       null;
    price?:                     Price;
    isDeadProduct?:             boolean;
    rating?:                    Rating;
    productType?:               ProductType;
    plpIDS?:                    PlpID[];
}

export interface AlternateName {
    locale?: string;
    title?:  string;
}

export interface Brand {
    brandID?:     number;
    name?:        string;
    description?: string;
}

export interface Info {
    aboutMe?:    string;
    sizeAndFit?: string;
    careInfo?:   string;
}

export interface LocalisedDatum {
    locale?: string;
    title?:  string;
    pdpURL?: string;
}

export interface Media {
    images?:       Image[];
    catwalk?:      any[];
    spinset?:      any[];
    swatchSprite?: any[];
}

export interface Image {
    url?:         string;
    type?:        string;
    colourWayID?: number | null;
    colourCode?:  string;
    colour?:      string;
    isPrimary?:   boolean;
}

export interface PlpID {
    id?:   number;
    type?: Type;
}

export enum Type {
    Brand = "Brand",
    SEO = "SEO",
    Standard = "Standard",
}

export interface Price {
    current?:                           Current;
    previous?:                          Current;
    rrp?:                               Current;
    xrp?:                               Current;
    currency?:                          string;
    isMarkedDown?:                      boolean;
    isOutletPrice?:                     boolean;
    startDateTime?:                     Date;
    previousEndDate?:                   null;
    lowestPriceInLast30DaysValue?:      null;
    lowestPriceInLast30DaysText?:       null;
    lowestPriceInLast30DaysEndDate?:    null;
    lowestPriceInLast30DaysPercentage?: null;
    wasPriceStartDate?:                 null;
}

export interface Current {
    value?:        number;
    text?:         string;
    versionID?:    string;
    conversionID?: string;
}

export interface ProductType {
    id?:   number;
    name?: string;
}

export interface Rating {
    averageOverallRating?:     number;
    averageOverallStarRating?: number;
    totalReviewCount?:         number;
}

export interface Variant {
    id?:              number;
    name?:            string;
    sizeID?:          number;
    brandSize?:       string;
    sizeDescription?: string;
    displaySizeText?: string;
    sizeOrder?:       number;
    sku?:             string;
    isLowInStock?:    boolean;
    isInStock?:       boolean;
    isAvailable?:     boolean;
    colourWayID?:     number;
    colourCode?:      null;
    colour?:          string;
    price?:           Price;
    isPrimary?:       boolean;
    isProp65Risk?:    boolean;
    ean?:             string;
    seller?:          null;
}
