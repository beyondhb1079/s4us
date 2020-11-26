import firebase, { firestore } from 'firebase';
import FirestoreModel from './FirestoreModel';
import {
  Grade,
  ScholarshipType,
  Gender,
  ScholarshipAmount,
  State,
} from './enums';

export enum Role {
  READER,
  CONTRIBUTOR,
  MODERATOR,
  ADMIN,
}
export enum NotificationType {
  NONE,
  EMAIL,
  MOBILE,
}

interface UserData {
  DOB?: Date;
  schoolYear: Grade;
  role: Role;
  gender: Gender;
  school?: string;
  state?: string;
  majors?: string[];
  scholarshipPrefs: ScholarshipPreferences;
  notificationSettings: NotificationSettings;
}

interface ScholarshipPreferences {
  type: ScholarshipType[];
  major?: string[];
  amount: {
    type: ScholarshipAmount;
    min?: number;
    max?: number;
  };
  schools?: string[];
  state?: State[];
}
interface NotificationSettings {
  notifications: NotificationType;
  deadlineNotifications: NotificationType;
  relatedNotifications: NotificationType;
}

export const converter: firestore.FirestoreDataConverter<UserData> = {
  toFirestore: (data: UserData) => ({
    ...data,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const scholarshipPrefs = data.scholarshipPrefs as ScholarshipPreferences;
    const notificationSettings = data.notificationSettings as NotificationSettings;
    return { ...data, scholarshipPrefs, notificationSettings } as UserData;
  },
};

export default class User extends FirestoreModel<UserData> {
  static get collection(): firestore.CollectionReference<UserData> {
    return firestore().collection('users').withConverter(converter);
  }

  private constructor(id?: string, data?: UserData) {
    const ref = id ? User.collection.doc(id) : User.collection.doc();
    super(ref, data ?? ({} as UserData));
  }

  static getCurrentUser(): firebase.User | undefined {
    const user = firebase.auth().currentUser;
    if (user) {
      return user;
    }
    return undefined;
  }
}
