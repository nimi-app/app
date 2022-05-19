import { useFormContext } from 'react-hook-form';

import { useActiveWeb3React } from '../../../hooks/useWeb3';

import { defaultFields, FieldsMapping } from '../../../constants';
import { getExplorerLink, shortenAddress } from '../../../utils';

import {
  AccountInfo,
  BottomBarTextStyle,
  Description,
  Divider,
  EnsName,
  ProfilePic,
  ProfilePicContainer,
  SocialFieldText,
  SocialsHeader,
  SocialsWrapper,
  SocialWrapper,
  StyledExternalLink,
  StyledNimiText,
  StyledUsername,
  StyledWhiteCard,
  TopPart,
} from './styleds';

interface PreviewProps {
  ensName?: string;
}
export function Preview({ ensName }: PreviewProps) {
  const { watch } = useFormContext();
  const { account, chainId } = useActiveWeb3React();

  const arrayOfFormFields = watch();
  //check if form has social fields and display socials sections if so
  const hasSocialFields = Object.keys(FieldsMapping).some((key) => arrayOfFormFields.hasOwnProperty(key));

  return (
    <StyledWhiteCard>
      <ProfilePicContainer>
        <TopPart />
        <StyledNimiText />
        <ProfilePic src={'https://pbs.twimg.com/profile_images/1192201003950583808/vV9BWyLU_400x400.jpg'} />
      </ProfilePicContainer>
      <StyledUsername>
        {arrayOfFormFields.Username ? arrayOfFormFields.Username : defaultFields[0].placeholder}
      </StyledUsername>
      <AccountInfo>
        <EnsName>{ensName}</EnsName>

        {account && chainId && (
          <>
            <Divider />
            <StyledExternalLink color="shadow1" href={getExplorerLink(chainId, account, 'address')}>
              {shortenAddress(account, 2, 4)}
            </StyledExternalLink>
          </>
        )}
      </AccountInfo>
      <Description>
        {arrayOfFormFields.Description ? arrayOfFormFields.Description : defaultFields[1].placeholder}
      </Description>
      {hasSocialFields && (
        <SocialsWrapper margin={'36px 23px 0 23px'}>
          <SocialsHeader>Socials</SocialsHeader>

          {Object.keys(arrayOfFormFields).map((item, index) => {
            if (FieldsMapping[item]?.logo)
              return (
                <SocialWrapper key={index}>
                  <img src={FieldsMapping[item].logo} />
                  <SocialFieldText>
                    {arrayOfFormFields[item] ? arrayOfFormFields[item] : FieldsMapping[item].placeholder}
                  </SocialFieldText>
                </SocialWrapper>
              );
          })}
        </SocialsWrapper>
      )}

      <BottomBarTextStyle />
    </StyledWhiteCard>
  );
}
