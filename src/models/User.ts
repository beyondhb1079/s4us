import firebase from 'firebase';
import {
  Grade, ScholarshipType, Gender, ScholarshipAmount, States,
} from './enums';

export enum Role{
  READER,
  CONTRIBUTOR,
  MODERATOR,
  ADMIN
}
export enum NotificationType{
  NONE,
  EMAIL,
  MOBILE
}

interface UserProps {
  DOB?: Date;
  schoolYear: Grade;
  role: Role;
  gender: Gender;
  school?: string;
  state?: string;
  majors?: string[]
  scholarshipPrefs: ScholarshipPreferences;
  notificationSettings: NotificationSettings;
}

interface ScholarshipPreferences{
  type: ScholarshipType[];
  major?: string[];
  amount: {
    type: ScholarshipAmount;
    min?: number;
    max?: number;
  }
  schools?: string[];
  state?: States[];
}
interface NotificationSettings{
  notifications: NotificationType;
  deadlineNotifications: NotificationType;
  relatedNotifications: NotificationType;
}

export default class User {
  id?: string;
  data: UserProps;

  private constructor(data: UserProps){
    this.data = { ...data } ;
  }

  
  static getCurrentUser(): User | undefined{
    //const user = firebase.auth().currentUser;
    let user: UserProps;
    //make call to firestore
    
 
    return undefined;
  }


}

