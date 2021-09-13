export class User{
    id: String;
    name : string;
    username: string;
    email: string;
    country: string;
    password: string;
    role: string;
    token: string;

    constructor() {
        this.id='';
        this.name = '';
        this.username = '';
        this.email = '';
        this.country = '';
        this.password = '';
        this.role = '';
        this.token = '';
    }
}