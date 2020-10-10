interface UserProps {
    age: number;
    schoolYear: number;
    role: string;
    gender: string;
    scholarshipPreferences: {
        type: string,
        major: string,
        amount: number, 
        school: string,
        grade: number,
        location: string
    };
    otherSettings: {
        notifications: boolean,
        deadlineNotifications: boolean,
        relatedNotifications: boolean
    }
}

export default class User{
    id?:string;
    data: UserProps

    constructor(data:UserProps){
        this.data = { ...data };
    }
}