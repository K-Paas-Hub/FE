import styled from 'styled-components';

export const DetailAddressContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const DetailAddressInput = styled.input`
  flex: 1;
`;

export const ConfirmButton = styled.button`
  padding: 8px 16px;
  background-color: #4ade80;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background-color: #22c55e;
  }
`;
