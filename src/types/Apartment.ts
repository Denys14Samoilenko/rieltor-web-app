export interface Apartment {
    "id":string,
         "location_inf":{
            "street":string,
            "location":string
         },
         "rubric":string,
         "price":{
            "price_uah":string,
            "price_usd":number,
            "price_eur":number
         },
         "title":string,
         "description":string,
         "rooms":null,
         "storey_count":string,
         "storey":string,
         "total_house_area":string,
         "dwelling_place":string,
         "kitchen_area":string,
         "imgs": string[]
         "choise":number
}