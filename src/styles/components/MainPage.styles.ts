import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../theme/theme';

// Main Container
export const MainContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

export const MainPageContent = styled.main`
  max-width: ${theme.containers.wide};
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

// Search Section
export const SearchSection = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

export const SearchBar = styled.div`
  background: white;
  border: 2px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  
  &:focus-within {
    border-color: ${theme.colors.primary};
  }
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.sm};
  }
`;

export const MainSearchIcon = styled.img`
  width: 20px;
  height: 20px;
  color: white;
  
  &:not([src]), &[src=""], &[src*="error"] {
    display: none;
  }
`;

export const MainSearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textPrimary};
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

// Filter Section
export const FilterContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;
  
  ${theme.media.tablet} {
    gap: 0.5rem;
  }
`;

export const FilterButton = styled.button<{ $isActive?: boolean }>`
  background: white;
  color: ${theme.colors.textPrimary};
  border: 1px solid ${theme.colors.borderLight};
  padding: 0.8rem 1.2rem;
  border-radius: ${theme.radius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${theme.typography.fontSize.sm};
  
  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
  
  ${theme.media.tablet} {
    padding: 0.6rem 1rem;
    font-size: ${theme.typography.fontSize.xs};
  }
`;

export const FilterDownArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  
  &:not([src]), &[src=""], &[src*="error"] {
    display: none;
  }
`;

export const DownArrowFallback = styled.span`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  display: ${props => props.className?.includes('show') ? 'inline' : 'none'};
`;

export const VisaButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: ${theme.radius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  font-size: ${theme.typography.fontSize.sm};
  
  &:hover {
    background: ${theme.colors.primaryHover};
  }
  
  ${theme.media.tablet} {
    padding: 0.6rem 1rem;
    font-size: ${theme.typography.fontSize.xs};
  }
`;

export const RefreshButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${theme.colors.backgroundGray};
  }
`;

export const RefreshIcon = styled.img`
  width: 16px;
  height: 16px;
  
  &:not([src]), &[src=""], &[src*="error"] {
    display: none;
  }
`;

export const RefreshFallback = styled.span`
  font-size: 16px;
  color: ${theme.colors.textSecondary};
  display: ${props => props.className?.includes('show') ? 'inline' : 'none'};
`;

// Filter Modal
export const FilterOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.modal.overlay};
  z-index: ${theme.zIndex.modalBackdrop};
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
`;

export const FilterModal = styled.div`
  background: white;
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.xl};
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
    width: 95%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: none;
  border: none;
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${theme.radius.full};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${theme.colors.backgroundGray};
    color: ${theme.colors.textPrimary};
  }
  
  ${theme.media.tablet} {
    top: 0.5rem;
    right: 0.5rem;
    width: 35px;
    height: 35px;
    font-size: ${theme.typography.fontSize.lg};
  }
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.borderLight};
  padding-bottom: ${theme.spacing.lg};
`;

export const FilterTab = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: ${theme.radius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  background: ${props => props.$isActive ? theme.colors.primary : 'transparent'};
  color: ${props => props.$isActive ? 'white' : theme.colors.textSecondary};
  
  &:hover {
    background: ${props => props.$isActive ? theme.colors.primary : theme.colors.backgroundGray};
  }
`;

export const FilterOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.8rem;
  margin-bottom: ${theme.spacing.xl};
`;

export const FilterOption = styled.button<{ $isSelected: boolean }>`
  background: ${props => props.$isSelected ? theme.colors.primary : theme.colors.backgroundGray};
  color: ${props => props.$isSelected ? 'white' : theme.colors.textPrimary};
  border: 1px solid ${props => props.$isSelected ? theme.colors.primary : theme.colors.borderLight};
  padding: 0.8rem;
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: ${props => props.$isSelected ? theme.colors.primary : theme.colors.backgroundGray};
  }
`;

export const AppliedFilters = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

export const AppliedFiltersTitle = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.textPrimary};
`;

export const AppliedFilterTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const AppliedFilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${theme.radius.full};
  font-size: ${theme.typography.fontSize.sm};
  
  ${theme.media.tablet} {
    padding: 0.4rem 0.8rem;
    font-size: ${theme.typography.fontSize.xs};
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    opacity: 0.8;
  }
`;

