export interface Officer_Dto{
    id : string;
    rank : string;
}

export interface Officer extends Officer_Dto{
    user : {
        name : string
    }
}