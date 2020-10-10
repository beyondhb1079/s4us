import {
  Grade, Role, ScholarshipType, Gender,
} from './enums';

interface UserProps {
  age: number;
  schoolYear: Grade;
  role: Role;
  gender: Gender;
  scholarshipPreferences: {
    type: ScholarshipType,
    major: string,
    amount: number,
    school: string,
    schoolYear: Grade,
    location: string
  };
  otherSettings: {
    notifications: boolean,
    deadlineNotifications: boolean,
    relatedNotifications: boolean
  }
}

export default class User {
  id?:string;
  data: UserProps;

  constructor(data:UserProps) {
    this.data = { ...data };
  }
}
