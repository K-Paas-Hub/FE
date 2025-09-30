import { useState, useEffect, useCallback } from 'react';
import { Job } from '../types/job';
import { jobService } from '../services/api';

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async (params?: Record<string, string>) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await jobService.getJobs(params);
      
      if (response.success) {
        setJobs(response.data || []);
      } else {
        setError(response.error || '채용공고를 불러올 수 없습니다.');
      }
    } catch (err) {
      console.error('Jobs fetch error:', err);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { 
    jobs, 
    loading, 
    error, 
    refetch: fetchJobs 
  };
};
