import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Job } from '../../types/job';
import {
  JobDetailContainer,
  JobHeader,
  BackButton,
  ApplyButton,
  CompanySection,
  JobDescription,
  RequirementsSection,
  BenefitsSection,
  ContactSection,
  LoadingSpinner,
  ErrorMessage
} from '../../styles/components/JobDetailPage.styles';

// Mock 데이터 (실제 API 연동 시 제거)
const mockJobs: Job[] = [
  {
    id: 1,
    company: "삼성전자",
    logo: "📱",
    logoClass: "samsung",
    title: "소프트웨어 엔지니어",
    location: "서울 강남구",
    experience: "3-5년",
    industry: "IT/소프트웨어",
    salary: 45000000,
    deadline: "2024-12-31",
    hasVisa: true,
    isLiked: false,
    likeCount: 15,
    createdAt: "2024-01-15",
    imageContent: "삼성전자에서 경험 많은 소프트웨어 엔지니어를 모집합니다.",
    description: "삼성전자에서 모바일 애플리케이션 개발을 담당할 소프트웨어 엔지니어를 모집합니다. React Native와 Android 개발 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 관련 전공 학사 이상",
      "3년 이상의 모바일 앱 개발 경험",
      "React Native, Android 개발 경험",
      "JavaScript, TypeScript, Java 언어 능숙",
      "Git을 이용한 버전 관리 경험"
    ],
    benefits: [
      "경쟁력 있는 연봉",
      "E-7 비자 지원",
      "건강보험 및 4대보험",
      "연차휴가 및 반차제도",
      "사내 교육 프로그램"
    ],
    contactInfo: {
      email: "recruit@samsung.com",
      phone: "02-1234-5678"
    }
  },
  {
    id: 2,
    company: "LG전자",
    logo: "🏠",
    logoClass: "lg",
    title: "하드웨어 엔지니어",
    location: "서울 영등포구",
    experience: "2-4년",
    industry: "전자/반도체",
    salary: 40000000,
    deadline: "2024-12-25",
    hasVisa: false,
    isLiked: true,
    likeCount: 8,
    createdAt: "2024-01-10",
    imageContent: "LG전자에서 혁신적인 하드웨어 개발을 이끌 엔지니어를 찾습니다.",
    description: "LG전자에서 스마트홈 제품의 하드웨어 설계 및 개발을 담당할 엔지니어를 모집합니다. IoT 기술에 대한 이해가 있는 분을 우대합니다.",
    requirements: [
      "전자공학 또는 관련 전공 학사 이상",
      "2년 이상의 하드웨어 설계 경험",
      "PCB 설계 및 회로 설계 경험",
      "Altium Designer 또는 KiCad 사용 경험",
      "IoT 프로토콜 이해 (WiFi, Bluetooth, Zigbee)"
    ],
    benefits: [
      "안정적인 근무 환경",
      "성과급 및 인센티브",
      "건강검진 지원",
      "사내 복지시설 이용",
      "해외 출장 기회"
    ],
    contactInfo: {
      email: "hr@lg.com",
      phone: "02-2345-6789"
    }
  },
  {
    id: 3,
    company: "현대자동차",
    logo: "🚗",
    logoClass: "hyundai",
    title: "자동차 소프트웨어 개발자",
    location: "경기도 용인시",
    experience: "4-6년",
    industry: "자동차/부품",
    salary: 50000000,
    deadline: "2024-12-20",
    hasVisa: true,
    isLiked: false,
    likeCount: 22,
    createdAt: "2024-01-08",
    imageContent: "현대자동차에서 자율주행 기술 개발에 참여할 개발자를 모집합니다.",
    description: "현대자동차에서 자율주행 시스템의 소프트웨어 개발을 담당할 개발자를 모집합니다. C++과 Python 개발 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 관련 전공 석사 이상",
      "4년 이상의 임베디드 소프트웨어 개발 경험",
      "C++, Python 언어 능숙",
      "Linux 시스템 프로그래밍 경험",
      "자율주행 또는 로봇공학 관련 프로젝트 경험"
    ],
    benefits: [
      "최고 수준의 연봉",
      "E-7 비자 지원",
      "주택 지원",
      "자녀 교육비 지원",
      "연구개발 인센티브"
    ],
    contactInfo: {
      email: "careers@hyundai.com",
      phone: "031-3456-7890"
    }
  },
  {
    id: 4,
    company: "SK하이닉스",
    logo: "💾",
    logoClass: "sk",
    title: "반도체 설계 엔지니어",
    location: "경기도 이천시",
    experience: "5-7년",
    industry: "반도체",
    salary: 55000000,
    deadline: "2024-12-15",
    hasVisa: true,
    isLiked: true,
    likeCount: 18,
    createdAt: "2024-01-05",
    imageContent: "SK하이닉스에서 차세대 메모리 반도체 설계를 담당할 엔지니어를 모집합니다.",
    description: "SK하이닉스에서 DRAM 및 NAND 플래시 메모리 설계를 담당할 엔지니어를 모집합니다. 반도체 물리학에 대한 깊은 이해가 있는 분을 우대합니다.",
    requirements: [
      "전자공학 또는 물리학 전공 석사 이상",
      "5년 이상의 반도체 설계 경험",
      "Cadence, Synopsys 도구 사용 경험",
      "Verilog, VHDL 언어 능숙",
      "메모리 반도체 설계 경험"
    ],
    benefits: [
      "최고 수준의 연봉 및 스톡옵션",
      "E-7 비자 지원",
      "연구개발 특별 인센티브",
      "해외 연수 기회",
      "최신 장비 및 도구 제공"
    ],
    contactInfo: {
      email: "recruit@sk.com",
      phone: "031-4567-8901"
    }
  },
  {
    id: 5,
    company: "네이버",
    logo: "🔍",
    logoClass: "naver",
    title: "AI/ML 엔지니어",
    location: "경기도 성남시",
    experience: "3-5년",
    industry: "IT/소프트웨어",
    salary: 48000000,
    deadline: "2024-12-30",
    hasVisa: true,
    isLiked: false,
    likeCount: 25,
    createdAt: "2024-01-12",
    imageContent: "네이버에서 인공지능 기술 개발에 참여할 엔지니어를 모집합니다.",
    description: "네이버에서 머신러닝 모델 개발 및 AI 서비스 구현을 담당할 엔지니어를 모집합니다. TensorFlow, PyTorch 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 통계학 전공 석사 이상",
      "3년 이상의 머신러닝 개발 경험",
      "Python, TensorFlow, PyTorch 능숙",
      "대용량 데이터 처리 경험",
      "논문 발표 또는 오픈소스 기여 경험"
    ],
    benefits: [
      "경쟁력 있는 연봉",
      "E-7 비자 지원",
      "연구개발 자유도",
      "컨퍼런스 참가 지원",
      "최신 GPU 클러스터 사용"
    ],
    contactInfo: {
      email: "ai-jobs@naver.com",
      phone: "031-5678-9012"
    }
  },
  {
    id: 6,
    company: "카카오",
    logo: "💛",
    logoClass: "kakao",
    title: "백엔드 개발자",
    location: "제주도 제주시",
    experience: "2-4년",
    industry: "IT/소프트웨어",
    salary: 42000000,
    deadline: "2024-12-28",
    hasVisa: false,
    isLiked: true,
    likeCount: 12,
    createdAt: "2024-01-14",
    imageContent: "카카오에서 대용량 트래픽을 처리하는 백엔드 시스템을 개발할 개발자를 모집합니다.",
    description: "카카오에서 대용량 사용자 트래픽을 처리하는 백엔드 시스템 개발을 담당할 개발자를 모집합니다. Java, Spring Framework 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 관련 전공 학사 이상",
      "2년 이상의 백엔드 개발 경험",
      "Java, Spring Framework 능숙",
      "MySQL, Redis 데이터베이스 경험",
      "AWS, GCP 클라우드 경험"
    ],
    benefits: [
      "제주도 근무 (원격 근무 가능)",
      "유연한 근무 시간",
      "스톡옵션 제공",
      "사내 카페테리아 이용",
      "정기 팀 빌딩 활동"
    ],
    contactInfo: {
      email: "backend@kakao.com",
      phone: "064-6789-0123"
    }
  },
  {
    id: 7,
    company: "쿠팡",
    logo: "📦",
    logoClass: "coupang",
    title: "데이터 엔지니어",
    location: "서울 송파구",
    experience: "3-5년",
    industry: "IT/소프트웨어",
    salary: 46000000,
    deadline: "2024-12-22",
    hasVisa: true,
    isLiked: false,
    likeCount: 16,
    createdAt: "2024-01-11",
    imageContent: "쿠팡에서 빅데이터 처리 및 분석 시스템을 구축할 엔지니어를 모집합니다.",
    description: "쿠팡에서 대용량 데이터 처리 및 분석 시스템을 구축하고 운영할 데이터 엔지니어를 모집합니다. Hadoop, Spark 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 통계학 전공 학사 이상",
      "3년 이상의 데이터 엔지니어링 경험",
      "Hadoop, Spark, Kafka 능숙",
      "Python, Scala 언어 경험",
      "AWS EMR, S3 클라우드 경험"
    ],
    benefits: [
      "경쟁력 있는 연봉",
      "E-7 비자 지원",
      "데이터 중심 의사결정 문화",
      "최신 데이터 기술 스택 사용",
      "정기 기술 컨퍼런스 참가"
    ],
    contactInfo: {
      email: "data-jobs@coupang.com",
      phone: "02-7890-1234"
    }
  },
  {
    id: 8,
    company: "토스",
    logo: "💳",
    logoClass: "toss",
    title: "프론트엔드 개발자",
    location: "서울 강남구",
    experience: "2-4년",
    industry: "IT/소프트웨어",
    salary: 44000000,
    deadline: "2024-12-26",
    hasVisa: false,
    isLiked: true,
    likeCount: 20,
    createdAt: "2024-01-13",
    imageContent: "토스에서 사용자 경험을 혁신할 프론트엔드 개발자를 모집합니다.",
    description: "토스에서 모바일 앱과 웹 서비스의 프론트엔드 개발을 담당할 개발자를 모집합니다. React, TypeScript 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 관련 전공 학사 이상",
      "2년 이상의 프론트엔드 개발 경험",
      "React, TypeScript 능숙",
      "모바일 앱 개발 경험 (React Native)",
      "사용자 경험 설계에 대한 이해"
    ],
    benefits: [
      "최신 기술 스택 사용",
      "사용자 중심 개발 문화",
      "정기 기술 공유 세션",
      "개발 도구 및 장비 지원",
      "유연한 근무 환경"
    ],
    contactInfo: {
      email: "frontend@toss.im",
      phone: "02-8901-2345"
    }
  },
  {
    id: 9,
    company: "배달의민족",
    logo: "🛵",
    logoClass: "baemin",
    title: "모바일 앱 개발자",
    location: "서울 강남구",
    experience: "3-5년",
    industry: "IT/소프트웨어",
    salary: 43000000,
    deadline: "2024-12-24",
    hasVisa: true,
    isLiked: false,
    likeCount: 14,
    createdAt: "2024-01-09",
    imageContent: "배달의민족에서 사용자 친화적인 모바일 앱을 개발할 개발자를 모집합니다.",
    description: "배달의민족에서 iOS 및 Android 모바일 앱 개발을 담당할 개발자를 모집합니다. Swift, Kotlin 개발 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 관련 전공 학사 이상",
      "3년 이상의 모바일 앱 개발 경험",
      "iOS: Swift, SwiftUI 능숙",
      "Android: Kotlin, Jetpack Compose 능숙",
      "앱스토어 배포 경험"
    ],
    benefits: [
      "경쟁력 있는 연봉",
      "E-7 비자 지원",
      "최신 개발 장비 제공",
      "앱스토어 수익 공유",
      "정기 앱 업데이트 보너스"
    ],
    contactInfo: {
      email: "mobile@woowahan.com",
      phone: "02-9012-3456"
    }
  },
  {
    id: 10,
    company: "당근마켓",
    logo: "🥕",
    logoClass: "daangn",
    title: "풀스택 개발자",
    location: "서울 마포구",
    experience: "2-4년",
    industry: "IT/소프트웨어",
    salary: 41000000,
    deadline: "2024-12-29",
    hasVisa: false,
    isLiked: true,
    likeCount: 11,
    createdAt: "2024-01-16",
    imageContent: "당근마켓에서 지역 기반 커머스 플랫폼을 개발할 풀스택 개발자를 모집합니다.",
    description: "당근마켓에서 프론트엔드와 백엔드를 모두 담당할 풀스택 개발자를 모집합니다. React, Node.js 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 관련 전공 학사 이상",
      "2년 이상의 웹 개발 경험",
      "React, Node.js 능숙",
      "MongoDB, PostgreSQL 데이터베이스 경험",
      "AWS 클라우드 서비스 경험"
    ],
    benefits: [
      "풀스택 개발 경험 축적",
      "스타트업 문화 체험",
      "유연한 근무 시간",
      "스톡옵션 제공",
      "정기 기술 스터디"
    ],
    contactInfo: {
      email: "dev@daangn.com",
      phone: "02-0123-4567"
    }
  },
  {
    id: 11,
    company: "라인",
    logo: "💬",
    logoClass: "line",
    title: "보안 엔지니어",
    location: "서울 강남구",
    experience: "4-6년",
    industry: "IT/보안",
    salary: 47000000,
    deadline: "2024-12-18",
    hasVisa: true,
    isLiked: false,
    likeCount: 9,
    createdAt: "2024-01-07",
    imageContent: "라인에서 글로벌 서비스의 보안을 담당할 엔지니어를 모집합니다.",
    description: "라인에서 글로벌 메신저 서비스의 보안 시스템을 구축하고 운영할 보안 엔지니어를 모집합니다. 네트워크 보안 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 정보보안 전공 학사 이상",
      "4년 이상의 보안 엔지니어링 경험",
      "네트워크 보안, 웹 보안 경험",
      "SIEM, IDS/IPS 시스템 경험",
      "보안 인증서 (CISSP, CEH 등) 보유"
    ],
    benefits: [
      "경쟁력 있는 연봉",
      "E-7 비자 지원",
      "최신 보안 도구 사용",
      "보안 컨퍼런스 참가 지원",
      "정기 보안 교육"
    ],
    contactInfo: {
      email: "security@linecorp.com",
      phone: "02-1234-5678"
    }
  },
  {
    id: 12,
    company: "넥슨",
    logo: "🎮",
    logoClass: "nexon",
    title: "게임 클라이언트 개발자",
    location: "경기도 성남시",
    experience: "3-5년",
    industry: "게임",
    salary: 45000000,
    deadline: "2024-12-21",
    hasVisa: true,
    isLiked: true,
    likeCount: 17,
    createdAt: "2024-01-06",
    imageContent: "넥슨에서 차세대 온라인 게임의 클라이언트를 개발할 개발자를 모집합니다.",
    description: "넥슨에서 PC 및 모바일 게임의 클라이언트 개발을 담당할 개발자를 모집합니다. Unity, Unreal Engine 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 게임공학 전공 학사 이상",
      "3년 이상의 게임 클라이언트 개발 경험",
      "Unity, C# 또는 Unreal Engine, C++ 능숙",
      "3D 그래픽 프로그래밍 경험",
      "게임 최적화 경험"
    ],
    benefits: [
      "경쟁력 있는 연봉",
      "E-7 비자 지원",
      "게임 개발 자유도",
      "최신 게임 엔진 사용",
      "게임쇼 참가 지원"
    ],
    contactInfo: {
      email: "game-dev@nexon.com",
      phone: "031-2345-6789"
    }
  },
  {
    id: 13,
    company: "펄어비스",
    logo: "⚔️",
    logoClass: "pearlabyss",
    title: "게임 서버 개발자",
    location: "경기도 용인시",
    experience: "4-6년",
    industry: "게임",
    salary: 48000000,
    deadline: "2024-12-17",
    hasVisa: true,
    isLiked: false,
    likeCount: 13,
    createdAt: "2024-01-04",
    imageContent: "펄어비스에서 대규모 MMORPG 서버를 개발할 개발자를 모집합니다.",
    description: "펄어비스에서 대규모 동시 접속자를 처리하는 게임 서버 개발을 담당할 개발자를 모집합니다. C++, 네트워크 프로그래밍 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 관련 전공 학사 이상",
      "4년 이상의 게임 서버 개발 경험",
      "C++, TCP/UDP 네트워크 프로그래밍 능숙",
      "멀티스레드 프로그래밍 경험",
      "데이터베이스 설계 및 최적화 경험"
    ],
    benefits: [
      "경쟁력 있는 연봉",
      "E-7 비자 지원",
      "대규모 시스템 개발 경험",
      "최신 서버 기술 스택 사용",
      "정기 기술 세미나"
    ],
    contactInfo: {
      email: "server-dev@pearlabyss.com",
      phone: "031-3456-7890"
    }
  },
  {
    id: 14,
    company: "스마일게이트",
    logo: "🔥",
    logoClass: "smilegate",
    title: "게임 기획자",
    location: "경기도 성남시",
    experience: "2-4년",
    industry: "게임",
    salary: 38000000,
    deadline: "2024-12-23",
    hasVisa: false,
    isLiked: true,
    likeCount: 7,
    createdAt: "2024-01-15",
    imageContent: "스마일게이트에서 사용자 경험을 혁신할 게임 기획자를 모집합니다.",
    description: "스마일게이트에서 모바일 게임의 기획 및 밸런싱을 담당할 기획자를 모집합니다. 게임 분석 및 데이터 기반 기획 경험이 있는 분을 우대합니다.",
    requirements: [
      "게임공학 또는 관련 전공 학사 이상",
      "2년 이상의 게임 기획 경험",
      "게임 밸런싱 및 시스템 기획 경험",
      "Excel, 데이터 분석 도구 사용 능숙",
      "사용자 경험 설계에 대한 이해"
    ],
    benefits: [
      "창의적인 기획 환경",
      "데이터 기반 의사결정",
      "정기 게임 분석 교육",
      "게임쇼 참가 기회",
      "성과 기반 인센티브"
    ],
    contactInfo: {
      email: "game-planning@smilegate.com",
      phone: "031-4567-8901"
    }
  },
  {
    id: 15,
    company: "넷마블",
    logo: "🎯",
    logoClass: "netmarble",
    title: "QA 엔지니어",
    location: "서울 강남구",
    experience: "2-4년",
    industry: "게임",
    salary: 35000000,
    deadline: "2024-12-27",
    hasVisa: false,
    isLiked: false,
    likeCount: 5,
    createdAt: "2024-01-17",
    imageContent: "넷마블에서 게임 품질을 보장할 QA 엔지니어를 모집합니다.",
    description: "넷마블에서 모바일 게임의 품질 보증 및 테스트를 담당할 QA 엔지니어를 모집합니다. 자동화 테스트 경험이 있는 분을 우대합니다.",
    requirements: [
      "컴퓨터 공학 또는 관련 전공 학사 이상",
      "2년 이상의 QA 엔지니어링 경험",
      "게임 테스트 및 버그 리포트 작성 경험",
      "Python, Selenium 자동화 테스트 경험",
      "JIRA, TestRail 도구 사용 경험"
    ],
    benefits: [
      "안정적인 근무 환경",
      "체계적인 QA 프로세스",
      "자동화 도구 사용",
      "정기 QA 교육",
      "게임 품질 향상 기여"
    ],
    contactInfo: {
      email: "qa@netmarble.com",
      phone: "02-5678-9012"
    }
  }
];

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 실제 API 호출 대신 Mock 데이터 사용
        const jobId = parseInt(id || '0');
        const foundJob = mockJobs.find(job => job.id === jobId);
        
        if (foundJob) {
          setJob(foundJob);
        } else {
          setError(t('jobDetail.jobNotFound'));
        }
      } catch (err) {
        setError(t('jobDetail.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id, t]);

  const handleBackClick = () => navigate(-1);
  const handleApplyClick = () => alert('지원 기능은 준비 중입니다.');

  // 로딩 상태
  if (loading) {
    return (
      <div className="app-container" style={{ background: 'white' }}>
        <JobDetailContainer>
          <LoadingSpinner>{t('jobDetail.loading')}</LoadingSpinner>
        </JobDetailContainer>
      </div>
    );
  }

  // 에러 상태
  if (error || !job) {
    return (
      <div className="app-container" style={{ background: 'white' }}>
        <JobDetailContainer>
          <ErrorMessage>
            <h2>{t('common.error')}</h2>
            <p>{error || t('jobDetail.jobNotFound')}</p>
            <BackButton
              onClick={handleBackClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('jobDetail.backButton')}
            </BackButton>
          </ErrorMessage>
        </JobDetailContainer>
      </div>
    );
  }

  // 메인 렌더링
  return (
    <div className="app-container" style={{ background: 'white' }}>
      <JobDetailContainer>
        {/* 헤더 섹션 */}
        <JobHeader>
          <BackButton
            onClick={handleBackClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('jobDetail.backButton')}
          </BackButton>
          
          <ApplyButton
            onClick={handleApplyClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('jobDetail.applyButton')}
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
              <span>{t('jobDetail.location')} {job.location}</span>
              <span>{t('jobDetail.salary')} {job.salary.toLocaleString()}원</span>
              <span>{t('jobDetail.deadline')} {job.deadline}</span>
            </div>
            {job.hasVisa && (
              <div className="visa-badge">{t('jobDetail.visaSupport')}</div>
            )}
          </div>
        </CompanySection>

        {/* 직무 설명 섹션 */}
        {job.description && (
          <JobDescription>
            <h3>{t('jobDetail.jobDescription')}</h3>
            <p>{job.description}</p>
          </JobDescription>
        )}

        {/* 요구사항 섹션 */}
        {job.requirements && job.requirements.length > 0 && (
          <RequirementsSection>
            <h3>{t('jobDetail.requirements')}</h3>
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
            <h3>{t('jobDetail.benefits')}</h3>
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
            <h3>{t('jobDetail.contactInfo')}</h3>
            <div className="contact-info">
              <p>{t('jobDetail.email')} {job.contactInfo.email}</p>
              <p>{t('jobDetail.phone')} {job.contactInfo.phone}</p>
            </div>
          </ContactSection>
        )}
      </JobDetailContainer>
    </div>
  );
};

export default JobDetailPage;
