import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import { useJobDetail } from '../../hooks/useJobDetail';
import { useJobActions } from '../../hooks/useJobActions';
import { formatSalary, formatWorkDays, formatDate } from '../../utils/jobUtils';
import {
  MainContainer,
  MainPageContent,
} from '../../styles/components/MainPage.styles';
import {
  JobDetailContainer,
  MainContent,
  Sidebar,
  JobHeader,
  DeadlineBadge,
  JobTitleSection,
  TabNavigation,
  TabButton,
  TabContent,
  JobDescription,
  RequirementsSection,
  BenefitsSection,
  SummaryCard,
  SummaryItem,
  ActionButtons,
  PrimaryActionButton,
  SecondaryActionButton,
  LoadingSpinner,
  ErrorMessage,
  WebsiteLink
} from '../../styles/components/JobDetailPage.styles';

// 마감일 표시 함수
const getDeadlineDisplay = (daysUntilDeadline: number, deadline: string): string => {
  // 상시채용인 경우
  if (deadline === '상시채용' || daysUntilDeadline === 999) {
    return '상시채용';
  }
  
  // 유효하지 않은 날짜인 경우
  if (isNaN(daysUntilDeadline) || daysUntilDeadline < 0) {
    return '상시채용';
  }
  
  // 정상적인 경우
  return `D-${daysUntilDeadline} (${formatDate(deadline)} 마감)`;
};

const JobDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  
  // 커스텀 훅 사용
  const {
    job,
    loading,
    error,
    activeTab,
    isScrapped,
    daysUntilDeadline,
    handleTabChange,
    handleScrapToggle,
  } = useJobDetail(id);

  const {
    handleScrapToggle: handleScrapAction,
    handleShareClick,
    handleHomepageApply,
  } = useJobActions(job);

  // 로딩 상태
  if (loading) {
    return (
      <MainContainer>
        <MainHeader />
        <MainPageContent>
          <JobDetailContainer>
            <LoadingSpinner>{t('jobDetail.loading')}</LoadingSpinner>
          </JobDetailContainer>
        </MainPageContent>
        <MainFooter />
      </MainContainer>
    );
  }

  // 에러 상태
  if (error || !job) {
    return (
      <MainContainer>
        <MainHeader />
        <MainPageContent>
          <JobDetailContainer>
            <ErrorMessage>
              <h2>{t('common.error')}</h2>
              <p>{error || t('jobDetail.jobNotFound')}</p>
            </ErrorMessage>
          </JobDetailContainer>
        </MainPageContent>
        <MainFooter />
      </MainContainer>
    );
  }

  // 스크랩 토글 핸들러 통합
  const handleScrapClick = async () => {
    await handleScrapAction();
    handleScrapToggle();
  };

  return (
    <MainContainer>
      <MainHeader />
      
      <MainPageContent>
        <JobDetailContainer>
          {/* 좌측 메인 콘텐츠 */}
          <MainContent>
            {/* 상단 헤더 */}
            <JobHeader>
              <JobTitleSection>
                <DeadlineBadge>
                  {getDeadlineDisplay(daysUntilDeadline, job.deadline)}
                </DeadlineBadge>
                <h1>{job.title}</h1>
                <h2>{job.company}</h2>
              </JobTitleSection>
              

            </JobHeader>

            {/* 탭 네비게이션 */}
            <TabNavigation>
              <TabButton
                active={activeTab === 'detail'}
                onClick={() => handleTabChange('detail')}
              >
                상세 정보
              </TabButton>
              <TabButton
                active={activeTab === 'company'}
                onClick={() => handleTabChange('company')}
              >
                기업 정보
              </TabButton>
            </TabNavigation>

            {/* 탭 콘텐츠 */}
            <TabContent>
              {activeTab === 'detail' ? (
                <>
                  {/* 직무 설명 */}
                  {job.description && (
                    <JobDescription>
                      <h3>주요 업무</h3>
                      <p>{job.description}</p>
                    </JobDescription>
                  )}

                  {/* 요구사항 */}
                  {job.requirements && job.requirements.length > 0 && (
                    <RequirementsSection>
                      <h3>자격 요건</h3>
                      <ul>
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </RequirementsSection>
                  )}

                  {/* 혜택 */}
                  {job.benefits && job.benefits.length > 0 && (
                    <BenefitsSection>
                      <h3>우대 사항</h3>
                      <ul>
                        {job.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </BenefitsSection>
                  )}
                </>
              ) : (
                // 기업 정보 탭
                <JobDescription>
                  <h3>기업 정보</h3>
                  {job.companyInfo ? (
                    <div>
                      <p><strong>기업 규모:</strong> {job.companyInfo.size}</p>
                      <p><strong>산업:</strong> {job.companyInfo.industry}</p>
                      <p><strong>설립:</strong> {job.companyInfo.founded}</p>
                      {job.companyInfo.website && (
                        <p>
                          <strong>웹사이트:</strong>{' '}
                          <WebsiteLink 
                            href={job.companyInfo.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {job.companyInfo.website}
                          </WebsiteLink>
                        </p>
                      )}
                    </div>
                  ) : (
                    <p>기업 정보가 없습니다.</p>
                  )}
                </JobDescription>
              )}
            </TabContent>
          </MainContent>

          {/* 우측 사이드바 */}
          <Sidebar>
            {/* 요약 정보 카드 */}
            <SummaryCard>
              <SummaryItem>
                <span className="label">계약형태</span>
                <span className="value">{job.contractType || '미정'}</span>
              </SummaryItem>
              <SummaryItem>
                <span className="label">직종</span>
                <span className="value">{job.industry}</span>
              </SummaryItem>
              <SummaryItem>
                <span className="label">근무형태</span>
                <span className="value">{job.workType || '미정'}</span>
              </SummaryItem>
              <SummaryItem>
                <span className="label">근무요일</span>
                <span className="value">{formatWorkDays(job.workDays)}</span>
              </SummaryItem>
              <SummaryItem>
                <span className="label">근무시간</span>
                <span className="value">{job.workHours || '미정'}</span>
              </SummaryItem>
              <SummaryItem>
                <span className="label">급여</span>
                <span className="value">{formatSalary(job.salary, job.salaryType)}</span>
              </SummaryItem>
              <SummaryItem>
                <span className="label">근무지</span>
                <span className="value">
                  {job.address || '미정'}
                </span>
              </SummaryItem>
            </SummaryCard>

            {/* 액션 버튼들 */}
            <ActionButtons>
              <PrimaryActionButton
                onClick={handleHomepageApply}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🌐 홈페이지 지원
              </PrimaryActionButton>
              
              <SecondaryActionButton
                onClick={handleScrapClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isScrapped ? '❤️ 스크랩됨' : '♡ 스크랩'}
              </SecondaryActionButton>
              
              <SecondaryActionButton
                onClick={handleShareClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📤 공유
              </SecondaryActionButton>
            </ActionButtons>
          </Sidebar>
        </JobDetailContainer>
      </MainPageContent>
      
      <MainFooter />
    </MainContainer>
  );
};

export default JobDetailPage;
