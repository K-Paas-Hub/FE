import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

import {
  AnalysisContainer,
  AnalysisContent,
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
  ProgressFill
} from '../../styles/components/ContractAnalysis.styles';
import { LoadingSpinner } from '../../styles/common/LoadingSpinner.styles';



const ContractAnalysis: React.FC = () => {
  const { t } = useTranslation();
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
        alert(t('contractAnalysis.upload.fileTypeError'));
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
                title: t('contractAnalysis.results.formatCheck.title'),
                content: t('contractAnalysis.results.formatCheck.content')
              },
              {
                type: 'warning',
                title: t('contractAnalysis.results.workHours.title'),
                content: t('contractAnalysis.results.workHours.content')
              },
              {
                type: 'error',
                title: t('contractAnalysis.results.salary.title'),
                content: t('contractAnalysis.results.salary.content')
              },
              {
                type: 'warning',
                title: t('contractAnalysis.results.annualLeave.title'),
                content: t('contractAnalysis.results.annualLeave.content')
              },
              {
                type: 'success',
                title: t('contractAnalysis.results.contractPeriod.title'),
                content: t('contractAnalysis.results.contractPeriod.content')
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
        <AnalysisSection>
          <SectionTitle>
            <SectionIcon>📄</SectionIcon>
            {t('contractAnalysis.sections.fileUpload')}
          </SectionTitle>
          
          <FileUploadArea
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <UploadIcon>📁</UploadIcon>
            <UploadTitle>{t('contractAnalysis.upload.title')}</UploadTitle>
            <UploadText>
              {t('contractAnalysis.upload.text')}
            </UploadText>
            <UploadSubtext>
              {t('contractAnalysis.upload.subtext')}
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
              <RemoveButton onClick={removeFile}>{t('contractAnalysis.fileInfo.remove')}</RemoveButton>
            </FileInfo>
          )}

          <AnalysisButton
            onClick={analyzeContract}
            disabled={!selectedFile || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <LoadingSpinner />
                {t('contractAnalysis.analysis.analyzing')} ({analysisProgress}%)
              </>
            ) : (
              t('contractAnalysis.analysis.button')
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
              {t('contractAnalysis.sections.analysisResults')}
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
