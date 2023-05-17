
export class Register {
    email? : string
    name? : string
    password? : string
}

export class Login{
    email: string 
    password: string 
}

export class User{
    name: string
    email: string
    password: string
    isEmailVerified: boolean
    role: string
}

export class Product {
    name: string
    description: string
    amount: number
    id?: number
  }