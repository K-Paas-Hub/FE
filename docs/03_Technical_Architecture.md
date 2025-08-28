# Kareer K-PaaS: 프론트엔드 아키텍처 문서

## 📋 문서 정보

| 항목 | 내용 |
|------|------|
| **문서명** | Kareer K-PaaS 프론트엔드 아키텍처 문서 |
| **버전** | 2.0 |
| **작성일** | 2025년 1월 |
| **수정일** | 2025년 8월 |
| **작성자** | Kareer Development Team |

---

## 🎯 1. 개요

### **1.1 목적**
본 문서는 Kareer K-PaaS 플랫폼의 프론트엔드 아키텍처를 정의하여 개발팀이 일관된 기술 방향으로 사용자 인터페이스를 구축할 수 있도록 가이드라인을 제공합니다.

### **1.2 범위**
- React 기반 프론트엔드 시스템 설계
- 3개 핵심 기능의 UI/UX 구현 방안
- 컴포넌트 아키텍처 및 상태 관리

---

## 🏗️ 2. 프론트엔드 아키텍처 개요

### **2.1 아키텍처 패턴**
- **Component-Based Architecture**: 재사용 가능한 컴포넌트 기반 설계
- **Container/Presentational Pattern**: 로직과 표현의 분리
- **Hooks Pattern**: 커스텀 훅을 통한 로직 재사용

### **2.2 시스템 구성**
```
┌─────────────────────────────────────────────────────────────┐
│                    Kareer K-PaaS Frontend                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Pages     │  │ Components  │  │   Layouts   │         │
│  │             │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Hooks     │  │   Utils     │  │   Styles    │         │
│  │             │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    State Management                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   useState  │  │  useEffect  │  │   Context   │         │
│  │             │  │             │  │     API     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    Basic Features                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Routing   │  │   Styling   │  │  i18n       │         │
│  │             │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### **2.3 프로젝트 구조**
```
FE/
├── src/
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Home/        # 홈 페이지
│   │   ├── Document/    # 문서 업로드 페이지
│   │   ├── Documents/   # 필요 서류 안내 페이지
│   │   └── Interview/   # 면접 안내 페이지
│   ├── components/      # 재사용 컴포넌트
│   │   ├── common/      # 공통 컴포넌트
│   │   ├── forms/       # 폼 컴포넌트
│   │   └── ui/          # UI 컴포넌트
│   ├── hooks/           # 커스텀 훅
│   ├── utils/           # 유틸리티 함수
│   ├── styles/          # 스타일 파일
│   └── locales/         # 다국어 파일
├── public/              # 정적 파일
└── docs/                # 프로젝트 문서
```

---

## 🚀 3. 기술 스택 상세

### **3.1 핵심 기술**

#### **3.1.1 React 18**
```javascript
// App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
```

#### **3.1.2 JavaScript**
```javascript
// types/index.js
// 간단한 객체 구조로 타입 정의
const User = {
  id: '',
  email: '',
  userType: 'worker', // 'worker' | 'student' | 'employer'
  language: 'ko'
};

const Document = {
  id: '',
  fileName: '',
  fileType: 'pdf', // 'pdf' | 'docx' | 'hwp'
  fileSize: 0,
  uploadDate: new Date(),
  analysis: null
};

const DocumentAnalysis = {
  summary: '',
  keyPoints: [],
  riskScore: 0,
  recommendations: []
};
```

### **3.2 상태 관리**

#### **3.2.1 React 기본 훅**
```javascript
// hooks/useDocuments.js
import { useState, useEffect } from 'react';

