export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: number;
    state: string;
    zip: string;
    cellPhone: string;
    homePhone: string;
    email: string;
}

export interface EmployeeLogin {
    email: string;
    password: string;
}
