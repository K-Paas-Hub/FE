import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import CommunityBanner from '../CommunityBanner';

const MainContainer = styled.div`
  min-height: 100vh;
  background: white;
`;



const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SearchSection = styled.section`
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  background: white;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &:focus-within {
    border-color: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
  color: white;
  
  &:not([src]), &[src=""], &[src*="error"] {
    display: none;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #333;
  
  &::placeholder {
    color: #999;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const FilterButton = styled.button<{ $isActive?: boolean }>`
  background: white;
  color: #333;
  border: 1px solid #e5e5e5;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  
  &:hover {
    border-color: ${COLORS.primary};
    color: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
`;

const FilterDownArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  
  &:not([src]), &[src=""], &[src*="error"] {
    display: none;
  }
`;

const DownArrowFallback = styled.span`
  font-size: 12px;
  color: #666;
  display: ${props => props.className?.includes('show') ? 'inline' : 'none'};
`;

const VisaButton = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: #4ade80;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
`;

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const RefreshIcon = styled.img`
  width: 16px;
  height: 16px;
  
  &:not([src]), &[src=""], &[src*="error"] {
    display: none;
  }
`;

const RefreshFallback = styled.span`
  font-size: 16px;
  color: #666;
  display: ${props => props.className?.includes('show') ? 'inline' : 'none'};
`;

const FilterOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
`;

const FilterModal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 95%;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 1rem;
`;

const FilterTab = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isActive ? COLORS.primary : 'transparent'};
  color: ${props => props.$isActive ? 'white' : '#666'};
  
  &:hover {
    background: ${props => props.$isActive ? COLORS.primary : '#f8f9fa'};
  }
`;

const FilterOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const FilterOption = styled.button<{ $isSelected: boolean }>`
  background: ${props => props.$isSelected ? COLORS.primary : '#f8f9fa'};
  color: ${props => props.$isSelected ? 'white' : '#333'};
  border: 1px solid ${props => props.$isSelected ? COLORS.primary : '#e5e5e5'};
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$isSelected ? COLORS.primary : '#e9ecef'};
  }
`;

const AppliedFilters = styled.div`
  margin-bottom: 2rem;
`;

const AppliedFiltersTitle = styled.div`
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const AppliedFilterTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const AppliedFilterTag = styled.div`
  background: ${COLORS.primary};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ResetButton = styled.button`
  background: none;
  border: 1px solid #e5e5e5;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${COLORS.primary};
    color: ${COLORS.primary};
  }
`;

const ViewResultsButton = styled.button`
  background: #1e293b;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #334155;
  }
`;

const JobListSection = styled.section`
  margin-top: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SortButton = styled.div`
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  user-select: none;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;

const SortDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 120px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  margin-top: 0.5rem;
`;

const SortOption = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
  transition: background 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
  
  &.active {
    background: #ecfdf5;
    color: ${COLORS.primary};
    font-weight: 600;
  }
`;

const DownArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  transition: transform 0.3s ease;
  transform: ${props => props.className?.includes('rotated') ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const JobCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    border-color: ${COLORS.primary};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }
  
  @media (max-width: 768px) {
    border-radius: 12px;
  }
`;

const JobImage = styled.div`
  width: 100%;
  height: 210px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 160px;
  }
`;

const JobImageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #9ca3af;
  font-weight: 700;
`;

const BonusBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #059669, #10b981);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.3);
  
  @media (max-width: 768px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }
`;

const JobContent = styled.div`
  padding: 1.2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CompanyInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex: 1;
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${COLORS.primary};
  flex-shrink: 0;
  
  &.red {
    background: #fee2e2;
    color: #dc2626;
  }
  
  &.blue {
    background: #dbeafe;
    color: #2563eb;
  }
  
  &.green {
    background: #dcfce7;
    color: #059669;
  }
  
  &.purple {
    background: #f3e8ff;
    color: #7c3aed;
  }
`;

const CompanyDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const CompanyName = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.3rem;
  font-weight: 500;
`;

const JobTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const JobTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: #f3f4f6;
  color: #374151;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  
  &.visa {
    background: ${COLORS.primary};
    color: white;
  }
  
  &.location {
    background: #dbeafe;
    color: #1e40af;
  }
  
  &.experience {
    background: #fef3c7;
    color: #92400e;
  }
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.5rem;
  border-radius: 4px;
  
  &.liked {
    color: #ff4757;
  }
  
  &:hover {
    color: #ff4757;
    background: #f8f9fa;
  }
`;



const ChatButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: ${COLORS.primary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    background: #10b981;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
  }
  
  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 50px;
    height: 50px;
  }
`;

const ChatIcon = styled.img`
  width: 24px;
  height: 24px;
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const ChatOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  transform: translateY(${props => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const ChatHeader = styled.div`
  background: ${COLORS.primary};
  color: white;
  padding: 1rem;
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

const ChatHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const ChatLogo = styled.div`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: ${COLORS.primary};
  font-size: 0.9rem;
`;

const ChatTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatTitleMain = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

const ChatTitleSub = styled.div`
  font-size: 0.7rem;
  opacity: 0.8;
`;

const ChatCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const ChatContent = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #f8f9fa;
`;

const ChatMessage = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const ChatAvatar = styled.div`
  width: 36px;
  height: 36px;
  background: #fbbf24;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const ChatBubble = styled.div`
  background: white;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  max-width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ChatText = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;
`;

const ChatTime = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-top: 0.3rem;
`;

const ChatOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.8rem;
`;

const ChatOptionButton = styled.button`
  background: white;
  border: 1px solid ${COLORS.primary};
  color: ${COLORS.primary};
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${COLORS.primary};
    color: white;
  }
