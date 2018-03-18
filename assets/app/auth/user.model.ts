export class User{
    constructor(
        public email?:string,
        public password?:string,
        public name?:string,
        public surname?:string,
        public isverified?:boolean,
        public photoUrl?:string,
        public id?:string,
        public photoSrc?:any){}
}