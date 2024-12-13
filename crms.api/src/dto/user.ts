export interface user_dto{
    id : string;
    name : string,
    username : string;
    contact : string;
    password : string;
    role : string;
}

export interface sign_up_result{
    successed : boolean;
    nid_exist : boolean;
    contact_exist :  boolean;
    username_exist : boolean;
}