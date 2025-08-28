# 스타일 분리 가이드라인

## 🎯 목적
- 컴포넌트와 스타일의 관심사 분리
- 스타일 코드의 재사용성 및 유지보수성 향상
- 일관된 스타일 관리 체계 구축

## 📁 파일 구조 규칙

### 1. 스타일 파일 위치
```
src/
├── styles/
│   ├── components/          # 컴포넌트별 스타일
│   │   ├── Button.styles.ts
│   │   ├── Header.styles.ts
│   │   ├── Footer.styles.ts
│   │   ├── StatsSection.styles.ts
│   │   ├── VisaDetailPage.styles.ts
│   │   └── ...
│   ├── common/             # 공통 스타일
│   │   ├── Button.styles.ts
│   │   ├── Form.styles.ts
│   │   ├── Layout.styles.ts
│   │   └── ...
│   └── theme/              # 테마 설정
│       ├── colors.ts
│       ├── animations.ts
│       └── theme.ts
```

### 2. 파일 네이밍 규칙
- **컴포넌트 스타일**: `ComponentName.styles.ts`
- **공통 스타일**: `Category.styles.ts`
- **테마 파일**: `category.ts`

## 🔧 스타일 분리 작업 방법

### 1. 기존 styled-components 분리

#### Before (컴포넌트 파일 내부)
```typescript
// src/components/Button/Button.tsx
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.button)`
  background: #4ade80;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #22c55e;
  }
`;

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
};
```

#### After (스타일 분리)
```typescript
// src/components/Button/Button.tsx
import React from 'react';
import { StyledButton } from '../../styles/components/Button.styles';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

// src/styles/components/Button.styles.ts
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

export const StyledButton = styled(motion.button)`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${COLORS.primaryHover};
  }
  
  &:disabled {
    background: ${COLORS.textSecondary};
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;
```

### 2. 복잡한 컴포넌트 스타일 분리

#### Before
```typescript
// src/components/Header/Header.tsx
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4ade80;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  
  &:hover {
    color: #4ade80;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>Kareer</Logo>
      <Nav>
        <NavLink href="/">홈</NavLink>
        <NavLink href="/visa">비자</NavLink>
        <NavLink href="/contract">계약서</NavLink>
      </Nav>
    </HeaderContainer>
  );
};
```

#### After
```typescript
// src/components/Header/Header.tsx
import React from 'react';
import {
  HeaderContainer,
  Logo,
  Nav,
  NavLink
} from '../../styles/components/Header.styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>Kareer</Logo>
      <Nav>
        <NavLink href="/">홈</NavLink>
        <NavLink href="/visa">비자</NavLink>
        <NavLink href="/contract">계약서</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

// src/styles/components/Header.styles.ts
import styled from 'styled-components';
import { COLORS } from '../../constants';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${COLORS.primary};
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: ${COLORS.text};
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
```

## 📝 스타일 파일 작성 규칙

### 1. Import 순서
```typescript
// 1. 외부 라이브러리
import styled from 'styled-components';
import { motion } from 'framer-motion';

// 2. 내부 상수/타입
import { COLORS, ANIMATIONS } from '../../constants';
import { ComponentProps } from '../../types';

// 3. 스타일 컴포넌트 정의
export const StyledComponent = styled(motion.div)`
  // 스타일 정의
`;
```

### 2. 스타일 컴포넌트 네이밍
```typescript
// ✅ 올바른 네이밍
export const StyledButton = styled.button``;
export const StyledHeader = styled.header``;
export const StyledNavLink = styled.a``;

// ❌ 피해야 할 네이밍
export const Button = styled.button``; // Styled 접두사 누락
export const button = styled.button``; // 소문자 시작
```

### 3. Props 타입 정의
```typescript
// ✅ Props 타입 정의
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export const StyledButton = styled.button<ButtonProps>`
  background: ${props => 
    props.variant === 'primary' ? COLORS.primary : COLORS.secondary
  };
  padding: ${props => {
    switch (props.size) {
      case 'small': return '0.5rem 1rem';
      case 'large': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
`;
```

### 4. 반응형 디자인
```typescript
export const StyledComponent = styled.div`
  // 기본 스타일
  padding: 1rem;
  font-size: 1rem;
  
  // 태블릿
  @media (max-width: 1024px) {
    padding: 0.75rem;
    font-size: 0.95rem;
  }
  
  // 모바일
  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  
  // 작은 모바일
  @media (max-width: 480px) {
    padding: 0.25rem;
    font-size: 0.85rem;
  }
`;
```

## 🔄 마이그레이션 체크리스트

### 1. 기존 컴포넌트 분석
- [ ] styled-components가 컴포넌트 파일에 있는지 확인
- [ ] 스타일 컴포넌트 개수 파악
- [ ] Props 타입 정의 확인
- [ ] 반응형 스타일 포함 여부 확인

### 2. 스타일 파일 생성
- [ ] `src/styles/components/` 폴더에 스타일 파일 생성
- [ ] 파일명: `ComponentName.styles.ts`
- [ ] Import 문 추가 (styled-components, framer-motion, constants)
- [ ] 스타일 컴포넌트들을 파일로 이동

### 3. 컴포넌트 파일 수정
- [ ] styled-components import 제거
- [ ] 스타일 파일에서 스타일 컴포넌트 import
- [ ] 컴포넌트 로직만 남기기
- [ ] Props 인터페이스 유지

### 4. 검증
- [ ] TypeScript 컴파일 에러 없음 확인
- [ ] 스타일이 정상적으로 적용되는지 확인
- [ ] 반응형 디자인 정상 작동 확인
- [ ] Props 전달이 정상적으로 되는지 확인

## ✅ 실제 마이그레이션 예시

### StatsSection 컴포넌트 마이그레이션

#### 1. 스타일 파일 생성
```typescript
// src/styles/components/StatsSection.styles.ts
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

