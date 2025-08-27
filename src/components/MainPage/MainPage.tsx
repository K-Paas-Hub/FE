import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

import {
  MainContainer,
  MainPageContent,
  SearchSection,
  SearchBar,
  MainSearchIcon,
  MainSearchInput,
  FilterContainer,
  FilterButton,
  FilterDownArrowIcon,
  DownArrowFallback,
  RefreshButton,

  FilterOverlay,
  FilterModal,
  CloseButton,
  FilterTabs,
  FilterTab,
  FilterOptions,
  FilterOption,
  AppliedFilters,
  AppliedFiltersTitle,
  AppliedFilterTags,
  AppliedFilterTag,
  RemoveButton,
  FilterActions,
  ResetButton,
  ViewResultsButton,
  JobListSection,
  SectionHeader,
  MainSectionTitle,
  SortButton,
  SortDropdown,
  SortOption,
  DownArrowIcon,
  JobGrid,
  JobCard,
  JobImage,
  JobImageContent,
  JobContent,
  JobHeader,
  CompanyInfo,
  CompanyLogo,
  CompanyDetails,
  CompanyName,
  JobTitle,
  JobTags,
  Tag,
  HeartButton,
  ChatButton,
  ChatIcon,
  ChatOverlay,
  ChatHeader,
  ChatHeaderContent,
  ChatLogo,
  ChatTitle,
  ChatTitleMain,
  ChatTitleSub,
  ChatCloseButton,
  DownIcon,
  ChatContent,
  ChatMessage,
  ChatAvatar,
  ChatBubble,
  ChatText,
  ChatTime,
  ChatOptions,
  ChatOptionButton,
  ChatInput,
  ChatInputField,
  ChatFooter,
  SearchResultsInfo,
  SearchCount,
  ClearSearchButton,
  NoResultsMessage,
  NoResultsIcon,
  NoResultsTitle,
  NoResultsText,
  SearchLoadingSpinner,
  ChatTimeInfo,
  AnimatedRefreshIcon,
  AnimatedRefreshFallback,
} from '../../styles/components/MainPage.styles';


import { jobData } from '../../data/jobData';
import { Job } from '../../types/job';

