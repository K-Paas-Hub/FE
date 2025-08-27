import React, { useState } from 'react';
import PostcodeSearch from '../PostcodeSearch';

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
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);

  const handleAddressSelect = (address: AddressData) => {
    console.log('Selected address:', address);
    setSelectedAddress(address);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>우편번호 검색 테스트</h1>
      <p>아래 버튼을 클릭하여 우편번호 검색을 테스트해보세요.</p>
      
      <PostcodeSearch
        onAddressSelect={handleAddressSelect}
        placeholder="주소를 검색하세요"
        showDetailAddress={true}
        showRoadAddress={true}
        showJibunAddress={true}
      />

      {selectedAddress && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>선택된 주소 정보:</h3>
          <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(selectedAddress, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PostcodeTest;
