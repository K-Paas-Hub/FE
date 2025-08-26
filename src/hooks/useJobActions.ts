import { useCallback } from 'react';
import { Job } from '../types/job';
import { 
  copyToClipboard, 
  shareJob, 
  applyToJob, 
  toggleScrapStatus 
} from '../utils/jobUtils';

export const useJobActions = (job: Job | null) => {

  // 지원하기
  const handleApplyClick = useCallback(async () => {
    if (!job) return;
    
    try {
      const success = await applyToJob(job.id);
      if (success) {
        alert('지원이 완료되었습니다!');
        // TODO: 지원 완료 후 처리 (예: 지원 현황 페이지로 이동)
      } else {
        alert('지원에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('지원하기 실패:', err);
      alert('지원 중 오류가 발생했습니다.');
    }
  }, [job]);

  // 스크랩 토글
  const handleScrapToggle = useCallback(async () => {
    if (!job) return;
    
    try {
      const newStatus = await toggleScrapStatus(job.id, job.isScrapped || false);
      if (newStatus !== job.isScrapped) {
        // 성공적으로 상태가 변경된 경우
        console.log(`스크랩 ${newStatus ? '추가' : '제거'} 완료`);
        // TODO: 상태 업데이트 (부모 컴포넌트에서 처리)
      }
    } catch (err) {
      console.error('스크랩 토글 실패:', err);
      alert('스크랩 처리 중 오류가 발생했습니다.');
    }
  }, [job]);

  // 공유하기
  const handleShareClick = useCallback(async () => {
    if (!job) return;
    
    try {
      const success = await shareJob({
        title: job.title,
        company: job.company,
        url: window.location.href,
      });
      
      if (!success) {
        alert('공유에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('공유하기 실패:', err);
      alert('공유 중 오류가 발생했습니다.');
    }
  }, [job]);

  // 주소 복사
  const handleCopyAddress = useCallback(async () => {
    if (!job?.address) return;
    
    try {
      const success = await copyToClipboard(job.address);
      if (success) {
        alert('주소가 클립보드에 복사되었습니다!');
      } else {
        alert('주소 복사에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('주소 복사 실패:', err);
      alert('주소 복사 중 오류가 발생했습니다.');
    }
  }, [job]);

  // 홈페이지 지원 (외부 링크)
  const handleHomepageApply = useCallback(() => {
    if (!job?.companyInfo?.website) {
      alert('홈페이지 정보가 없습니다.');
      return;
    }
    
    // 새 탭에서 홈페이지 열기
    window.open(job.companyInfo.website, '_blank', 'noopener,noreferrer');
  }, [job]);

  return {
    handleApplyClick,
    handleScrapToggle,
    handleShareClick,
    handleCopyAddress,
    handleHomepageApply,
  };
};