// 채팅 시간 정보
export const ChatTimeInfo = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 1rem;
`;

export const FilterActions = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: flex-end;
`;

export const ResetButton = styled.button`
  background: none;
  border: 1px solid ${theme.colors.borderLight};
  padding: 0.8rem 1.5rem;
  border-radius: ${theme.radius.md};
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const ViewResultsButton = styled.button`
  background: #1e293b;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: ${theme.radius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: #334155;
  }
`;

// Job List Section
export const JobListSection = styled.section`
  margin-top: ${theme.spacing.xl};
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  ${theme.media.tablet} {
    flex-direction: column;
    gap: ${theme.spacing.lg};
    align-items: flex-start;
  }
`;

export const MainSectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

export const SortButton = styled.div`
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  user-select: none;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const SortDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadows.lg};
  z-index: ${theme.zIndex.dropdown};
  min-width: 120px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  margin-top: 0.5rem;
`;

export const SortOption = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textPrimary};
  transition: background ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: ${theme.colors.backgroundGray};
  }
  
  &:first-child {
    border-radius: ${theme.radius.md} ${theme.radius.md} 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 ${theme.radius.md} ${theme.radius.md};
  }
  
  &.active {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
    font-weight: ${theme.typography.fontWeight.semibold};
  }
`;

export const DownArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  transition: transform ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  transform: ${props => props.className?.includes('rotated') ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

// Job Grid
export const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};
  
  ${theme.media.wide} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${theme.media.tablet} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

export const JobCard = styled(motion.div)`
  background: white;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.xl};
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  position: relative;
  
  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.lg};
    transform: translateY(-4px);
  }
  
  ${theme.media.tablet} {
    border-radius: ${theme.radius.lg};
  }
`;

export const JobImage = styled.div`
  width: 100%;
  height: 210px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  position: relative;
  overflow: hidden;
  
  ${theme.media.tablet} {
    height: 160px;
  }
`;

export const JobImageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.textMuted};
  font-weight: ${theme.typography.fontWeight.bold};
`;

export const JobContent = styled.div`
  padding: 1.2rem;
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

export const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.lg};
`;

export const CompanyInfo = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: flex-start;
  flex: 1;
`;

export const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  background: ${theme.colors.backgroundGray};
  border-radius: ${theme.radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
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
    color: ${theme.colors.primaryDark};
  }
  
  &.purple {
    background: #f3e8ff;
    color: #7c3aed;
  }
`;

export const CompanyDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CompanyName = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin-bottom: 0.3rem;
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const JobTitle = styled.h3`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  line-height: ${theme.typography.lineHeight.tight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const JobTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: ${theme.spacing.lg};
`;

export const Tag = styled.span`
  background: ${theme.colors.backgroundGray};
  color: ${theme.colors.textPrimary};
  padding: 0.3rem 0.6rem;
  border-radius: ${theme.radius.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  
  &.visa {
    background: ${theme.colors.primary};
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

export const HeartButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.typography.fontSize.lg};
  color: #ccc;
  cursor: pointer;
  transition: color ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  padding: 0.5rem;
  border-radius: ${theme.radius.sm};
  
  &.liked {
    color: #ff4757;
  }
  
  &:hover {
    color: #ff4757;
    background: ${theme.colors.backgroundGray};
  }
`;

// Search Results
export const SearchResultsInfo = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.lg};
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchCount = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.primary};
`;

export const ClearSearchButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textMuted};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${theme.radius.full};
  font-size: ${theme.typography.fontSize.base};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: #f5f5f5;
    color: ${theme.colors.textSecondary};
  }
`;

export const NoResultsMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
`;

