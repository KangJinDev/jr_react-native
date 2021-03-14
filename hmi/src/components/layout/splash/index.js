import React from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/react";

import {Flex} from './flex';
import {Image} from './image';
import {Text} from './text';

const SplashWrapper = styled(Flex)(
    () => css`
      height: 100%;
      background-image: url("/mike-logo.png");
      background-repeat: no-repeat;
      background-position: center;
    `,
    {
        label: "startup--mike"
    }
);

const CogRow = styled(Flex)(
    () => css`
      position: absolute;
      top: 260px;
      left: 315px;
      width: 260px;
    `
);

const Cog = styled(Image)(
    () => css`
      position: relative;
      width: 24px;
      height: 24px;
      animation-name: spin;
      animation-duration: 2000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `
);

const TextWrapper = styled(Text) (
    () => css`
      width: 100%;
      height: fit-content;
      margin-top: 300px;
      font-size: 24px;
      font-weight: bold;
      color: white;
      text-align: center;
    `
)

const Ellipsis = styled(Text)(
    () => css`
      display: inline-block;
      vertical-align: bottom;
      line-height: 1;
      color: white;
      animation: ellipsis steps(4, end) 1s infinite;
      @keyframes ellipsis {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      :nth-child(1) {
        animation-delay: 0.1s;
      }

      :nth-child(2) {
        animation-delay: 0.2s;
      }

      :nth-child(3) {
        animation-delay: 0.3s;
      }
    `
);

const Splash = () => {
    return (
        <SplashWrapper bg="reddish-orange">
            <CogRow>
                <Cog src="/mike-cog.svg" alt="Cog"/>
                <Cog src="/mike-cog.svg" left="31px" alt="Cog"/>
                <Cog src="/mike-cog.svg" left="109px" alt="Cog"/>
                <Cog src="/mike-cog.svg" left="165px" alt="Cog"/>
            </CogRow>
            <TextWrapper as="p" type="startUp">
                Starting up<Ellipsis as="span">.</Ellipsis>
                <Ellipsis as="span">.</Ellipsis>
                <Ellipsis as="span">.</Ellipsis>
            </TextWrapper>
        </SplashWrapper>
    );
};

Splash.propTypes = {
};

export default Splash;