`;

const ChatInput = styled.div`
  padding: 1rem;
  border-top: 1px solid #e5e5e5;
  background: white;
`;

const ChatInputField = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  
  &:focus {
    border-color: ${COLORS.primary};
  }
`;

const ChatFooter = styled.div`
  text-align: center;
  padding: 0.5rem;
  font-size: 0.7rem;
  color: #666;
  border-top: 1px solid #e5e5e5;
`;

// 검색 관련 스타일 컴포넌트
const SearchResultsInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchCount = styled.span`
  font-weight: 500;
  color: ${COLORS.primary};
`;

const ClearSearchButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f5f5f5;
    color: #666;
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
`;

const NoResultsIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const NoResultsTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const NoResultsText = styled.p`
  font-size: 0.9rem;
  color: #999;
`;

const SearchLoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid ${COLORS.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 0.5rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Sample job data
const sampleJobs = [
  {
    id: 1,
    company: '포스타입',
    logo: 'P',
    logoClass: 'purple',
    title: '백엔드 엔지니어',
    location: '서울 강남구',
    experience: '신입-경력 5년',
    industry: 'IT/개발',
    isLiked: false,
    hasVisa: true,
    imageContent: '📱'
  },
  {
    id: 2,
    company: '두나무(업비트)',
    logo: 'D',
    logoClass: 'blue',
    title: 'Product Designer_스테이킹 서비스 및 블록체인 기반 신규 서비스 디자인',
    location: '서울 서초구',
    experience: '경력 3-7년',
    industry: '디자인',
    isLiked: false,
    hasVisa: false,
    imageContent: '📈'
  },
  {
    id: 3,
    company: '놀유니버스',
    logo: 'N',
    logoClass: 'green',
    title: 'Software Engineer, Frontend - 엔터FE',
    location: '경기 성남시',
    experience: '경력 2년 이상',
    industry: 'IT/개발',
    isLiked: false,
    hasVisa: false,
    imageContent: '🏢'
  },
  {
    id: 4,
    company: '더블유컨셉코리아',
    logo: 'W',
    logoClass: 'red',
    title: 'UI/UX 디자이너',
    location: '서울 영등포구',
    experience: '경력 3-7년',
    industry: '디자인',
    isLiked: false,
    hasVisa: false,
    imageContent: '🛍️'
  },
  {
    id: 5,
    company: '타다(VCNC)',
    logo: 'T',
    logoClass: 'green',
    title: '콘텐츠 디자이너',
    location: '서울 성동구',
    experience: '경력 2-7년',
    industry: '디자인',
    isLiked: false,
    hasVisa: false,
    imageContent: '🚗'
  },
  {
    id: 6,
    company: '쿠팡',
    logo: 'C',
    logoClass: 'red',
    title: '[쿠팡] 컨텐츠 에디터',
    location: '서울 송파구',
    experience: '경력 3-10년',
    industry: '마케팅/광고',
    isLiked: false,
    hasVisa: false,
    imageContent: '🛒'
  },
  {
    id: 7,
    company: '카카오픽코마',
    logo: 'K',
    logoClass: 'yellow',
    title: '프론트엔드 개발자',
    location: '경기 성남시',
    experience: '경력 3년 이상',
    industry: 'IT/개발',
    isLiked: false,
    hasVisa: false,
    imageContent: '📚'
  },
  {
    id: 8,
    company: '뤼튼테크놀로지스',
    logo: 'R',
    logoClass: 'blue',
    title: 'UX/UI Designer (3년 이상)',
    location: '서울 서초구',
    experience: '경력 3년 이상',
    industry: '디자인',
    isLiked: false,
    hasVisa: false,
    imageContent: '💻'
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

  // 검색 함수
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredJobs(jobs);
      return;
    }
    
    const keywords = query.toLowerCase().split(' ').filter(k => k.trim());
    
    const results = jobs.filter(job => {
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
    
    setFilteredJobs(results);
  };

  // 검색 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(true);
    
    // 디바운스된 검색 (300ms 지연)
    setTimeout(() => {
      performSearch(query);
      setIsSearching(false);
    }, 300);
  };

  // 검색 초기화
  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredJobs(jobs);
  };

  const handleLike = (jobId: number) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId ? { ...job, isLiked: !job.isLiked } : job
    );
    setJobs(updatedJobs);
    
    // 검색 결과도 업데이트
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    } else {
      setFilteredJobs(updatedJobs);
    }
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

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <MainContainer>
      <CommunityBanner />
      <MainHeader />
      
      <MainContent>
        <SearchSection>
          <SearchBar>
            <SearchIcon 
              src="/images/search.png" 
              alt="search"
              onError={() => handleImageError('search')}
            />
            <SearchInput 
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
            <VisaButton>
              E-7 비자지원
            </VisaButton>
            <RefreshButton>
              <RefreshIcon 
                src="/images/refresh.png" 
                alt="refresh"
                onError={() => handleImageError('refresh')}
              />
              <RefreshFallback className={imageErrors['refresh'] ? 'show' : ''}>🔄</RefreshFallback>
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
            <SectionTitle>채용 공고</SectionTitle>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <JobImage>
                    <JobImageContent>{job.imageContent}</JobImageContent>
                    <BonusBadge>합격보상금 100만원</BonusBadge>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <JobImage>
                    <JobImageContent>{job.imageContent}</JobImageContent>
                    <BonusBadge>합격보상금 100만원</BonusBadge>
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
      </MainContent>
      
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
      
      <FilterOverlay $isOpen={isFilterOpen}>
        <FilterModal>
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
