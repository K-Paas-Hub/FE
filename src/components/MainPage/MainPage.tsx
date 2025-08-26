import React, { useState, useEffect } from 'react';
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
  VisaButton,
  RefreshButton,
  RefreshIcon,
  RefreshFallback,
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
} from '../../styles/components/MainPage.styles';


// Sample job data - 외국인 노동자용 15개
const sampleJobs = [
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
    imageContent: '🔧',
    salary: 28000000,
    deadline: '2024-12-31',
    likeCount: 45,
    createdAt: '2024-12-01'
  },
  {
    id: 2,
    company: '현대자동차',
    logo: 'H',
    logoClass: 'blue',
    title: '자동차 조립공',
    location: '울산 남구',
    experience: '신입-경력 5년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '🚗',
    salary: 32000000,
    deadline: '2024-12-25',
    likeCount: 78,
    createdAt: '2024-12-05'
  },
  {
    id: 3,
    company: 'LG디스플레이',
    logo: 'L',
    logoClass: 'red',
    title: 'LCD 조립공',
    location: '경기 파주시',
    experience: '신입-경력 3년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '📺',
    salary: 26000000,
    deadline: '2024-12-20',
    likeCount: 32,
    createdAt: '2024-12-10'
  },
  {
    id: 4,
    company: '포스코',
    logo: 'P',
    logoClass: 'orange',
    title: '철강 생산직',
    location: '경북 포항시',
    experience: '신입-경력 5년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '🏭',
    salary: 35000000,
    deadline: '2024-12-15',
    likeCount: 95,
    createdAt: '2024-11-25'
  },
  {
    id: 5,
    company: '대우건설',
    logo: 'D',
    logoClass: 'blue',
    title: '건설 현장 노무자',
    location: '서울 강남구',
    experience: '신입-경력 3년',
    industry: '건설',
    isLiked: false,
    hasVisa: true,
    imageContent: '🏗️',
    salary: 30000000,
    deadline: '2024-12-28',
    likeCount: 28,
    createdAt: '2024-12-08'
  },
  {
    id: 6,
    company: 'GS건설',
    logo: 'G',
    logoClass: 'green',
    title: '건설 현장 보조원',
    location: '경기 성남시',
    experience: '신입-경력 2년',
    industry: '건설',
    isLiked: false,
    hasVisa: true,
    imageContent: '🔨',
    salary: 28000000,
    deadline: '2024-12-10',
    likeCount: 120,
    createdAt: '2024-11-20'
  },
  {
    id: 7,
    company: '농협중앙회',
    logo: 'N',
    logoClass: 'green',
    title: '농작물 수확원',
    location: '충남 논산시',
    experience: '신입-경력 2년',
    industry: '농업/어업',
    isLiked: false,
    hasVisa: true,
    imageContent: '🌾',
    salary: 22000000,
    deadline: '2024-12-22',
    likeCount: 56,
    createdAt: '2024-12-03'
  },
  {
    id: 8,
    company: '롯데마트',
    logo: 'L',
    logoClass: 'red',
    title: '상품 진열원',
    location: '서울 강남구',
    experience: '신입-경력 1년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '🛒',
    salary: 24000000,
    deadline: '2024-12-18',
    likeCount: 89,
    createdAt: '2024-11-28'
  },
  {
    id: 9,
    company: '부산항만공사',
    logo: 'P',
    logoClass: 'blue',
    title: '화물 하역원',
    location: '부산 중구',
    experience: '신입-경력 2년',
    industry: '무역/물류',
    isLiked: false,
    hasVisa: true,
    imageContent: '🚢',
    salary: 26000000,
    deadline: '2024-12-12',
    likeCount: 15,
    createdAt: '2024-12-12'
  },
  {
    id: 10,
    company: '이마트',
    logo: 'E',
    logoClass: 'green',
    title: '상품 정리원',
    location: '대구 중구',
    experience: '신입-경력 1년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '🛍️',
    salary: 22000000,
    deadline: '2024-12-30',
    likeCount: 22,
    createdAt: '2024-12-15'
  },
  {
    id: 11,
    company: '인천국제공항공사',
    logo: 'I',
    logoClass: 'blue',
    title: '공항 청소원',
    location: '인천 중구',
    experience: '신입-경력 1년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '🧹',
    salary: 20000000,
    deadline: '2024-12-08',
    likeCount: 18,
    createdAt: '2024-12-18'
  },
  {
    id: 12,
    company: '대전과학기술원',
    logo: 'K',
    logoClass: 'purple',
    title: '연구소 청소원',
    location: '대전 유성구',
    experience: '신입-경력 1년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '🧹',
    salary: 18000000,
    deadline: '2024-12-05',
    likeCount: 67,
    createdAt: '2024-11-15'
  },
  {
    id: 13,
    company: '광주과학기술원',
    logo: 'G',
    logoClass: 'green',
    title: '연구소 보안원',
    location: '광주 북구',
    experience: '신입-경력 2년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '👮',
    salary: 24000000,
    deadline: '2024-12-03',
    likeCount: 35,
    createdAt: '2024-12-20'
  },
  {
    id: 14,
    company: '포스코',
    logo: 'P',
    logoClass: 'orange',
    title: '철강 생산직',
    location: '경북 포항시',
    experience: '신입-경력 5년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '🏭',
    salary: 35000000,
    deadline: '2024-12-01',
    likeCount: 42,
    createdAt: '2024-11-10'
  },
  {
    id: 15,
    company: '제주항공',
    logo: 'J',
    logoClass: 'blue',
    title: '항공기 청소원',
    location: '제주 제주시',
    experience: '신입-경력 1년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '✈️',
    salary: 20000000,
    deadline: '2024-12-27',
    likeCount: 12,
    createdAt: '2024-12-22'
  }
];