// 공통 데이터 사용
const sampleJobs = jobData;

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [jobs, setJobs] = useState(sampleJobs);
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(t('mainPage.jobList.sortOptions.latest'));
  const [isChatOpen, setIsChatOpen] = useState(false);

  // JobCard 클릭 핸들러
  const handleJobCardClick = (jobId: number) => {
    navigate(`/job/${jobId}`);
  };

  const handleImageError = (imageName: string) => {
    setImageErrors(prev => ({ ...prev, [imageName]: true }));
  };

  // 검색 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(true);
    
    // 디바운스된 검색 (300ms 지연)
    setTimeout(() => {
      applyAllFilters();
      setIsSearching(false);
    }, 300);
  };

  // 검색 초기화
  const handleClearSearch = () => {
    setSearchQuery('');
    applyAllFilters();
  };

  // 필터링 함수
  const applyFilters = useCallback((jobsToFilter: Job[]) => {
    let filteredJobs = jobsToFilter;

    // 선택된 필터가 없으면 모든 결과 반환
    if (selectedFilters.length === 0) {
      return filteredJobs;
    }

    return filteredJobs.filter(job => {
      // 지역 필터
      const regionFilters = selectedFilters.filter(filter => 
        [
          t('mainPage.filterOptions.regions.seoul'),
          t('mainPage.filterOptions.regions.gyeonggi'),
          t('mainPage.filterOptions.regions.incheon'),
          t('mainPage.filterOptions.regions.busan'),
          t('mainPage.filterOptions.regions.daejeon'),
          t('mainPage.filterOptions.regions.daegu'),
          t('mainPage.filterOptions.regions.ulsan'),
          t('mainPage.filterOptions.regions.gwangju'),
          t('mainPage.filterOptions.regions.gangwon'),
          t('mainPage.filterOptions.regions.sejong'),
          t('mainPage.filterOptions.regions.chungbuk'),
          t('mainPage.filterOptions.regions.chungnam'),
          t('mainPage.filterOptions.regions.gyeongbuk'),
          t('mainPage.filterOptions.regions.gyeongnam'),
          t('mainPage.filterOptions.regions.jeju'),
          t('mainPage.filterOptions.regions.jeonbuk'),
          t('mainPage.filterOptions.regions.jeonnam')
        ].includes(filter)
      );
      
      // 고용 형태 필터
      const typeFilters = selectedFilters.filter(filter => 
        [
          t('mainPage.filterOptions.employmentTypes.fulltime'),
          t('mainPage.filterOptions.employmentTypes.contract'),
          t('mainPage.filterOptions.employmentTypes.intern'),
          t('mainPage.filterOptions.employmentTypes.parttime'),
          t('mainPage.filterOptions.employmentTypes.freelance')
        ].includes(filter)
      );
      
      // 직종 필터
      const categoryFilters = selectedFilters.filter(filter => 
        [
          t('mainPage.filterOptions.categories.design'),
          t('mainPage.filterOptions.categories.manufacturing'),
          t('mainPage.filterOptions.categories.it'),
          t('mainPage.filterOptions.categories.management'),
          t('mainPage.filterOptions.categories.marketing'),
          t('mainPage.filterOptions.categories.education'),
          t('mainPage.filterOptions.categories.trade'),
          t('mainPage.filterOptions.categories.sales'),
          t('mainPage.filterOptions.categories.service'),
          t('mainPage.filterOptions.categories.construction'),
          t('mainPage.filterOptions.categories.entertainment'),
          t('mainPage.filterOptions.categories.translation'),
          t('mainPage.filterOptions.categories.rd'),
          t('mainPage.filterOptions.categories.other')
        ].includes(filter)
      );

      // 지역 필터 적용
      if (regionFilters.length > 0) {
        const jobRegion = getJobRegion(job.location);
        if (!regionFilters.some(filter => jobRegion.includes(filter))) {
          return false;
        }
      }

      // 고용 형태 필터 적용 (현재 데이터에 고용 형태 정보가 없으므로 임시로 true 반환)
      if (typeFilters.length > 0) {
        // 실제로는 job.employmentType과 비교해야 함
        return true;
      }

      // 직종 필터 적용
      if (categoryFilters.length > 0) {
        const jobCategory = getJobCategory(job.industry);
        if (!categoryFilters.some(filter => jobCategory.includes(filter))) {
          return false;
        }
      }

      return true;
    });
  }, [selectedFilters, t]);

  // 지역 매핑 함수
  const getJobRegion = (location: string) => {
    if (location.includes('서울')) return '서울특별시';
    if (location.includes('경기')) return '경기도';
    if (location.includes('인천')) return '인천광역시';
    if (location.includes('부산')) return '부산광역시';
    if (location.includes('대전')) return '대전광역시';
    if (location.includes('대구')) return '대구광역시';
    if (location.includes('울산')) return '울산광역시';
    if (location.includes('광주')) return '광주광역시';
    if (location.includes('강원')) return '강원특별자치도';
    if (location.includes('세종')) return '세종특별자치시';
    if (location.includes('충북')) return '충청북도';
    if (location.includes('충남')) return '충청남도';
    if (location.includes('경북')) return '경상북도';
    if (location.includes('경남')) return '경상남도';
    if (location.includes('제주')) return '제주특별자치도';
    if (location.includes('전북')) return '전라북도';
    if (location.includes('전남')) return '전라남도';
    return location;
  };

  // 직종 매핑 함수
  const getJobCategory = (industry: string) => {
    if (industry.includes('디자인')) return '디자인';
    if (industry.includes('IT') || industry.includes('개발')) return 'IT';
    if (industry.includes('마케팅') || industry.includes('광고')) return '마케팅/광고';
    if (industry.includes('경영') || industry.includes('사무')) return '경영/사무';
    if (industry.includes('교육')) return '교육';
    if (industry.includes('무역') || industry.includes('물류')) return '무역/물류';
    if (industry.includes('영업') || industry.includes('CS')) return '영업/CS';
    if (industry.includes('서비스')) return '서비스';
    if (industry.includes('건설')) return '건설';
    if (industry.includes('엔터테인먼트')) return '엔터테인먼트';
    if (industry.includes('번역')) return '번역';
    if (industry.includes('R&D')) return 'R&D';
    return '기타';
  };

  // 정렬 함수
  const applySorting = useCallback((jobsToSort: Job[]) => {
    const sortedJobs = [...jobsToSort];
    
    switch (selectedSort) {
      case t('mainPage.jobList.sortOptions.latest'):
        // 등록일 기준 내림차순 (최신 등록이 위로)
        return sortedJobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
      case t('mainPage.jobList.sortOptions.popular'):
        // 좋아요 수 기준 내림차순
        return sortedJobs.sort((a, b) => b.likeCount - a.likeCount);
        
      case t('mainPage.jobList.sortOptions.salary'):
        // 급여 기준 내림차순 (높은 급여가 위로)
        return sortedJobs.sort((a, b) => b.salary - a.salary);
        
      case t('mainPage.jobList.sortOptions.deadline'):
        // 마감일 기준 오름차순 (빠른 마감일이 위로)
        return sortedJobs.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        
      default:
        return sortedJobs;
    }
  }, [selectedSort, t]);

  // 통합 필터링 및 정렬 함수
  const applyAllFilters = useCallback(() => {
    let results = [...jobs];
    
    // 1. 검색 적용
    if (searchQuery.trim()) {
      const keywords = searchQuery.toLowerCase().split(' ').filter(k => k.trim());
      results = results.filter(job => {
        const searchableText = [
          job.company,
          job.title,
          job.location,
          job.industry
        ].join(' ').toLowerCase();
        
        return keywords.every(keyword => 
          searchableText.includes(keyword)
        );
      });
    }
    
    // 2. 필터 적용
    results = applyFilters(results);
    
    // 3. 정렬 적용
    results = applySorting(results);
    
    setFilteredJobs(results);
  }, [jobs, searchQuery, applyFilters, applySorting]);

  const handleLike = (jobId: number) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId ? { ...job, isLiked: !job.isLiked } : job
    );
    setJobs(updatedJobs);
    
    // 통합 필터링 적용
    applyAllFilters();
  };

  const handleFilterClick = (filterType: string) => {
    setActiveFilter(filterType);
    setIsFilterOpen(true);
  };

  const handleFilterSelect = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleResetFilters = () => {
    setSelectedFilters([]);
  };

  const handleViewResults = () => {
    setIsFilterOpen(false);
    setActiveFilter(null);
  };

  const handleCloseModal = () => {
    setIsFilterOpen(false);
    setActiveFilter(null);
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };

  const getFilterOptions = () => {
    switch (activeFilter) {
      case 'region':
        return [
          t('mainPage.filterOptions.regions.seoul'),
          t('mainPage.filterOptions.regions.gyeonggi'),
          t('mainPage.filterOptions.regions.incheon'),
          t('mainPage.filterOptions.regions.busan'),
          t('mainPage.filterOptions.regions.daejeon'),
          t('mainPage.filterOptions.regions.daegu'),
          t('mainPage.filterOptions.regions.ulsan'),
          t('mainPage.filterOptions.regions.gwangju'),
          t('mainPage.filterOptions.regions.gangwon'),
          t('mainPage.filterOptions.regions.sejong'),
          t('mainPage.filterOptions.regions.chungbuk'),
          t('mainPage.filterOptions.regions.chungnam'),
          t('mainPage.filterOptions.regions.gyeongbuk'),
          t('mainPage.filterOptions.regions.gyeongnam'),
          t('mainPage.filterOptions.regions.jeju'),
          t('mainPage.filterOptions.regions.jeonbuk'),
          t('mainPage.filterOptions.regions.jeonnam')
        ];
      case 'type':
        return [
          t('mainPage.filterOptions.employmentTypes.fulltime'),
          t('mainPage.filterOptions.employmentTypes.contract'),
          t('mainPage.filterOptions.employmentTypes.intern'),
          t('mainPage.filterOptions.employmentTypes.parttime'),
          t('mainPage.filterOptions.employmentTypes.freelance')
        ];
      case 'category':
        return [
          t('mainPage.filterOptions.categories.design'),
          t('mainPage.filterOptions.categories.manufacturing'),
          t('mainPage.filterOptions.categories.it'),
          t('mainPage.filterOptions.categories.management'),
          t('mainPage.filterOptions.categories.marketing'),
          t('mainPage.filterOptions.categories.education'),
          t('mainPage.filterOptions.categories.trade'),
          t('mainPage.filterOptions.categories.sales'),
          t('mainPage.filterOptions.categories.service'),
          t('mainPage.filterOptions.categories.construction'),
          t('mainPage.filterOptions.categories.entertainment'),
          t('mainPage.filterOptions.categories.translation'),
          t('mainPage.filterOptions.categories.rd'),
          t('mainPage.filterOptions.categories.other')
        ];
      default:
        return [];
    }
  };



  const handleSortClick = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleSortSelect = (sortOption: string) => {
    setSelectedSort(sortOption);
    setIsSortOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.sort-dropdown')) {
        setIsSortOpen(false);
      }
    };

    if (isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen]);

  // 상태 변경 시 자동으로 필터링 적용
  useEffect(() => {
    applyAllFilters();
  }, [searchQuery, selectedFilters, selectedSort, applyAllFilters]);

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <MainContainer>
      <MainHeader />
      
      <MainPageContent>
        <SearchSection>
          <SearchBar>
            <MainSearchIcon 
              src="/images/search.png" 
              alt="search"
              onError={() => handleImageError('search')}
            />
            <MainSearchInput 
              placeholder={t('mainPage.search.placeholder')}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <ClearSearchButton onClick={handleClearSearch}>
                {t('mainPage.search.clearButton')}
              </ClearSearchButton>
            )}
          </SearchBar>
          
          <FilterContainer>
            <FilterButton 
              $isActive={activeFilter === 'region'}
              onClick={() => handleFilterClick('region')}
            >
              {t('mainPage.filters.region')}
              <FilterDownArrowIcon 
                src="/images/down-arrow.png" 
                alt="down arrow"
                onError={() => handleImageError('down-arrow')}
              />
              <DownArrowFallback className={imageErrors['down-arrow'] ? 'show' : ''}>↓</DownArrowFallback>
            </FilterButton>
            <FilterButton 
              $isActive={activeFilter === 'type'}
              onClick={() => handleFilterClick('type')}
            >
              {t('mainPage.filters.employmentType')}
              <FilterDownArrowIcon 
                src="/images/down-arrow.png" 
                alt="down arrow"
                onError={() => handleImageError('down-arrow')}
              />
              <DownArrowFallback className={imageErrors['down-arrow'] ? 'show' : ''}>↓</DownArrowFallback>
            </FilterButton>
            <FilterButton 
              $isActive={activeFilter === 'category'}
              onClick={() => handleFilterClick('category')}
            >
              {t('mainPage.filters.category')}
              <FilterDownArrowIcon 
                src="/images/down-arrow.png" 
                alt="down arrow"
                onError={() => handleImageError('down-arrow')}
              />
              <DownArrowFallback className={imageErrors['down-arrow'] ? 'show' : ''}>↓</DownArrowFallback>
            </FilterButton>

            <RefreshButton
              onClick={() => {
                setSearchQuery('');
                setSelectedFilters([]);
                setSelectedSort(t('mainPage.jobList.sortOptions.latest'));
                const refreshIcon = document.querySelector('.refresh-icon') as HTMLElement;
                if (refreshIcon) {
                  refreshIcon.style.transform = 'rotate(360deg)';
                  setTimeout(() => {
                    if (refreshIcon) {
                      refreshIcon.style.transform = 'rotate(0deg)';
                    }
                  }, 300);
                }
              }}
              title={t('mainPage.filters.resetAll')}
            >
              <AnimatedRefreshIcon 
                src="/images/refresh.png" 
                alt="refresh"
                className="refresh-icon"
                onError={() => handleImageError('refresh')}
              />
              <AnimatedRefreshFallback 
                className={`refresh-icon ${imageErrors['refresh'] ? 'show' : ''}`}
              >
                🔄
              </AnimatedRefreshFallback>
            </RefreshButton>
          </FilterContainer>
        </SearchSection>

        {/* 검색 결과 정보 */}
        {searchQuery && (
          <SearchResultsInfo>
            <div>
              <span>"</span>
              <SearchCount>{searchQuery}</SearchCount>
              <span>" {t('mainPage.searchResults.title')} </span>
              <SearchCount>{filteredJobs.length}</SearchCount>
              <span>{t('mainPage.searchResults.count')}</span>
              {isSearching && <SearchLoadingSpinner />}
            </div>
          </SearchResultsInfo>
        )}

        <JobListSection>
          <SectionHeader>
            <MainSectionTitle>{t('mainPage.jobList.title')}</MainSectionTitle>
            <SortButton 
              onClick={handleSortClick} 
              className="sort-dropdown"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSortClick();
                }
              }}
              aria-expanded={isSortOpen}
              aria-haspopup="listbox"
              aria-label={t('mainPage.jobList.sortLabel')}
            >
              {selectedSort}
              <DownArrowIcon 
                src="/images/down-arrow.png" 
                alt="down arrow"
                className={isSortOpen ? 'rotated' : ''}
                onError={() => handleImageError('down-arrow')}
              />
              <SortDropdown $isOpen={isSortOpen}>
                <SortOption 
                  className={selectedSort === t('mainPage.jobList.sortOptions.latest') ? 'active' : ''}
                  onClick={() => handleSortSelect(t('mainPage.jobList.sortOptions.latest'))}
                >
                  {t('mainPage.jobList.sortOptions.latest')}
                </SortOption>
                <SortOption 
                  className={selectedSort === t('mainPage.jobList.sortOptions.popular') ? 'active' : ''}
                  onClick={() => handleSortSelect(t('mainPage.jobList.sortOptions.popular'))}
                >
                  {t('mainPage.jobList.sortOptions.popular')}
                </SortOption>
                <SortOption 
                  className={selectedSort === t('mainPage.jobList.sortOptions.salary') ? 'active' : ''}
                  onClick={() => handleSortSelect(t('mainPage.jobList.sortOptions.salary'))}
                >
                  {t('mainPage.jobList.sortOptions.salary')}
                </SortOption>
                <SortOption 
                  className={selectedSort === t('mainPage.jobList.sortOptions.deadline') ? 'active' : ''}
                  onClick={() => handleSortSelect(t('mainPage.jobList.sortOptions.deadline'))}
                >
                  {t('mainPage.jobList.sortOptions.deadline')}
                </SortOption>
              </SortDropdown>
            </SortButton>
          </SectionHeader>
          
                    {filteredJobs.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3,
                staggerChildren: 0.1
              }}
            >
              <JobGrid>
                {filteredJobs.map((job, index) => (
                  <JobCard
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleJobCardClick(job.id)}
                  >
                    <JobImage>
                      <JobImageContent>{job.imageContent}</JobImageContent>
                    </JobImage>
                    
                    <JobContent>
                      <JobHeader>
                        <CompanyInfo>
                          <CompanyLogo className={job.logoClass}>{job.logo}</CompanyLogo>
                          <CompanyDetails>
                            <CompanyName>{job.company}</CompanyName>
                            <JobTitle>{job.title}</JobTitle>
                          </CompanyDetails>
                        </CompanyInfo>
                        <HeartButton 
                          className={job.isLiked ? 'liked' : ''}
                          onClick={() => handleLike(job.id)}
                        >
                          ♥
                        </HeartButton>
                      </JobHeader>
                      
                                          <JobTags>
                      {job.hasVisa && <Tag className="visa">{t('mainPage.jobCard.visaSupport')}</Tag>}
                      <Tag className="location">{job.location}</Tag>
                      <Tag className="experience">{job.experience}</Tag>
                      <Tag>{job.industry}</Tag>
                    </JobTags>
                    </JobContent>
                  </JobCard>
                ))}
              </JobGrid>
            </motion.div>
          ) : searchQuery ? (
            <NoResultsMessage>
              <NoResultsIcon>🔍</NoResultsIcon>
              <NoResultsTitle>{t('mainPage.searchResults.noResults.title')}</NoResultsTitle>
              <NoResultsText>
                {t('mainPage.searchResults.noResults.subtitle')}
              </NoResultsText>
            </NoResultsMessage>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3,
                staggerChildren: 0.1
              }}
            >
              <JobGrid>
                {jobs.map((job, index) => (
                  <JobCard
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleJobCardClick(job.id)}
                  >
                  <JobImage>
                    <JobImageContent>{job.imageContent}</JobImageContent>
                  </JobImage>
                  
                  <JobContent>
                    <JobHeader>
                      <CompanyInfo>
                        <CompanyLogo className={job.logoClass}>{job.logo}</CompanyLogo>
                        <CompanyDetails>
                          <CompanyName>{job.company}</CompanyName>
                          <JobTitle>{job.title}</JobTitle>
                        </CompanyDetails>
                      </CompanyInfo>
                      <HeartButton 
                        className={job.isLiked ? 'liked' : ''}
                        onClick={() => handleLike(job.id)}
                      >
                        ♥
                      </HeartButton>
                    </JobHeader>
                    
                    <JobTags>
                      {job.hasVisa && <Tag className="visa">{t('mainPage.jobCard.visaSupport')}</Tag>}
                      <Tag className="location">{job.location}</Tag>
                      <Tag className="experience">{job.experience}</Tag>
                      <Tag>{job.industry}</Tag>
                    </JobTags>
                  </JobContent>
                </JobCard>
              ))}
            </JobGrid>
            </motion.div>
          )}
        </JobListSection>
              </MainPageContent>
      
      <ChatButton onClick={handleChatClick}>
        <ChatIcon 
          src="/images/chat.png" 
          alt="chat"
          onError={() => handleImageError('chat')}
        />
      </ChatButton>
      
      <ChatOverlay $isOpen={isChatOpen}>
        <ChatHeader>
          <ChatHeaderContent>
            <ChatLogo>F</ChatLogo>
            <ChatTitle>
              <ChatTitleMain>{t('mainPage.chat.title')}</ChatTitleMain>
              <ChatTitleSub>{t('mainPage.chat.subtitle')}</ChatTitleSub>
            </ChatTitle>
          </ChatHeaderContent>
          <ChatCloseButton onClick={handleChatClick}>
            <DownIcon 
              src="/images/down.png" 
              alt="close"
              onError={() => handleImageError('down')}
            />
          </ChatCloseButton>
        </ChatHeader>
        
        <ChatContent>
          <ChatTimeInfo>
            {t('mainPage.chat.time')}
          </ChatTimeInfo>
          
          <ChatMessage>
            <ChatAvatar>🤖</ChatAvatar>
            <div>
              <ChatBubble>
                <ChatText>
                  {t('mainPage.chat.botMessage.greeting')}<br />
                  {t('mainPage.chat.botMessage.selectType')}<br />
                  {t('mainPage.chat.botMessage.note')}
                </ChatText>
                <ChatTime>방금</ChatTime>
              </ChatBubble>
              <ChatOptions>
                <ChatOptionButton>{t('mainPage.chat.userTypes.individual')}</ChatOptionButton>
                <ChatOptionButton>{t('mainPage.chat.userTypes.corporate')}</ChatOptionButton>
              </ChatOptions>
            </div>
          </ChatMessage>
        </ChatContent>
        
        <ChatInput>
          <ChatInputField 
            placeholder={t('mainPage.chat.input.placeholder')} 
            type="text"
          />
        </ChatInput>
        
        <ChatFooter>
          {t('mainPage.chat.footer')}
        </ChatFooter>
      </ChatOverlay>
      
      <FilterOverlay $isOpen={isFilterOpen} onClick={handleCloseModal}>
        <FilterModal onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleCloseModal} aria-label={t('mainPage.filterModal.close')}>
            ×
          </CloseButton>
          <FilterTabs>
            <FilterTab 
              $isActive={activeFilter === 'region'}
              onClick={() => setActiveFilter('region')}
            >
              {t('mainPage.filters.region')}
            </FilterTab>
            <FilterTab 
              $isActive={activeFilter === 'type'}
              onClick={() => setActiveFilter('type')}
            >
              {t('mainPage.filters.employmentType')}
            </FilterTab>
            <FilterTab 
              $isActive={activeFilter === 'category'}
              onClick={() => setActiveFilter('category')}
            >
              {t('mainPage.filters.category')}
            </FilterTab>
          </FilterTabs>
          
          <FilterOptions>
            {getFilterOptions().map((option) => (
              <FilterOption
                key={option}
                $isSelected={selectedFilters.includes(option)}
                onClick={() => handleFilterSelect(option)}
              >
                {option}
              </FilterOption>
            ))}
          </FilterOptions>
          
          {selectedFilters.length > 0 && (
            <AppliedFilters>
              <AppliedFiltersTitle>{t('mainPage.filterModal.appliedFilters')}</AppliedFiltersTitle>
              <AppliedFilterTags>
                {selectedFilters.map((filter) => (
                  <AppliedFilterTag key={filter}>
                    {filter}
                    <RemoveButton onClick={() => removeFilter(filter)}>×</RemoveButton>
                  </AppliedFilterTag>
                ))}
              </AppliedFilterTags>
            </AppliedFilters>
          )}
          
          <FilterActions>
            <ResetButton onClick={handleResetFilters}>{t('mainPage.filterModal.actions.reset')}</ResetButton>
            <ViewResultsButton onClick={handleViewResults}>{t('mainPage.filterModal.actions.viewResults')}</ViewResultsButton>
          </FilterActions>
        </FilterModal>
      </FilterOverlay>
      
      <MainFooter />
    </MainContainer>
  );
};

export default MainPage;
