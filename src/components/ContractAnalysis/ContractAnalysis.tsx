import React, { useState } from 'react';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import CommunityBanner from '../CommunityBanner';
import {
  AnalysisContainer,
  AnalysisContent,
  AnalysisHeader,
  AnalysisTitle,
  AnalysisSubtitle,
  AnalysisSection,
  SectionTitle,
  SectionIcon,
  FileUploadArea,
  UploadIcon,
  UploadTitle,
  UploadText,
  UploadSubtext,
  FileInput,
  AnalysisButton,
  FileInfo,
  FileIcon,
  FileDetails,
  FileName,
  FileSize,
  RemoveButton,
  AnalysisResults,
  ResultCard,
  ResultTitle,
  ResultContent,
  ProgressBar,
  ProgressFill,
  LoadingSpinner
} from '../../styles/components/ContractAnalysis.styles';



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
      <CommunityBanner />
      <MainHeader />
      
      <AnalysisContent>
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