export const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });
      
      const newDocument = await response.json();
      setDocuments(prev => [...prev, newDocument]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { documents, loading, error, fetchDocuments, uploadDocument };
};
```

#### **3.2.2 Context API**
```javascript
// context/AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('ko');
  const [user, setUser] = useState(null);

  const value = {
    language,
    setLanguage,
    user,
    setUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
```

### **3.3 UI 컴포넌트**

#### **3.3.1 기본 HTML/CSS**
```javascript
// components/common/Button.js
import React from 'react';
import './Button.css';

export const Button = ({ children, variant = 'primary', onClick, ...props }) => {
  return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

```css
/* components/common/Button.css */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-outline {
  background-color: transparent;
  border: 2px solid #007bff;
  color: #007bff;
}
```

#### **3.3.2 간단한 카드 컴포넌트**
```javascript
// components/common/Card.js
import React from 'react';
import './Card.css';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};
```

```css
/* components/common/Card.css */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin: 10px 0;
}
```

### **3.4 다국어 지원**

#### **3.4.1 간단한 다국어 시스템**
```javascript
// i18n/translations.js
const translations = {
  ko: {
    'documentUpload.title': '문서 업로드',
    'documentUpload.upload': '파일 업로드',
    'documentUpload.analyze': '분석하기',
    'documentGuide.title': '필요 서류 안내',
    'interviewGuide.title': '면접 안내'
  },
  vi: {
    'documentUpload.title': 'Tải lên tài liệu',
    'documentUpload.upload': 'Tải lên tệp',
    'documentUpload.analyze': 'Phân tích',
    'documentGuide.title': 'Hướng dẫn tài liệu cần thiết',
    'interviewGuide.title': 'Hướng dẫn phỏng vấn'
  },
  km: {
    'documentUpload.title': 'ផ្ទុកឡើងឯកសារ',
    'documentUpload.upload': 'ផ្ទុកឡើងឯកសារ',
    'documentUpload.analyze': 'វិភាគ',
    'documentGuide.title': 'ការណែនាំឯកសារដែលត្រូវការ',
    'interviewGuide.title': 'ការណែនាំសម្ភាសន៍'
  },
  ne: {
    'documentUpload.title': 'कागजात अपलोड',
    'documentUpload.upload': 'फाइल अपलोड',
    'documentUpload.analyze': 'विश्लेषण',
    'documentGuide.title': 'आवश्यक कागजात मार्गदर्शन',
    'interviewGuide.title': 'साक्षात्कार मार्गदर्शन'
  },
  id: {
    'documentUpload.title': 'Unggah Dokumen',
    'documentUpload.upload': 'Unggah File',
    'documentUpload.analyze': 'Analisis',
    'documentGuide.title': 'Panduan Dokumen yang Diperlukan',
    'interviewGuide.title': 'Panduan Wawancara'
  },
  zh: {
    'documentUpload.title': '文档上传',
    'documentUpload.upload': '文件上传',
    'documentUpload.analyze': '分析',
    'documentGuide.title': '必要文件指南',
    'interviewGuide.title': '面试指南'
  },
  th: {
    'documentUpload.title': 'อัปโหลดเอกสาร',
    'documentUpload.upload': 'อัปโหลดไฟล์',
    'documentUpload.analyze': 'วิเคราะห์',
    'documentGuide.title': 'คู่มือเอกสารที่จำเป็น',
    'interviewGuide.title': 'คู่มือการสัมภาษณ์'
  }
};

export const t = (key, language = 'ko') => {
  return translations[language][key] || key;
};
```

---

## 🔧 4. 컴포넌트 아키텍처

### **4.1 기본 컴포넌트 구조**

#### **4.1.1 기본 컴포넌트**
```javascript
// components/common/Button.js
export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

// components/common/Input.js
export const Input = ({ placeholder, ...props }) => {
  return <input placeholder={placeholder} {...props} />;
};

// components/common/Icon.js
export const Icon = ({ name, size = 24, ...props }) => {
  return <i className={`icon-${name}`} style={{ fontSize: size }} {...props} />;
};
```

#### **4.1.2 복합 컴포넌트**
```javascript
// components/common/SearchBar.js
import { Input } from './Input';
import { Button } from './Button';
import { Icon } from './Icon';

export const SearchBar = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      <Button type="submit">
        <Icon name="search" />
      </Button>
    </form>
  );
};
```

#### **4.1.3 페이지 컴포넌트**
```javascript
// components/pages/DocumentUpload.js
import { FileUpload } from '../common/FileUpload';
import { ProgressBar } from '../common/ProgressBar';
import { DocumentList } from '../common/DocumentList';

export const DocumentUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (files) => {
    setUploading(true);
    // 업로드 로직
    setUploading(false);
  };

  return (
    <div>
      <FileUpload onUpload={handleUpload} />
      {uploading && <ProgressBar />}
      <DocumentList documents={documents} />
    </div>
  );
};
```

### **4.2 페이지 컴포넌트**

#### **4.2.1 문서 업로드 페이지**
```javascript
// pages/DocumentUploadPage.js
import React from 'react';
import { t } from '../i18n/translations';
import { DocumentUpload } from '../components/pages/DocumentUpload';
import { PageLayout } from '../components/common/PageLayout';

export const DocumentUploadPage = () => {
  return (
    <PageLayout title={t('documentUpload.title')}>
      <DocumentUpload />
    </PageLayout>
  );
};
```

#### **4.2.2 필요 서류 안내 페이지**
```javascript
// pages/DocumentGuidePage.js
import React, { useState } from 'react';
import { t } from '../i18n/translations';
import { VisaTypeSelector } from '../components/common/VisaTypeSelector';
import { DocumentChecklist } from '../components/common/DocumentChecklist';
import { PageLayout } from '../components/common/PageLayout';

export const DocumentGuidePage = () => {
  const [selectedVisaType, setSelectedVisaType] = useState('');

  return (
    <PageLayout title={t('documentGuide.title')}>
      <VisaTypeSelector
        value={selectedVisaType}
        onChange={setSelectedVisaType}
      />
      {selectedVisaType && (
        <DocumentChecklist visaType={selectedVisaType} />
      )}
    </PageLayout>
  );
};
```

#### **4.2.3 면접 안내 페이지**
```javascript
// pages/InterviewGuidePage.js
import React, { useState } from 'react';
import { t } from '../i18n/translations';
import { InterviewTypeSelector } from '../components/common/InterviewTypeSelector';
import { InterviewSimulator } from '../components/common/InterviewSimulator';
import { PageLayout } from '../components/common/PageLayout';

export const InterviewGuidePage = () => {
  const [selectedInterviewType, setSelectedInterviewType] = useState('');

  return (
    <PageLayout title={t('interviewGuide.title')}>
      <InterviewTypeSelector
        value={selectedInterviewType}
        onChange={setSelectedInterviewType}
      />
      {selectedInterviewType && (
        <InterviewSimulator interviewType={selectedInterviewType} />
      )}
    </PageLayout>
  );
};
```

---

## 🔄 5. 라우팅 구조

### **5.1 라우터 설정**
```javascript
// routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DocumentUploadPage } from '../pages/DocumentUploadPage';
import { DocumentGuidePage } from '../pages/DocumentGuidePage';
import { InterviewGuidePage } from '../pages/InterviewGuidePage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/document-upload" element={<DocumentUploadPage />} />
      <Route path="/document-guide" element={<DocumentGuidePage />} />
      <Route path="/interview-guide" element={<InterviewGuidePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
```

---

---

## 📊 6. 성능 최적화

### **6.1 기본 최적화**
```javascript
// hooks/useMemo.js
import { useMemo } from 'react';

export const useExpensiveCalculation = (data) => {
  return useMemo(() => {
    // 복잡한 계산 로직
    return data.filter(item => item.active).map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);
};
```

### **6.2 컴포넌트 최적화**
```javascript
// components/common/DocumentCard.js
import React, { memo } from 'react';

export const DocumentCard = memo(({ document, onSelect }) => {
  return (
    <div onClick={() => onSelect(document)}>
      <h3>{document.fileName}</h3>
      <p>{document.fileType}</p>
    </div>
  );
});
```

---

## 📚 관련 문서

- [🏠 프로젝트 홈](../README.md) - 프로젝트 개요 및 팀 정보
- [📋 프로젝트 개요](./01_Project_Overview.md) - 프로젝트 목적 및 타겟 사용자
- [📝 요구사항 명세](./02_Requirements_Specification.md) - 상세 기능 요구사항
- [🚀 구현 계획](./04_Implementation_Plan.md) - 개발 단계별 계획
- [💻 개발 가이드라인](../.cursor/rules/fe-development-guidelines.mdc) - 코드 작성 규칙
