interface RieltorPhone {
    "phone": string,
            "code": number,
            "viber": boolean,
            "telegram": boolean
}

export interface Rieltor  {
    "full_name": string,
    "phones": RieltorPhone[]
}

