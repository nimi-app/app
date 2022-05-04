import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div``;
export function Template() {
  const { ensName } = useParams();
  return (
    <Wrapper>
      <h1>Template</h1>
      {ensName}
    </Wrapper>
  );
}
