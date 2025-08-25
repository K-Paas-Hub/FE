import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

const AnalysisContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const AnalysisContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AnalysisHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const AnalysisTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AnalysisSubtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.6;
`;

const AnalysisSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionIcon = styled.span`
  background: ${COLORS.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const FileUploadArea = styled.div`
  border: 3px dashed #d1d5db;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f9fafb;
  
  &:hover {
    border-color: ${COLORS.primary};
    background: #f0fdf4;
  }
  
  &.dragover {
    border-color: ${COLORS.primary};
    background: #ecfdf5;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #9ca3af;
`;

const UploadTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const UploadText = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
`;

const UploadSubtext = styled.p`
  font-size: 0.9rem;
  color: #9ca3af;
`;

const FileInput = styled.input`
  display: none;
`;

const AnalysisButton = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: #10b981;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const FileInfo = styled.div`
  background: #f8f9fa;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FileIcon = styled.div`
  font-size: 1.5rem;
  color: ${COLORS.primary};
`;

const FileDetails = styled.div`
  flex: 1;
`;

const FileName = styled.div`
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const FileSize = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`;

const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: #dc2626;
  }
`;

const AnalysisResults = styled.div`
  margin-top: 2rem;
`;

const ResultCard = styled.div<{ $type: 'success' | 'warning' | 'error' }>`
  background: ${props => {
    switch (props.$type) {
      case 'success': return '#f0fdf4';
      case 'warning': return '#fffbeb';
      case 'error': return '#fef2f2';
      default: return '#f8f9fa';
    }
  }};
  border: 1px solid ${props => {
    switch (props.$type) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#e5e7eb';
    }
  }};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const ResultTitle = styled.h4<{ $type: 'success' | 'warning' | 'error' }>`
  color: ${props => {
    switch (props.$type) {
      case 'success': return '#059669';
      case 'warning': return '#d97706';
      case 'error': return '#dc2626';
      default: return '#374151';
    }
  }};
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ResultContent = styled.div`
  color: #374151;
  line-height: 1.6;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: ${COLORS.primary};
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${COLORS.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ContractAnalysis: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResults([]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.hwp')) {
        setSelectedFile(file);
        setAnalysisResults([]);
      } else {
        alert('PDF 또는 HWP 파일만 업로드 가능합니다.');
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setAnalysisResults([]);
  };

  const analyzeContract = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // 시뮬레이션된 분석 과정
    const simulateAnalysis = () => {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            
            // 분석 결과 시뮬레이션
            setAnalysisResults([
              {
                type: 'success',
                title: '✅ 근로계약서 형식 확인',
                content: '근로계약서의 기본 형식이 올바르게 작성되었습니다.'
              },
              {
                type: 'warning',
                title: '⚠️ 근로시간 명시 필요',
                content: '근로시간이 구체적으로 명시되지 않았습니다. "회사 내규에 따름"과 같은 모호한 표현을 피하고 구체적인 시간을 명시해주세요.'
              },
              {
                type: 'error',
                title: '❌ 임금 구성 누락',
                content: '임금의 세부 구성(기본급, 수당 등)이 명시되지 않았습니다. 연봉과 월급의 구체적인 구성을 명시해주세요.'
              },
              {
                type: 'warning',
                title: '⚠️ 연차 관리 기준 누락',
                content: '연차 유급휴가 및 미사용 연차 처리에 관한 내용이 명시되지 않았습니다.'
              },
              {
                type: 'success',
                title: '✅ 계약 기간 명시',
                content: '계약 기간이 명확하게 명시되어 있습니다.'
              }
            ]);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return interval;
    };

    simulateAnalysis();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <AnalysisContainer>
      <MainHeader />
      
      <AnalysisContent>
        <AnalysisHeader>
          <AnalysisTitle>근로계약서 분석</AnalysisTitle>
          <AnalysisSubtitle>
            업로드한 근로계약서를 분석하여 개선점을 확인하세요
          </AnalysisSubtitle>
        </AnalysisHeader>

        <AnalysisSection>
          <SectionTitle>
            <SectionIcon>📄</SectionIcon>
            파일 업로드
          </SectionTitle>
          
          <FileUploadArea
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <UploadIcon>📁</UploadIcon>
            <UploadTitle>근로계약서 파일을 업로드하세요</UploadTitle>
            <UploadText>
              PDF 또는 HWP 파일을 드래그 앤 드롭하거나 클릭하여 선택하세요
            </UploadText>
            <UploadSubtext>
              최대 파일 크기: 10MB
            </UploadSubtext>
            
            <FileInput
              id="file-input"
              type="file"
              accept=".pdf,.hwp"
              onChange={handleFileSelect}
            />
          </FileUploadArea>

          {selectedFile && (
            <FileInfo>
              <FileIcon>📄</FileIcon>
              <FileDetails>
                <FileName>{selectedFile.name}</FileName>
                <FileSize>{formatFileSize(selectedFile.size)}</FileSize>
              </FileDetails>
              <RemoveButton onClick={removeFile}>삭제</RemoveButton>
            </FileInfo>
          )}

          <AnalysisButton
            onClick={analyzeContract}
            disabled={!selectedFile || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <LoadingSpinner />
                분석 중... ({analysisProgress}%)
              </>
            ) : (
              '근로계약서 분석하기'
            )}
          </AnalysisButton>

          {isAnalyzing && (
            <ProgressBar>
              <ProgressFill $progress={analysisProgress} />
            </ProgressBar>
          )}
        </AnalysisSection>

        {analysisResults.length > 0 && (
          <AnalysisSection>
            <SectionTitle>
              <SectionIcon>🔍</SectionIcon>
              분석 결과
            </SectionTitle>
            
            <AnalysisResults>
              {analysisResults.map((result, index) => (
                <ResultCard key={index} $type={result.type}>
                  <ResultTitle $type={result.type}>
                    {result.title}
                  </ResultTitle>
                  <ResultContent>
                    {result.content}
                  </ResultContent>
                </ResultCard>
              ))}
            </AnalysisResults>
          </AnalysisSection>
        )}
      </AnalysisContent>
      
      <MainFooter />
    </AnalysisContainer>
  );
};

export default ContractAnalysis;
