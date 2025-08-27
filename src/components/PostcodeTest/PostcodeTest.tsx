import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PostcodeSearch from '../PostcodeSearch';
import { TestContainer, ResultContainer, CodeBlock } from './PostcodeTest.styles';

interface AddressData {
  zonecode: string;
  address: string;
  roadAddress: string;
  jibunAddress: string;
  buildingName: string;
  apartment: string;
  sido: string;
  sigungu: string;
  bname: string;
  bname1: string;
  bname2: string;
  hname: string;
  noSelected: string;
  userLanguageType: string;
  userSelectedType: string;
  roadnameCode: string;
  roadname: string;
  bcode: string;
  sigunguCode: string;
  addressType: string;
  addressEnglish: string;
  roadAddressEnglish: string;
  jibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  userQueryType: string;
  query: string;
  postcode: string;
  postcode1: string;
  postcode2: string;
  postcodeSeq: string;
  buildingCode: string;
}

const PostcodeTest: React.FC = () => {
  const { t } = useTranslation();
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);

  const handleAddressSelect = (address: AddressData) => {
    console.log('Selected address:', address);
    setSelectedAddress(address);
  };

  return (
    <TestContainer>
      <h1>우편번호 검색 테스트</h1>
      <p>아래 버튼을 클릭하여 우편번호 검색을 테스트해보세요.</p>
      
      <PostcodeSearch
        onAddressSelect={handleAddressSelect}
        placeholder={t('postcode.searchAddressPlaceholder')}
        showDetailAddress={true}
        showRoadAddress={true}
        showJibunAddress={true}
      />

      {selectedAddress && (
        <ResultContainer>
          <h3>선택된 주소 정보:</h3>
          <CodeBlock>
            {JSON.stringify(selectedAddress, null, 2)}
          </CodeBlock>
        </ResultContainer>
      )}
    </TestContainer>
  );
};

export default PostcodeTest;
