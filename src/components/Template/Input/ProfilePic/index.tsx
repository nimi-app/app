import styled from 'styled-components';
import { ReactComponent as PlaceholderMini } from '../../../../assets/svg/profile-empty.svg';

const ImageWrapper = styled.div`
  margin-top: 42px;
  margin-bottom: 28px;
`;

export function ProfilePic(props) {
  return (
    <ImageWrapper>
      <PlaceholderMini />
    </ImageWrapper>
  );
}
