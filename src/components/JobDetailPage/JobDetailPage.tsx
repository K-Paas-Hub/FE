import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 타입 import
import { Job } from '../../types/job';

// 스타일 import
import {
  JobDetailContainer,
  JobHeader,
  CompanySection,
  JobDescription,
  RequirementsSection,
  BenefitsSection,
  ApplyButton,
  BackButton,
  LoadingSpinner,
  ErrorMessage,
  ContactSection,
} from '../../styles/components/JobDetailPage.styles';

// Mock 데이터
const mockJobs: Job[] = [
  {
    id: 1,
    company: '삼성전자 반도체',
    logo: 'S',
    logoClass: 'blue',
    title: '반도체 조립공',
    location: '경기 용인시',
    experience: '신입-경력 3년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '🏭',
    salary: 32000000,
    deadline: '2024-12-31',
    likeCount: 45,
    createdAt: '2024-12-01',
    description: '반도체 제조 공정에서 조립 및 검사 업무를 담당합니다. 정밀한 작업이 요구되며, 팀워크가 중요한 직무입니다.',
    requirements: [
      '고등학교 졸업 이상',
      '정밀한 손재주',
      '팀워크 능력',
      '기본적인 컴퓨터 활용 능력'
    ],
    benefits: [
      '4대보험 가입',
      '연차휴가',
      '식대 지원',
      '교통비 지원',
      '성과급 지급'
    ],
    contactInfo: {
      email: 'hr@samsung.com',
      phone: '031-123-4567'
    },
    companyInfo: {
      size: '대기업',
      industry: '전자/반도체',
      founded: '1969년',
      website: 'www.samsung.com'
    }
  },
  {
    id: 2,
    company: '현대자동차',
    logo: 'H',
    logoClass: 'blue',
    title: '자동차 조립공',
    location: '울산 남구',
    experience: '신입-경력 2년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '🚗',
    salary: 30000000,
    deadline: '2024-12-25',
    likeCount: 78,
    createdAt: '2024-11-28',
    description: '자동차 생산라인에서 조립 및 검수 업무를 담당합니다. 안전수칙을 철저히 지켜야 하며, 품질관리에 대한 책임감이 요구됩니다.',
    requirements: [
      '고등학교 졸업 이상',
      '안전에 대한 높은 인식',
      '체력이 좋은 분',
      '정시 출근 가능한 분'
    ],
    benefits: [
      '4대보험 가입',
      '연차휴가',
      '식대 지원',
      '교통비 지원',
      '연말상여금'
    ],
    contactInfo: {
      email: 'recruit@hyundai.com',
      phone: '052-123-4567'
    }
  }
];

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 상태 관리
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  // 데이터 페칭 (Mock 데이터 사용)
  useEffect(() => {
    const fetchJobDetail = async () => {
      if (!id) {
        setError('채용 공고 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Mock 데이터에서 해당 ID의 job 찾기
        const jobId = parseInt(id);
        const foundJob = mockJobs.find(job => job.id === jobId);
        
        if (foundJob) {
          setJob(foundJob);
          setIsLiked(foundJob.isLiked);
        } else {
          setError('채용 공고를 찾을 수 없습니다.');
        }
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  // 이벤트 핸들러
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleApplyClick = () => {
    if (!job) return;
    
    // 지원하기 로직 (실제 구현 시)
    alert('지원 기능은 준비 중입니다.');
  };

  // 로딩 상태
  if (loading) {
    return (
      <JobDetailContainer>
        <LoadingSpinner />
      </JobDetailContainer>
    );
  }

  // 에러 상태
  if (error || !job) {
    return (
      <JobDetailContainer>
        <ErrorMessage>
          <h2>오류가 발생했습니다</h2>
          <p>{error || '채용 공고를 찾을 수 없습니다.'}</p>
          <BackButton onClick={handleBackClick}>
            뒤로 가기
          </BackButton>
        </ErrorMessage>
      </JobDetailContainer>
    );
  }

  // 메인 렌더링
  return (
    <JobDetailContainer>
      {/* 헤더 섹션 */}
      <JobHeader>
        <BackButton
          onClick={handleBackClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← 뒤로 가기
        </BackButton>
        
        <ApplyButton
          onClick={handleApplyClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          지원하기
        </ApplyButton>
      </JobHeader>

      {/* 회사 정보 섹션 */}
      <CompanySection>
        <div className="company-logo">
          <span className={`logo ${job.logoClass}`}>{job.logo}</span>
        </div>
        <div className="company-info">
          <h1>{job.title}</h1>
          <h2>{job.company}</h2>
          <div className="job-meta">
            <span>📍 {job.location}</span>
            <span>💰 {job.salary.toLocaleString()}원</span>
            <span>⏰ {job.deadline}</span>
          </div>
          {job.hasVisa && (
            <div className="visa-badge">E-7 비자지원</div>
          )}
        </div>
      </CompanySection>

      {/* 직무 설명 섹션 */}
      {job.description && (
        <JobDescription>
          <h3>📋 직무 설명</h3>
          <p>{job.description}</p>
        </JobDescription>
      )}

      {/* 요구사항 섹션 */}
      {job.requirements && job.requirements.length > 0 && (
        <RequirementsSection>
          <h3>📝 요구사항</h3>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </RequirementsSection>
      )}

      {/* 혜택 섹션 */}
      {job.benefits && job.benefits.length > 0 && (
        <BenefitsSection>
          <h3>🎁 혜택</h3>
          <ul>
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </BenefitsSection>
      )}

      {/* 연락처 섹션 */}
      {job.contactInfo && (
        <ContactSection>
          <h3>📞 연락처</h3>
          <div className="contact-info">
            <p>📧 {job.contactInfo.email}</p>
            <p>📱 {job.contactInfo.phone}</p>
          </div>
        </ContactSection>
      )}
    </JobDetailContainer>
  );
};

export default JobDetailPage;
