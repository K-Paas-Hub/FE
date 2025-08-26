import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../theme/theme';

// Main Header Container
export const Header = styled.header`
  background: white;
  border-bottom: 1px solid ${theme.colors.borderLight};
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
  box-shadow: ${theme.shadows.sm};
`;

export const HeaderContent = styled.div`
  max-width: ${theme.containers.wide};
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 0 1rem 0;
  gap: 1rem;
  position: relative;
  
  ${theme.media.tablet} {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

// Logo Section
export const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: -3rem;
  position: absolute;
  left: 0;
  
  ${theme.media.tablet} {
    order: 1;
    justify-content: center;
    margin-left: 0;
    position: relative;
  }
`;

export const LogoImage = styled.img`
  height: 50px;
  
  ${theme.media.tablet} {
    height: 40px;
  }
`;

// Navigation Section
export const NavWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  
  ${theme.media.tablet} {
    padding: 0;
    flex: none;
    order: 2;
    justify-content: center;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
  
  ${theme.media.tablet} {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  ${theme.media.mobile} {
    gap: 0.5rem;
  }
`;

export const NavLink = styled(Link)`
  color: ${theme.colors.textPrimary};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.semibold};
  padding: 0.6rem 1.2rem;
  border-radius: ${theme.radius.lg};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  position: relative;
  white-space: nowrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;
  
  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
  
  &.active {
    background: ${theme.colors.primary};
    color: white;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${theme.colors.primaryDark};
    transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 60%;
  }
  
  ${theme.media.tablet} {
    padding: 0.4rem 0.8rem;
    font-size: ${theme.typography.fontSize.sm};
  }
`;

// Dropdown Components
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownTrigger = styled.div<{ $isOpen: boolean }>`
  color: ${theme.colors.textPrimary};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.semibold};
  padding: 0.6rem 1.2rem;
  border-radius: ${theme.radius.lg};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
  
  &.active {
    background: ${theme.colors.primary};
    color: white;
  }
  
  &::after {
    content: '▼';
    font-size: 0.8rem;
    transition: transform ${theme.animations.duration.normal} ${theme.animations.easing.ease};
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
  
  ${theme.media.tablet} {
    padding: 0.4rem 0.8rem;
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadows.lg};
  z-index: ${theme.zIndex.dropdown};
  min-width: 180px;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  margin-top: 0.5rem;
`;

export const DropdownItem = styled(Link)`
  display: block;
  padding: 0.8rem 1rem;
  color: ${theme.colors.textPrimary};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  border-bottom: 1px solid ${theme.colors.backgroundGray};
  
  &:hover {
    background: ${theme.colors.backgroundGray};
    color: ${theme.colors.primary};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

// Right Section (Language & Auth)
export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  
  ${theme.media.tablet} {
    order: 3;
    justify-content: center;
  }
`;

// Language Selector
export const LanguageButton = styled.div`
  background: none;
  border: 1px solid ${theme.colors.borderLight};
  height: 44px;
  padding: 0 12px;
  border-radius: ${theme.radius.sm};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  white-space: nowrap;
  min-width: 160px;
  max-width: 200px;
  overflow: visible;
  
  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.xs};
    height: 40px;
    padding: 0 10px;
    min-width: 140px;
    max-width: 180px;
  }
`;

export const FlagIcon = styled.img`
  width: 24px;
  height: 16px;
  border-radius: 2px;
  flex-shrink: 0;
  object-fit: cover;
`;

export const LanguageText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`;

export const LanguageDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadows.lg};
  z-index: ${theme.zIndex.dropdown};
  width: 220px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  margin-top: 0.5rem;
`;

export const LanguageOption = styled.button`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textPrimary};
  transition: background ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  
  &:hover {
    background: ${theme.colors.backgroundGray};
  }
  
  &:first-child {
    border-radius: ${theme.radius.md} ${theme.radius.md} 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 ${theme.radius.md} ${theme.radius.md};
  }
  
  ${theme.media.tablet} {
    font-size: ${theme.typography.fontSize.xs};
    height: 40px;
    padding: 0 10px;
  }
`;

// Auth Buttons
export const AuthButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  box-shadow: ${theme.shadows.sm};
  white-space: nowrap;
  min-width: 120px;
  
  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
  
  ${theme.media.tablet} {
    padding: 0.6rem 1rem;
    font-size: ${theme.typography.fontSize.sm};
    min-width: 100px;
  }
`;

export const UserButton = styled.button<{ $isOpen: boolean }>`
  background: ${props => props.$isOpen ? theme.colors.primaryHover : theme.colors.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  box-shadow: ${theme.shadows.sm};
  white-space: nowrap;
  min-width: 120px;
  
  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
  
  ${theme.media.tablet} {
    padding: 0.6rem 1rem;
    font-size: ${theme.typography.fontSize.sm};
    min-width: 100px;
  }
`;

export const UserDropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadows.xl};
  min-width: 120px;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  z-index: ${theme.zIndex.dropdown};
  margin-top: 0.5rem;
`;

export const UserDropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.fontSize.sm};
  transition: background-color ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: ${theme.colors.backgroundGray};
  }
  
  &:first-child {
    border-radius: ${theme.radius.md} ${theme.radius.md} 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 ${theme.radius.md} ${theme.radius.md};
  }
`;