import { useState, useEffect } from 'react';
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

    Promise.all([
      cachedMajors
        ? Promise.resolve(cachedMajors)
        : fetch('/data/majors.json').then((r) => r.json()),
      cachedSchools
        ? Promise.resolve(cachedSchools)
        : fetch(
            'https://firebasestorage.googleapis.com/v0/b/dreamerscholars.appspot.com/o/data%2Fschools.json?alt=media',
          )
            .then((r) => {
              if (!r.ok) throw new Error('CDN fetch failed');
              return r.json();
            })
            .then((data: SchoolJSON[]) =>
              data.map((s) => ({
                name: s.n,
                state: s.s,
                url: s.u,
              })),
            )
            .catch(() =>
              fetch('/data/schools.json')
                .then((r) => r.json())
                .then((data: School[]) => data),
            ),
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
