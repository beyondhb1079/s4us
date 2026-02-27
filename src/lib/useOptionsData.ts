import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { School, SchoolJSON } from '../types/School';

interface OptionsData {
  majors: string[];
  schools: School[];
  loading: boolean;
}

/**
 * Hook that lazily fetches majors and schools data from static JSON files.
 * Data is cached after the first load so subsequent calls are instant.
 */
let cachedMajors: string[] | null = null;
let cachedSchools: School[] | null = null;

export default function useOptionsData(): OptionsData {
  const [majors, setMajors] = useState<string[]>(cachedMajors || []);
  const [schools, setSchools] = useState<School[]>(cachedSchools || []);
  const [loading, setLoading] = useState(
    cachedMajors === null || cachedSchools === null,
  );

  useEffect(() => {
    if (cachedMajors && cachedSchools) return;

    let cancelled = false;

    const fetchSchools = async () => {
      try {
        const storage = getStorage();
        const schoolsRef = ref(storage, 'data/schools.json');
        const url = await getDownloadURL(schoolsRef);
        const response = await fetch(url);
        if (!response.ok) throw new Error('CDN fetch failed');
        const data: SchoolJSON[] = await response.json();
        return data.map((s) => ({
          name: s.n,
          state: s.s,
          url: s.u,
        }));
      } catch (error) {
        console.error('Error fetching schools from storage:', error);
        // Fallback to local
        const response = await fetch('/data/schools.json');
        const data: School[] = await response.json();
        return data;
      }
    };

    Promise.all([
      cachedMajors
        ? Promise.resolve(cachedMajors)
        : fetch('/data/majors.json').then((r) => r.json()),
      cachedSchools ? Promise.resolve(cachedSchools) : fetchSchools(),
    ]).then(([m, s]) => {
      if (cancelled) return;
      cachedMajors = m;
      cachedSchools = s;
      setMajors(m);
      setSchools(s);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { majors, schools, loading };
}
