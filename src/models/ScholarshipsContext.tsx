import FirestoreModelList from './base/FiretoreModelList';
import FirestoreModel from './base/FirestoreModel';
import ScholarshipData from '../types/ScholarshipData';
import { createContext } from 'react';

interface ScholarshipsContextState {
  scholarships: FirestoreModel<ScholarshipData>[];
  loadMoreFn: () => Promise<FirestoreModelList<ScholarshipData>>;
  loading: boolean;
}

const ScholarshipsContext = createContext({} as ScholarshipsContextState);

export default ScholarshipsContext;
