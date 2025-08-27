import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PostcodeSearch from '../PostcodeSearch';
import { TestContainer, ResultContainer, CodeBlock } from './PostcodeTest.styles';
import { AddressData } from '../../types/postcode';
import { devLog } from '../../utils/logger';

const PostcodeTest: React.FC = () => {
  const { t } = useTranslation();
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);

  const handleAddressSelect = (address: AddressData) => {
    devLog('주소 선택됨', address);
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
