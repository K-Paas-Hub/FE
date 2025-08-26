import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Job, JobDetailTab } from '../types/job';
import { calculateDaysUntilDeadline } from '../utils/jobUtils';
import { jobData } from '../data/jobData';

// 공통 데이터 사용
const mockJobs: Job[] = jobData;

export const useJobDetail = (jobIdFromComponent?: string) => {
  const { t } = useTranslation();
  
  // 컴포넌트에서 받은 jobId만 사용
  const targetId = jobIdFromComponent;
  
  // 기본 상태
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 새로운 상태들
  const [activeTab, setActiveTab] = useState<JobDetailTab>('detail');
  const [isScrapped, setIsScrapped] = useState(false);
  const [daysUntilDeadline, setDaysUntilDeadline] = useState(0);

  // 데이터 페칭
  const fetchJobDetail = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 실제 API 호출 대신 Mock 데이터 사용
      const jobId = parseInt(targetId || '0');
      const foundJob = mockJobs.find(job => job.id === jobId);
      
      if (foundJob) {
        setJob(foundJob);
        setIsScrapped(foundJob.isScrapped || false);
      } else {
        setError(t('jobDetail.jobNotFound'));
      }
    } catch (err) {
      setError(t('jobDetail.error'));
    } finally {
      setLoading(false);
    }
  }, [targetId, t]);

  // 마감일 계산
  const calculateDeadline = useCallback((deadline: string) => {
    const days = calculateDaysUntilDeadline(deadline);
    setDaysUntilDeadline(days);
  }, []);

  // 탭 전환
  const handleTabChange = useCallback((tab: JobDetailTab) => {
    setActiveTab(tab);
  }, []);



  // 스크랩 토글
  const handleScrapToggle = useCallback(() => {
    setIsScrapped(prev => !prev);
  }, []);

  // useEffect로 데이터 페칭 및 마감일 계산
  useEffect(() => {
    if (targetId) {
      fetchJobDetail();
    }
  }, [fetchJobDetail]);

  useEffect(() => {
    if (job?.deadline) {
      calculateDeadline(job.deadline);
    }
  }, [job, calculateDeadline]);

  // 계산된 값들
  const isDeadlineNear = useMemo(() => {
    return daysUntilDeadline <= 7 && daysUntilDeadline > 0;
  }, [daysUntilDeadline]);

  const isDeadlineExpired = useMemo(() => {
    return daysUntilDeadline < 0;
  }, [daysUntilDeadline]);

  return {
    // 기본 데이터
    job,
    loading,
    error,
    
    // UI 상태
    activeTab,
    isScrapped,
    
    // 계산된 값들
    daysUntilDeadline,
    isDeadlineNear,
    isDeadlineExpired,
    
    // 핸들러들
    handleTabChange,
    handleScrapToggle,
    
    // 데이터 재페칭
    refetch: fetchJobDetail
  };
};
