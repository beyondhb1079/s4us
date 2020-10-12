import firebase from 'firebase';
import {
  Grade, ScholarshipType, Gender, ScholarshipAmount,
} from './enums';

export enum Role{
  Reader,
  Contributor,
  Moderator,
  Admin
}
export enum NotificationType{
  None,
  email,
  mobile
}

interface UserProps {
  DOB: Date | undefined;
  schoolYear: Grade;
  role: Role;
  gender: Gender;
  scholarshipPrefs: ScholarshipPreferences;
  otherSettings: NotificationSettings;
}
interface AuthProps {
  displayName: string | null,
  email: string | null,
  emailVerified: boolean | null,
  phoneNumber: string | null,
  photoURL: string | null,
  uid: string | null,
}
interface ScholarshipPreferences{
  type: ScholarshipType;
  major: string[] | undefined;
  amount: {
    type: ScholarshipAmount | undefined;
    min: number | undefined;
    max: number | undefined;
  }
  school: string[];
  schoolYear: Grade;
  location: string[];
}
interface NotificationSettings{
  notifications: NotificationType;
  deadlineNotifications: NotificationType;
  relatedNotifications: NotificationType;
}

export default class User {
  id?: string;
  data!: UserProps;

  static getCurrentUser(): AuthProps | null{
    const user = firebase.auth().currentUser;
    if (user != null) {
      return {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
      };
    }
    return null;
  }

  // Todo: fetch data for different user
  // get(id: string){}
}
