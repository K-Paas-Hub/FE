/**
 * JobDetailPage 관련 유틸리티 함수들
 */

/**
 * 마감일까지 남은 일수를 계산
 */
export const calculateDaysUntilDeadline = (deadline: string): number => {
  // 상시채용인 경우 특별 처리
  if (deadline === '상시채용' || !deadline || deadline.trim() === '') {
    return 999; // 상시채용은 매우 큰 값으로 설정
  }
  
  // 유효하지 않은 값들 처리
  const invalidValues = ['N/A', '마감', 'Invalid Date', 'null', 'undefined', '-', '--'];
  if (invalidValues.includes(deadline.trim())) {
    return 999; // 상시채용과 동일하게 처리
  }
  
  const today = new Date();
  const deadlineDate = new Date(deadline);
  
  // 유효하지 않은 날짜인 경우
  if (isNaN(deadlineDate.getTime())) {
    return 999; // 상시채용과 동일하게 처리
  }
  
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays); // 음수 방지
};

/**
 * 주소를 클립보드에 복사
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 폴백 방법 (구형 브라우저 지원)
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to copy to clipboard:', err);
    }
    return false;
  }
};

/**
 * 공유 기능 (Web Share API 또는 폴백)
 */
export const shareJob = async (jobData: {
  title: string;
  company: string;
  url: string;
}): Promise<boolean> => {
  const shareData = {
    title: `${jobData.title} - ${jobData.company}`,
    text: `${jobData.company}에서 ${jobData.title} 포지션을 모집합니다.`,
    url: jobData.url,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return true;
    } else {
      // 폴백: URL 복사
      const success = await copyToClipboard(jobData.url);
      if (success) {
        alert('채용공고 링크가 클립보드에 복사되었습니다.');
      }
      return success;
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to share job:', err);
    }
    return false;
  }
};

/**
 * 급여 포맷팅
 */
export const formatSalary = (salary: number, salaryType?: string): string => {
  if (salaryType === '면접 후 결정') {
    return '면접 후 결정';
  }
  
  if (salary >= 10000) {
    return `${(salary / 10000).toLocaleString()}만원`;
  }
  
  return `${salary.toLocaleString()}원`;
};

/**
 * 근무 요일 포맷팅
 */
export const formatWorkDays = (workDays?: string[]): string => {
  if (!workDays || workDays.length === 0) {
    return '미정';
  }
  
  return workDays.join(', ');
};

/**
 * 날짜 포맷팅
 */
export const formatDate = (dateString: string): string => {
  // 상시채용인 경우
  if (dateString === '상시채용' || !dateString || dateString.trim() === '') {
    return '상시채용';
  }
  
  // 유효하지 않은 값들 처리
  const invalidValues = ['N/A', '마감', 'Invalid Date', 'null', 'undefined', '-', '--'];
  if (invalidValues.includes(dateString.trim())) {
    return '상시채용';
  }
  
  const date = new Date(dateString);
  
  // 유효하지 않은 날짜인 경우
  if (isNaN(date.getTime())) {
    return '상시채용';
  }
  
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * 스크랩 상태 토글
 */
export const toggleScrapStatus = async (jobId: number, currentStatus: boolean): Promise<boolean> => {
  try {
    // TODO: 실제 API 호출로 대체
    // const response = await scrapService.toggleScrap(jobId);
    // return response.success;
    
    // Mock 응답
    await new Promise(resolve => setTimeout(resolve, 500));
    return !currentStatus;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to toggle scrap status:', err);
    }
    return currentStatus;
  }
};

/**
 * 지원하기 기능
 */
export const applyToJob = async (jobId: number): Promise<boolean> => {
  try {
    // TODO: 실제 API 호출로 대체
    // const response = await jobService.apply(jobId);
    // return response.success;
    
    // Mock 응답
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to apply to job:', err);
    }
    return false;
  }
};
