export interface Fir_Dto{
    id : number;
    date_lodged : Date;
    inscident_date : Date;
    pretitioner_id : string;
    place  : string;
    details : string;
    acused_name : string;
}

export interface Fir_Accused{
    firId : number;
    accusedId : number;
}