export const StatsContainer = styled.section`
  background: rgba(74, 222, 128, 0.1);
  background-image: url('/images/foregin_worker.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  position: relative;
  padding: 6rem 2rem;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 26, 26, 0.7);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
    min-height: 40vh;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1rem;
    min-height: 35vh;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
  
  .highlight {
    color: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

// ... 기타 스타일 컴포넌트들
```

#### 2. 컴포넌트 파일 수정
```typescript
// src/components/StatsSection/StatsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATIONS } from '../../constants';
import { useCountUp } from '../../hooks';
import {
  StatsContainer,
  SectionTitle,
  StatsGrid,
  StatItem,
  StatNumber,
  StatLabel
} from '../../styles/components/StatsSection.styles';

// ... 컴포넌트 로직
```

### VisaDetailPage 컴포넌트 마이그레이션

#### 1. 스타일 파일 생성
```typescript
// src/styles/components/VisaDetailPage.styles.ts
import styled from 'styled-components';
import { COLORS } from '../../constants';

export const DetailContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

export const DetailContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    color: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// ... 기타 스타일 컴포넌트들
```

#### 2. 컴포넌트 파일 수정
```typescript
// src/components/VisaCenter/VisaDetailPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ANIMATIONS } from '../../constants';
import { VISA_TYPES, VISA_STEPS } from '../../constants/visa';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import CommunityBanner from '../CommunityBanner';
import {
  DetailContainer,
  DetailContent,
  BackButton,
  VisaHeader,
  VisaTitle,
  VisaDescription,
  ContentGrid,
  Section,
  SectionTitle,
  DocumentList,
  DocumentItem,
  DocumentIcon,
  StepList,
  StepItem,
  StepContent,
  StepName,
  StepDescription
} from '../../styles/components/VisaDetailPage.styles';

// ... 컴포넌트 로직
```

## ⚠️ 주의사항

### 1. 순환 참조 방지
```typescript
// ❌ 순환 참조 위험
// ComponentA.styles.ts
import { StyledComponentB } from './ComponentB.styles';

// ComponentB.styles.ts  
import { StyledComponentA } from './ComponentA.styles';

// ✅ 올바른 방법 - 공통 스타일 사용
// common/Shared.styles.ts
export const SharedContainer = styled.div`
  // 공통 스타일
`;
```

### 2. 성능 최적화
```typescript
// ✅ 성능 최적화
export const StyledButton = styled.button`
  // 스타일 정의
`;

// ❌ 성능 저하 가능성
export const StyledButton = styled.button`
  ${props => props.theme.colors.primary} // 동적 스타일
`;
```

### 3. 접근성 유지
```typescript
export const StyledButton = styled.button`
  min-height: 44px;
  min-width: 44px;
  
  &:focus {
    outline: 2px solid ${COLORS.primary};
    outline-offset: 2px;
  }
`;
```

## 🧪 테스트

### 1. 스타일 테스트
```typescript
// Button.styles.test.ts
import { render } from '@testing-library/react';
import { StyledButton } from './Button.styles';

describe('StyledButton', () => {
  it('should render with correct styles', () => {
    const { container } = render(<StyledButton>Test</StyledButton>);
    const button = container.firstChild as HTMLElement;
    
    expect(button).toHaveStyle({
      'min-height': '44px',
      'min-width': '44px'
    });
  });
});
```

## 📚 참고 자료
- [styled-components 공식 문서](https://styled-components.com/docs)
- [framer-motion 공식 문서](https://www.framer.com/motion/)
- [CSS-in-JS 패턴](https://css-in-js.org/)