export const NoResultsIcon = styled.div`
  font-size: ${theme.typography.fontSize['5xl']};
  margin-bottom: ${theme.spacing.lg};
`;

export const NoResultsTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: 0.5rem;
  color: ${theme.colors.textPrimary};
`;

export const NoResultsText = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textMuted};
`;

export const SearchLoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid ${theme.colors.primary};
  border-radius: ${theme.radius.full};
  animation: spin 1s linear infinite;
  margin-left: 0.5rem;
  
  ${theme.animations.spin}
`;

// Chat Components
export const ChatButton = styled.button`
  position: fixed;
  bottom: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  width: 60px;
  height: 60px;
  background: ${theme.colors.primary};
  border: none;
  border-radius: ${theme.radius.full};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.lg};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  z-index: ${theme.zIndex.fixed};
  
  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
  
  ${theme.media.tablet} {
    bottom: ${theme.spacing.lg};
    right: ${theme.spacing.lg};
    width: 50px;
    height: 50px;
  }
`;

export const ChatIcon = styled.img`
  width: 24px;
  height: 24px;
  
  ${theme.media.tablet} {
    width: 20px;
    height: 20px;
  }
`;

export const ChatOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 600px;
  background: white;
  border-radius: ${theme.radius.lg} ${theme.radius.lg} 0 0;
  box-shadow: ${theme.shadows.xl};
  z-index: ${theme.zIndex.modal};
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  transform: translateY(${props => props.$isOpen ? '0' : '100%'});
  transition: transform ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  ${theme.media.tablet} {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const ChatHeader = styled.div`
  background: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.lg} ${theme.radius.lg} 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  ${theme.media.tablet} {
    border-radius: 0;
  }
`;

export const ChatHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const ChatLogo = styled.div`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: ${theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize.sm};
`;

export const ChatTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatTitleMain = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.sm};
`;

export const ChatTitleSub = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  opacity: 0.8;
`;

export const ChatCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DownIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const ChatContent = styled.div`
  flex: 1;
  padding: ${theme.spacing.lg};
  overflow-y: auto;
  background: ${theme.colors.backgroundGray};
`;

export const ChatMessage = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: ${theme.spacing.lg};
`;

export const ChatAvatar = styled.div`
  width: 36px;
  height: 36px;
  background: #fbbf24;
  border-radius: ${theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.lg};
  flex-shrink: 0;
`;

export const ChatBubble = styled.div`
  background: white;
  padding: 0.8rem 1rem;
  border-radius: ${theme.radius.lg};
  max-width: 280px;
  box-shadow: ${theme.shadows.sm};
`;

export const ChatText = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  line-height: ${theme.typography.lineHeight.normal};
  color: ${theme.colors.textPrimary};
`;

export const ChatTime = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textSecondary};
  margin-top: 0.3rem;
`;

export const ChatOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.8rem;
`;

export const ChatOptionButton = styled.button`
  background: white;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  padding: 0.6rem 1rem;
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.fontSize.xs};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: ${theme.colors.primary};
    color: white;
  }
`;

export const ChatInput = styled.div`
  padding: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.borderLight};
  background: white;
`;

export const ChatInputField = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.fontSize.sm};
  outline: none;
  
  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const AnimatedRefreshIcon = styled.img`
  width: 16px;
  height: 16px;
  transition: transform 0.5s ease-in-out;
  transform: rotate(0deg);
  
  &:not([src]), &[src=""], &[src*="error"] {
    display: none;
  }
`;

export const AnimatedRefreshFallback = styled.div`
  font-size: 16px;
  color: ${theme.colors.textSecondary};
  transition: transform 0.5s ease-in-out;
  transform: rotate(0deg);
  display: ${props => props.className?.includes('show') ? 'inline' : 'none'};
`;

export const ChatFooter = styled.div`
  text-align: center;
  padding: 0.5rem;
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textSecondary};
  border-top: 1px solid ${theme.colors.borderLight};
`;