const MainPage: React.FC = () => {
  const [jobs, setJobs] = useState(sampleJobs);
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [isChatOpen, setIsChatOpen] = useState(false);

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
  const applyFilters = (jobsToFilter: any[]) => {
    let filteredJobs = jobsToFilter;

    // 선택된 필터가 없으면 모든 결과 반환
    if (selectedFilters.length === 0) {
      return filteredJobs;
    }

    return filteredJobs.filter(job => {
      // 지역 필터
      const regionFilters = selectedFilters.filter(filter => 
        ['서울특별시', '경기도', '인천광역시', '부산광역시', '대전광역시', '대구광역시', '울산광역시', '광주광역시', '강원특별자치도', '세종특별자치시', '충청북도', '충청남도', '경상북도', '경상남도', '제주특별자치도', '전라북도', '전라남도'].includes(filter)
      );
      
      // 고용 형태 필터
      const typeFilters = selectedFilters.filter(filter => 
        ['정규직', '계약직', '인턴', '아르바이트', '프리랜서'].includes(filter)
      );
      
      // 직종 필터
      const categoryFilters = selectedFilters.filter(filter => 
        ['디자인', '생산/제조', 'IT', '경영/사무', '마케팅/광고', '교육', '무역/물류', '영업/CS', '서비스', '건설', '엔터테인먼트', '번역', 'R&D', '기타'].includes(filter)
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
  };

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
  const applySorting = (jobsToSort: any[]) => {
    const sortedJobs = [...jobsToSort];
    
    switch (selectedSort) {
      case '최신순':
        // 등록일 기준 내림차순 (최신 등록이 위로)
        return sortedJobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
      case '인기순':
        // 좋아요 수 기준 내림차순
        return sortedJobs.sort((a, b) => b.likeCount - a.likeCount);
        
      case '급여순':
        // 급여 기준 내림차순 (높은 급여가 위로)
        return sortedJobs.sort((a, b) => b.salary - a.salary);
        
      case '마감임박순':
        // 마감일 기준 오름차순 (빠른 마감일이 위로)
        return sortedJobs.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        
      default:
        return sortedJobs;
    }
  };

  // 통합 필터링 및 정렬 함수
  const applyAllFilters = () => {
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
  };

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
        return ['서울특별시', '경기도', '인천광역시', '부산광역시', '대전광역시', '대구광역시', '울산광역시', '광주광역시', '강원특별자치도', '세종특별자치시', '충청북도', '충청남도', '경상북도', '경상남도', '제주특별자치도', '전라북도', '전라남도'];
      case 'type':
        return ['정규직', '계약직', '인턴', '아르바이트', '프리랜서'];
      case 'category':
        return ['디자인', '생산/제조', 'IT', '경영/사무', '마케팅/광고', '교육', '무역/물류', '영업/CS', '서비스', '건설', '엔터테인먼트', '번역', 'R&D', '기타'];
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
  }, [searchQuery, selectedFilters, selectedSort]);

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
              placeholder="직무명, 직무 관련 키워드를 검색해 보세요."
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <ClearSearchButton onClick={handleClearSearch}>
                ✕
              </ClearSearchButton>
            )}
          </SearchBar>
          
          <FilterContainer>
            <FilterButton 
              $isActive={activeFilter === 'region'}
              onClick={() => handleFilterClick('region')}
            >
              지역
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
              고용 형태
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
              직종
              <FilterDownArrowIcon 
                src="/images/down-arrow.png" 
                alt="down arrow"
                onError={() => handleImageError('down-arrow')}
              />
              <DownArrowFallback className={imageErrors['down-arrow'] ? 'show' : ''}>↓</DownArrowFallback>
            </FilterButton>

            <RefreshButton
              onClick={() => {
                // 모든 필터 초기화 (useEffect가 자동으로 필터링 적용)
                setSearchQuery('');
                setSelectedFilters([]);
                setSelectedSort('최신순');
                
                // CSS 애니메이션으로 아이콘 회전
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
              style={{ cursor: 'pointer' }}
              title="모든 필터 초기화"
            >
              <RefreshIcon 
                src="/images/refresh.png" 
                alt="refresh"
                className="refresh-icon"
                style={{ 
                  transition: 'transform 0.5s ease-in-out',
                  transform: 'rotate(0deg)'
                }}
                onError={() => handleImageError('refresh')}
              />
              <RefreshFallback 
                className={`refresh-icon ${imageErrors['refresh'] ? 'show' : ''}`}
                style={{ 
                  transition: 'transform 0.5s ease-in-out',
                  transform: 'rotate(0deg)'
                }}
              >
                🔄
              </RefreshFallback>
            </RefreshButton>
          </FilterContainer>
        </SearchSection>

        {/* 검색 결과 정보 */}
        {searchQuery && (
          <SearchResultsInfo>
            <div>
              <span>"</span>
              <SearchCount>{searchQuery}</SearchCount>
              <span>" 검색 결과 </span>
              <SearchCount>{filteredJobs.length}</SearchCount>
              <span>건</span>
              {isSearching && <SearchLoadingSpinner />}
            </div>
          </SearchResultsInfo>
        )}

        <JobListSection>
          <SectionHeader>
            <MainSectionTitle>채용 공고</MainSectionTitle>
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
              aria-label="정렬 옵션 선택"
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
                  className={selectedSort === '최신순' ? 'active' : ''}
                  onClick={() => handleSortSelect('최신순')}
                >
                  최신순
                </SortOption>
                <SortOption 
                  className={selectedSort === '인기순' ? 'active' : ''}
                  onClick={() => handleSortSelect('인기순')}
                >
                  인기순
                </SortOption>
                <SortOption 
                  className={selectedSort === '급여순' ? 'active' : ''}
                  onClick={() => handleSortSelect('급여순')}
                >
                  급여순
                </SortOption>
                <SortOption 
                  className={selectedSort === '마감임박순' ? 'active' : ''}
                  onClick={() => handleSortSelect('마감임박순')}
                >
                  마감임박순
                </SortOption>
              </SortDropdown>
            </SortButton>
          </SectionHeader>
          
                    {filteredJobs.length > 0 ? (
            <JobGrid>
              {filteredJobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                      {job.hasVisa && <Tag className="visa">E-7 비자지원</Tag>}
                      <Tag className="location">{job.location}</Tag>
                      <Tag className="experience">{job.experience}</Tag>
                      <Tag>{job.industry}</Tag>
                    </JobTags>
                  </JobContent>
                </JobCard>
              ))}
            </JobGrid>
          ) : searchQuery ? (
            <NoResultsMessage>
              <NoResultsIcon>🔍</NoResultsIcon>
              <NoResultsTitle>검색 결과가 없습니다</NoResultsTitle>
              <NoResultsText>
                다른 키워드로 검색해보세요
              </NoResultsText>
            </NoResultsMessage>
          ) : (
            <JobGrid>
              {jobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                      {job.hasVisa && <Tag className="visa">E-7 비자지원</Tag>}
                      <Tag className="location">{job.location}</Tag>
                      <Tag className="experience">{job.experience}</Tag>
                      <Tag>{job.industry}</Tag>
                    </JobTags>
                  </JobContent>
                </JobCard>
              ))}
            </JobGrid>
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
              <ChatTitleMain>FairWork 챗봇과 대화하기</ChatTitleMain>
              <ChatTitleSub>챗봇을 통해 문의를 해결해보세요!</ChatTitleSub>
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
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
            오후 6:14
          </div>
          
          <ChatMessage>
            <ChatAvatar>🤖</ChatAvatar>
            <div>
              <ChatBubble>
                <ChatText>
                  안녕하세요. FairWork BOT 입니다.<br />
                  회원 유형을 선택해 주세요.<br />
                  (*본 챗봇은 상담원과의 실시간 채팅 서비스는 운영하지 않습니다.)
                </ChatText>
                <ChatTime>방금</ChatTime>
              </ChatBubble>
              <ChatOptions>
                <ChatOptionButton>개인회원</ChatOptionButton>
                <ChatOptionButton>기업회원</ChatOptionButton>
              </ChatOptions>
            </div>
          </ChatMessage>
        </ChatContent>
        
        <ChatInput>
          <ChatInputField 
            placeholder="메시지 입력" 
            type="text"
          />
        </ChatInput>
        
        <ChatFooter>
          Zendesk 로 구축
        </ChatFooter>
      </ChatOverlay>
      
      <FilterOverlay $isOpen={isFilterOpen} onClick={handleCloseModal}>
        <FilterModal onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleCloseModal} aria-label="필터 모달 닫기">
            ×
          </CloseButton>
          <FilterTabs>
            <FilterTab 
              $isActive={activeFilter === 'region'}
              onClick={() => setActiveFilter('region')}
            >
              지역
            </FilterTab>
            <FilterTab 
              $isActive={activeFilter === 'type'}
              onClick={() => setActiveFilter('type')}
            >
              고용 형태
            </FilterTab>
            <FilterTab 
              $isActive={activeFilter === 'category'}
              onClick={() => setActiveFilter('category')}
            >
              직종
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
              <AppliedFiltersTitle>적용 필터</AppliedFiltersTitle>
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
            <ResetButton onClick={handleResetFilters}>초기화</ResetButton>
            <ViewResultsButton onClick={handleViewResults}>결과 보기</ViewResultsButton>
          </FilterActions>
        </FilterModal>
      </FilterOverlay>
      
      <MainFooter />
    </MainContainer>
  );
};

export default MainPage;
