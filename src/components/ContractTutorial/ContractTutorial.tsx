import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

import {
  TutorialContainer,
  TutorialContent,
  TutorialSection,
  SectionTitle,
  SectionNumber,
  SectionContent,
  ImportantBox,
  ImportantTitle,
  WarningIcon,
  ExampleBox,
  ExampleTitle,
  ContractIcon,
  CodeBlock,
  FAQSection,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
  Checklist,
  ChecklistItem,
  CheckIcon
} from '../../styles/components/ContractTutorial.styles';



const ContractTutorial: React.FC = () => {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = t('contractTutorial.sections.faq.questions', { returnObjects: true }) as Array<{question: string, answer: string}>;

  return (
    <TutorialContainer>
      <MainHeader />
      
      <TutorialContent>
        <TutorialSection>
          <SectionTitle>
            <SectionNumber>1</SectionNumber>
            {t('contractTutorial.sections.workConditions.title')}
          </SectionTitle>
          <SectionContent>
            <p>
              {t('contractTutorial.sections.workConditions.content')}
            </p>

            <ImportantBox>
              <ImportantTitle>
                <WarningIcon src="/images/warning.png" alt="Warning" />
                {t('contractTutorial.sections.workConditions.warning.title')}
              </ImportantTitle>
              <p>
                {t('contractTutorial.sections.workConditions.warning.content')}
              </p>
            </ImportantBox>

            <h3>{t('contractTutorial.sections.workConditions.workHours.title')}</h3>
            <p>
              {t('contractTutorial.sections.workConditions.workHours.content')}
            </p>

            <ExampleBox>
              <ExampleTitle>
                <ContractIcon src="/images/contract.png" alt="Contract" />
                {t('contractTutorial.sections.workConditions.workHours.example.title')}
              </ExampleTitle>
              <CodeBlock>
                {t('contractTutorial.sections.workConditions.workHours.example.content')}
              </CodeBlock>
            </ExampleBox>

            <h3>{t('contractTutorial.sections.workConditions.salary.title')}</h3>
            <p>
              {t('contractTutorial.sections.workConditions.salary.content')}
            </p>

            <ExampleBox>
              <ExampleTitle>
                <ContractIcon src="/images/contract.png" alt="Contract" />
                {t('contractTutorial.sections.workConditions.salary.example.title')}
              </ExampleTitle>
              <CodeBlock>
                {t('contractTutorial.sections.workConditions.salary.example.content')}
              </CodeBlock>
            </ExampleBox>
          </SectionContent>
        </TutorialSection>

        <TutorialSection>
          <SectionTitle>
            <SectionNumber>2</SectionNumber>
            {t('contractTutorial.sections.laborLaw.title')}
          </SectionTitle>
          <SectionContent>
            <p>
              {t('contractTutorial.sections.laborLaw.content')}
            </p>

            <h3>{t('contractTutorial.sections.laborLaw.overtime.title')}</h3>
            <p>
              {t('contractTutorial.sections.laborLaw.overtime.content')}
            </p>

            <ImportantBox>
              <ImportantTitle>
                <ContractIcon src="/images/legal.png" alt="Legal" />
                {t('contractTutorial.sections.laborLaw.overtime.legal.title')}
              </ImportantTitle>
              <p>
                {t('contractTutorial.sections.laborLaw.overtime.legal.content')}
              </p>
            </ImportantBox>

            <h3>{t('contractTutorial.sections.laborLaw.breakTime.title')}</h3>
            <p>
              {t('contractTutorial.sections.laborLaw.breakTime.content')}
            </p>
          </SectionContent>
        </TutorialSection>

        <TutorialSection>
          <SectionTitle>
            <SectionNumber>3</SectionNumber>
            {t('contractTutorial.sections.contractPeriod.title')}
          </SectionTitle>
          <SectionContent>
            <p>
              {t('contractTutorial.sections.contractPeriod.content')}
            </p>

            <ExampleBox>
              <ExampleTitle>
                <ContractIcon src="/images/contract.png" alt="Contract" />
                {t('contractTutorial.sections.contractPeriod.example.title')}
              </ExampleTitle>
              <CodeBlock>
                {t('contractTutorial.sections.contractPeriod.example.content')}
              </CodeBlock>
            </ExampleBox>
          </SectionContent>
        </TutorialSection>

        <TutorialSection>
          <SectionTitle>
            <SectionNumber>4</SectionNumber>
            {t('contractTutorial.sections.annualLeave.title')}
          </SectionTitle>
          <SectionContent>
            <p>
              {t('contractTutorial.sections.annualLeave.content')}
            </p>

            <ExampleBox>
              <ExampleTitle>
                <ContractIcon src="/images/contract.png" alt="Contract" />
                {t('contractTutorial.sections.annualLeave.example.title')}
              </ExampleTitle>
              <CodeBlock>
                {t('contractTutorial.sections.annualLeave.example.content')}
              </CodeBlock>
            </ExampleBox>

            <ImportantBox>
              <ImportantTitle>
                <ContractIcon src="/images/legal.png" alt="Legal" />
                {t('contractTutorial.sections.annualLeave.requirements.title')}
              </ImportantTitle>
              <Checklist>
                {t('contractTutorial.sections.annualLeave.requirements.items', { returnObjects: true }).map((item: string, index: number) => (
                  <ChecklistItem key={index}>
                    <CheckIcon src="/images/legal.png" alt="Check" />
                    <div>{item}</div>
                  </ChecklistItem>
                ))}
              </Checklist>
            </ImportantBox>
          </SectionContent>
        </TutorialSection>

        <TutorialSection>
          <SectionTitle>
            <SectionNumber>5</SectionNumber>
            {t('contractTutorial.sections.faq.title')}
          </SectionTitle>
          <SectionContent>
            <p>
              {t('contractTutorial.sections.faq.content')}
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
