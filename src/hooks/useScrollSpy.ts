import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = 0) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 페이지 맨 아래에 도달했을 때 마지막 섹션을 활성화
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        const lastSection = sectionIds[sectionIds.length - 1];
        setActiveSection(lastSection);
        return;
      }

      // 각 섹션의 위치를 확인하여 현재 활성 섹션 찾기
      let currentSection = '';
      
      for (let i = 0; i < sectionIds.length; i++) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);
        
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionBottom = offsetTop + offsetHeight;
          
          // 현재 스크롤 위치가 섹션 내부에 있는지 확인
          if (scrollPosition >= offsetTop - 200 && scrollPosition < sectionBottom - 100) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 설정

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset, activeSection]);

  return activeSection;
};

export const useCountUp = (end: number, targetId: string = 'project', duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(targetId);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [targetId]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;

      const updateCount = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutExpo 함수로 부드러운 애니메이션
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(startValue + (end - startValue) * easeOutExpo);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };

      updateCount();
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, duration, delay]);

  return count;
};
