import { useEffect, useRef } from 'react';
import { ResumeFormData } from '../types/resume';
import { RESUME_CONSTANTS } from '../constants';

export const useAutoSave = (
  data: ResumeFormData,
  saveFunction: () => Promise<void>,
  enabled: boolean = true
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedData = useRef<string>('');

  useEffect(() => {
    if (!enabled) return;

    const currentData = JSON.stringify(data);
    if (currentData === lastSavedData.current) return;

    // 이전 타이머 클리어
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 새로운 타이머 설정
    timeoutRef.current = setTimeout(async () => {
      try {
        await saveFunction();
        lastSavedData.current = currentData;
      } catch (error) {
        console.error('자동 저장 실패:', error);
      }
    }, RESUME_CONSTANTS.autoSaveInterval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, saveFunction, enabled]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};
