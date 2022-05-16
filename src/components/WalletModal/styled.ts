import styled, { keyframes } from 'styled-components';

export const StyledModalDialog = styled.div`
  scrollbar-width: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 989;
`;

export const animation = keyframes`
  0% {
    background-color: rgba(11, 11, 19, 0)
  }

  to {
    @-moz-document url-prefix() {
      background-color: rgba(11, 11, 19, .4)
    }

    -webkit-backdrop-filter:blur(6px);
    backdrop-filter:blur(6px)
  }
}`;

export const StyledModalBackdrop = styled.div`
  backdrop-filter: blur(6px);
  animation: ${animation} 0.25s ease-in-out;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export const StyledModalContent = styled.div`
  margin: auto;
  z-index: 1000;
  width: 100%;
  max-width: 360px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const StyledModalInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  margin: auto;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  width: 100%;
  padding-bottom: 16px;
`;

export const StyledModalHeader = styled.header`
  font-weight: 500;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding: 24px 28px 20px;
`;

export const StyledModalFooter = styled.footer`
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #6f6e84;
  margin-top: 16px;
  padding: 0px 28px 20px;
`;

export const ConnectorListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ModalContent = styled.div`
  padding: 0 28px;
`;
