import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { NimiSignatureColor } from 'theme';

const CountdownWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

const CountdownValue = styled.div`
  font-weight: 600;
  font-size: 31.3061px;
  line-height: 34px;
  letter-spacing: -0.02em;
  ${NimiSignatureColor};
  font-stretch: 120;
`;

const CountdownLabel = styled.div<{ dark: boolean }>`
  font-size: 14px;
  font-weight: 700;
  line-height: 26px;
  ${({ dark }) =>
    dark
      ? `
    color: white;
    `
      : `
      color:#8A97AA;
  `}
  text-align: center;
  letter-spacing: -0.02em;
`;
interface CountdownProps {
  targetDate: string;
  dark: boolean;
}
export const Countdown = ({ targetDate, dark }: CountdownProps) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const parsedTargetDate = new Date(targetDate);
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = Number(parsedTargetDate) - Number(currentTime);
      setCountdown(formatCountdown(timeDifference));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const formatCountdown = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
  };

  return (
    <CountdownWrapper>
      <CountdownItem>
        <CountdownValue>{countdown.days}</CountdownValue>
        <CountdownLabel dark={dark}>Days</CountdownLabel>
      </CountdownItem>
      <CountdownItem>
        <CountdownValue>{countdown.hours}</CountdownValue>
        <CountdownLabel dark={dark}>Hours</CountdownLabel>
      </CountdownItem>
      <CountdownItem>
        <CountdownValue>{countdown.minutes}</CountdownValue>
        <CountdownLabel dark={dark}>Minutes</CountdownLabel>
      </CountdownItem>
      <CountdownItem>
        <CountdownValue>{countdown.seconds}</CountdownValue>
        <CountdownLabel dark={dark}>Seconds</CountdownLabel>
      </CountdownItem>
    </CountdownWrapper>
  );
};
