export type Book = {

    name:string,
    author:{
        _id:string,
        name:string
    },
    

    
}

export type User = {
    userName: string,
    signature: string,
  
}

export type Author = {
    name:string,
    intro:string,
    country:string,
    photo:string,
    nobel:number
}