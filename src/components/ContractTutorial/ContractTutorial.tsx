import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import CommunityBanner from '../CommunityBanner';

const TutorialContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const TutorialContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TutorialHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const TutorialTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TutorialSubtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.6;
`;

const TutorialSection = styled.section`
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

const SectionNumber = styled.span`
  background: ${COLORS.primary};
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: #374151;
`;

const ImportantBox = styled.div`
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
  border: 1px solid #10b981;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
`;

const ImportantTitle = styled.h4`
  color: ${COLORS.primary};
  font-weight: 600;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExampleBox = styled.div`
  background: #f8f9fa;
  border-left: 4px solid ${COLORS.primary};
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;
`;

const ExampleTitle = styled.h5`
  color: ${COLORS.primary};
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CodeBlock = styled.pre`
  background: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 1rem 0;
`;



const FAQSection = styled.div`
  margin-top: 2rem;
`;

const FAQItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const FAQQuestion = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  background: white;
  border: none;
  padding: 1.5rem;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f9fafb;
  }
  
  &::after {
    content: '${props => props.$isOpen ? '−' : '+'}';
    font-size: 1.5rem;
    color: ${COLORS.primary};
    font-weight: 700;
  }
`;

const FAQAnswer = styled.div<{ $isOpen: boolean }>`
  background: #f8f9fa;
  padding: ${props => props.$isOpen ? '1.5rem' : '0 1.5rem'};
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  line-height: 1.6;
  color: #374151;
`;

const Checklist = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const ChecklistItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid ${COLORS.primary};
`;

const CheckIcon = styled.span`
  color: ${COLORS.primary};
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const PrimaryButton = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #10b981;
    transform: translateY(-2px);
  }
`;

