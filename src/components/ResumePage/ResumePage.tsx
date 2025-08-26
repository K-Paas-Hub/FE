import React from 'react';
import { MainHeader, MainFooter } from '../';
import {
  ResumeContainer,
  ResumeContent,
  ResumeHeader,
  ResumeTitle,
  ResumeSubtitle,
  ResumeSection,
  SectionTitle,
  SectionIcon,
  ResumeForm,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
} from '../../styles/components/ResumePage.styles';

const ResumePage: React.FC = () => {
  return (
    <ResumeContainer>
      <MainHeader />
      <ResumeContent>
        {/* 기본 정보 섹션 */}
        <ResumeSection>
          <SectionTitle>
            <SectionIcon>👤</SectionIcon>
            기본 정보
          </SectionTitle>
          <ResumeForm>
            <FormGroup>
              <FormLabel>이름</FormLabel>
              <FormInput type="text" placeholder="이름을 입력하세요" />
            </FormGroup>
            <FormGroup>
              <FormLabel>이메일</FormLabel>
              <FormInput type="email" placeholder="이메일을 입력하세요" />
            </FormGroup>
            <FormGroup>
              <FormLabel>전화번호</FormLabel>
              <FormInput type="tel" placeholder="전화번호를 입력하세요" />
            </FormGroup>
            <FormGroup>
              <FormLabel>주소</FormLabel>
              <FormInput type="text" placeholder="주소를 입력하세요" />
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        {/* 학력 정보 섹션 */}
        <ResumeSection>
          <SectionTitle>
            <SectionIcon>🎓</SectionIcon>
            학력 정보
          </SectionTitle>
          <ResumeForm>
            <FormGroup>
              <FormLabel>학교명</FormLabel>
              <FormInput type="text" placeholder="학교명을 입력하세요" />
            </FormGroup>
            <FormGroup>
              <FormLabel>전공</FormLabel>
              <FormInput type="text" placeholder="전공을 입력하세요" />
            </FormGroup>
            <FormGroup>
              <FormLabel>졸업년도</FormLabel>
              <FormInput type="number" placeholder="졸업년도를 입력하세요" />
            </FormGroup>
            <FormGroup>
              <FormLabel>학점</FormLabel>
              <FormInput type="text" placeholder="학점을 입력하세요 (예: 4.0/4.5)" />
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        {/* 경력 정보 섹션 */}
        <ResumeSection>
          <SectionTitle>
            <SectionIcon>💼</SectionIcon>
            경력 정보
          </SectionTitle>
          <ResumeForm>
            <FormGroup>
              <FormLabel>회사명</FormLabel>
              <FormInput type="text" placeholder="회사명을 입력하세요" />
            </FormGroup>
            <FormGroup>
              <FormLabel>직책</FormLabel>
              <FormInput type="text" placeholder="직책을 입력하세요" />
            </FormGroup>
            <FormGroup>
              <FormLabel>근무기간</FormLabel>
              <FormInput type="text" placeholder="근무기간을 입력하세요 (예: 2020.03 - 2023.12)" />
            </FormGroup>
            <FormGroup>
              <FormLabel>주요 업무</FormLabel>
              <FormInput type="text" placeholder="주요 업무를 입력하세요" />
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        {/* 기술/자격증 섹션 */}
        <ResumeSection>
          <SectionTitle>
            <SectionIcon>🔧</SectionIcon>
            기술/자격증
          </SectionTitle>
          <ResumeForm>
            <FormGroup>
              <FormLabel>보유 기술</FormLabel>
              <FormInput type="text" placeholder="보유 기술을 입력하세요 (예: JavaScript, React, Python)" />
            </FormGroup>
            <FormGroup>
              <FormLabel>자격증</FormLabel>
              <FormInput type="text" placeholder="보유 자격증을 입력하세요" />
            </FormGroup>
            <FormGroup>
              <FormLabel>어학 능력</FormLabel>
              <FormInput type="text" placeholder="어학 능력을 입력하세요 (예: TOEIC 850, TOPIK 5급)" />
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        {/* 자기소개서 섹션 */}
        <ResumeSection>
          <SectionTitle>
            <SectionIcon>📄</SectionIcon>
            자기소개서
          </SectionTitle>
          <ResumeForm>
            <FormGroup>
              <FormLabel>자기소개</FormLabel>
              <FormInput 
                as="textarea" 
                placeholder="자기소개를 입력하세요 (성장 과정, 지원 동기, 포부 등을 포함하여 작성하세요)"
                rows={6}
              />
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        {/* 하단 버튼 */}
        <ButtonGroup>
          <PrimaryButton>저장</PrimaryButton>
          <SecondaryButton>미리보기</SecondaryButton>
        </ButtonGroup>
      </ResumeContent>
      <MainFooter />
    </ResumeContainer>
  );
};

export default ResumePage;