const ContractTutorial: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "근로계약서를 작성하지 않으면 어떻게 되나요?",
      answer: "사용자가 근로 계약을 서면으로 체결하지 않거나, 작성자에게 교부하지 않은 경우 500만원 이하의 벌금이 부과됩니다. 기간제 · 단시간 근로자의 경우, 500만원 이하의 과태료 처분을 받을 수 있습니다. 정규직 근로자를 대상으로 근로계약서를 체결하지 않았을 경우에는 법적 처벌 수위가 더 높아질 수 있습니다."
    },
    {
      question: "법에 미달되는 조건으로 근로계약서를 체결했다면 계약의 효력이 없나요?",
      answer: "해당 조건은 무효 처리가 되지만 근로계약서 자체는 여전히 유효합니다. 무효가 된 조건은 근로기준법이 정한 기준에 따라 자동적으로 대체 적용됩니다."
    },
    {
      question: "근로계약서의 대상자는 누구인가요?",
      answer: "정규직, 수습직원, 기간제(계약직), 단시간 근로자, 일용직, 외국인 등 모든 유형의 근로자가 해당됩니다. 교육생이나 수습 근로자도 고용된 상태라면 반드시 근로계약서를 작성해야 합니다."
    },
    {
      question: "근로계약서는 언제 작성해야 하나요?",
      answer: "근로계약서는 근로 시작 전에 작성하는 것이 원칙입니다. 최적의 시점은 입사일 전 계약 조건을 논의한 후 근로 시작일 이전에 서면으로 작성하는 것입니다. 입사일에 작성해야 하는 경우, 근로 시작 전에 계약 내용을 충분히 설명하고 근로자가 내용을 이해한 상태에서 서명하도록 해야 합니다."
    }
  ];

  return (
    <TutorialContainer>
      <CommunityBanner />
      <MainHeader />
      
      <TutorialContent>
        <TutorialSection>
          <SectionTitle>
            <SectionNumber>1</SectionNumber>
            근로 조건은 구체적이고 명확하게 기재해야 합니다
          </SectionTitle>
          <SectionContent>
            <p>
              근로계약서에는 근로 시간, 휴게 시간, 임금 및 지급일 등 근로자의 기본적인 권리와 관련된 내용을 상세히 기재해야 합니다. 
              모호한 표현은 분쟁의 원인이 될 수 있으니, 관련 항목은 구체적으로 서술할 수록 좋습니다.
            </p>

            <ImportantBox>
              <ImportantTitle>
                ⚠️ 주의사항
              </ImportantTitle>
              <p>
                '근무 시간은 회사 내규에 따름'이라는 식의 표현은 모호하여, 분쟁의 원인이 될 수 있으니 피하는 것을 권장합니다.
              </p>
            </ImportantBox>

            <h3>ㄱ. 근로 시간</h3>
            <p>
              법정 근로 시간 내(하루 8시간, 주 40시간)에서 1일에 몇 시간 근무할지 기재합니다.
              휴게 시간은 소정 근로 시간 내에서 4시간에 30분, 8시간에 1시간 이상으로 기재합니다.
            </p>

            <ExampleBox>
              <ExampleTitle>📝 근로 시간 작성 예시</ExampleTitle>
              <CodeBlock>
{`• 근로 시간은 9시 00분부터 18시 00분까지이며, 주 40시간 근무로 한다.
• 휴게 시간은 12시 00분 ~ 13시 00분으로 한다.`}
              </CodeBlock>
            </ExampleBox>

            <h3>ㄴ. 임금</h3>
            <p>
              임금 형태가 연봉인 경우, 연봉 금액과 더불어 기본급과 연장 근로 수당, 식대 등 월급 구성을 기재합니다.
            </p>

            <ExampleBox>
              <ExampleTitle>📝 임금(연봉 금액) 예시</ExampleTitle>
              <CodeBlock>
{`• 근로자의 총 연봉 금액은 금 35,000,000원이다.
• 회사는 매월 근로자에게 연봉의 12분의 1(이하 "월급")을 지급하며, 
  월급은 다음과 같이 구성된다. 
• 기본급: 2,516,667원 / 연장 근로 수당 : 300,000원 / 식대: 100,000원`}
              </CodeBlock>
            </ExampleBox>
          </SectionContent>
        </TutorialSection>

        <TutorialSection>
          <SectionTitle>
            <SectionNumber>2</SectionNumber>
            최신 노동법과 제도를 반영하세요
          </SectionTitle>
          <SectionContent>
            <p>
              법적 문제가 발생하지 않도록, 인사 담당자는 매년 개정되는 근로기준법, 최저임금, 사회보험, 퇴직금 제도 등의 변화를 근로계약서에 반영해야 합니다.
            </p>

            <h3>ㄱ. 연장 근로 관련</h3>
            <p>
              근로기준법 제53조에 따라 1주 간 12시간 초과 근무는 금지되어 있기에, 이와 같은 법률 상 기준을 근로계약서에 명시할 필요가 있습니다.
            </p>

            <ImportantBox>
              <ImportantTitle>📋 법적 기준</ImportantTitle>
              <p>
                1주 간 총 근로 시간 중 1주 법정 근로 시간 40시간을 초과하는 시간이 연장근로이며, 
                이 연장근로가 1주 12시간을 초과하면 법 위반에 해당합니다.
              </p>
            </ImportantBox>

            <h3>ㄴ. 휴게 시간 관련</h3>
            <p>
              근로기준법 제54조는 근로시간이 4시간인 경우에는 30분 이상, 8시간인 경우에는 1시간 이상의 휴게시간을 부여하도록 규정합니다. 
              이는 1일 8시간을 초과하여 발생한 연장근로에 대하여도 동일하게 적용됩니다.
            </p>
          </SectionContent>
        </TutorialSection>

        <TutorialSection>
          <SectionTitle>
            <SectionNumber>3</SectionNumber>
            계약 기간과 갱신 여부를 명시하세요
          </SectionTitle>
          <SectionContent>
            <p>
              기간제 근로자의 경우, 계약 기간과 종료 후 갱신 가능 여부를 구체적으로 적어야 불필요한 오해를 예방할 수 있습니다.
            </p>

            <ExampleBox>
              <ExampleTitle>📝 계약 기간 작성 예시</ExampleTitle>
              <CodeBlock>
{`• 근로 계약 기간: 2024년 1월 1일 ~ 2024년 12월 31일
• 계약 종료 후 갱신 여부: 없음`}
              </CodeBlock>
            </ExampleBox>
          </SectionContent>
        </TutorialSection>

        <TutorialSection>
          <SectionTitle>
            <SectionNumber>4</SectionNumber>
            연차 유급휴가 및 미사용 휴가 관리 기준을 포함하세요
          </SectionTitle>
          <SectionContent>
            <p>
              근로자의 주요 권리 중 하나인 연차 유급 휴가와 미사용 연차 처리에 관한 내용을 명확히 작성해야 합니다.
            </p>

            <ExampleBox>
              <ExampleTitle>📝 연차 관련 작성 예시</ExampleTitle>
              <CodeBlock>
{`• 연차 부여: 근로자는 1년간 80% 이상 출근했을 경우 15일의 연차 유급휴가를 받을 수 있습니다.
• 미사용 연차: 근로자가 연차를 사용하지 못한 경우, 남은 휴가는 금전 보상으로 대체하며, 
  보상 기준은 계약 체결 시 명시된 급여 기준을 따릅니다.`}
              </CodeBlock>
            </ExampleBox>

            <ImportantBox>
              <ImportantTitle>📋 필수 준수사항</ImportantTitle>
              <Checklist>
                <ChecklistItem>
                  <CheckIcon>✓</CheckIcon>
                  <div>근로계약서 내 계약 조건은 근로자와 충분히 논의한 후 명시해야 합니다 (처우 협의 완료 후)</div>
                </ChecklistItem>
                <ChecklistItem>
                  <CheckIcon>✓</CheckIcon>
                  <div>근로자의 요청 여부와 관계 없이 근로계약서 사본 1부를 반드시 제공해야 합니다</div>
                </ChecklistItem>
                <ChecklistItem>
                  <CheckIcon>✓</CheckIcon>
                  <div>근로계약서는 근로자의 퇴사일부터 3년간 의무적으로 보관해야 하며, 보존 기간이 지나면 반드시 폐기해야 합니다</div>
                </ChecklistItem>
              </Checklist>
            </ImportantBox>
          </SectionContent>
        </TutorialSection>

        <TutorialSection>
          <SectionTitle>
            <SectionNumber>5</SectionNumber>
            근로계약서 관련 FAQ
          </SectionTitle>
          <SectionContent>
            <p>
              근로계약서와 관련한 궁금증을 풀어드립니다. 근로계약서는 법적 내용이 포함된 민감한 서류임에 틀림 없습니다. 
              그만큼 인사 담당자 분들도 근로계약서를 작성하며 여러 궁금증이 생길 수 밖에 없죠.
            </p>

            <FAQSection>
              {faqs.map((faq, index) => (
                <FAQItem key={index}>
                  <FAQQuestion 
                    $isOpen={openFAQ === index}
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                  </FAQQuestion>
                  <FAQAnswer $isOpen={openFAQ === index}>
                    {faq.answer}
                  </FAQAnswer>
                </FAQItem>
              ))}
            </FAQSection>
          </SectionContent>
        </TutorialSection>


      </TutorialContent>
      
      <MainFooter />
    </TutorialContainer>
  );
};

export default ContractTutorial;
