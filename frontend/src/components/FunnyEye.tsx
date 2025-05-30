import React from "react";
import styled from "styled-components";

const FunnyEye = () => {
  return (
    <StyledWrapper>
      <div className="click">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <button className="button up">
          <div className="speak dblink">
            <div className="wrap">
              <div className="eye double-blink" />
              <div className="eye double-blink" />
            </div>
          </div>
          <p />
          <p />
          <p />
          <div className="speak doblink">
            <div className="wrap">
              <div className="eye down" />
              <div className="eye down" />
            </div>
          </div>
          <div className="speak rblink">
            <div className="wrap">
              <div className="eye right-blink" />
              <div className="eye right-blink" />
            </div>
          </div>
          <div className="speak ublink">
            <div className="wrap">
              <div className="eye up-blink" />
              <div className="eye up-blink" />
            </div>
          </div>
        </button>
        <button disabled className="button shadow" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    cursor: inherit;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: solid 4px rgba(255, 255, 255, 0);
    background-color: hsl(300, 10%, 8%);
    font-size: 20px;
    color: white;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
  }
  .button:before {
    content: "";
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    width: 0;
    height: 0;
    border-top: solid 10px rgba(255, 0, 0, 0);
    border-bottom: solid 10px hsl(300, 10%, 8%);
    border-right: solid 10px rgba(255, 0, 0, 0);
    border-left: solid 10px rgba(255, 0, 0, 0);
  }
  .button.up {
    z-index: 2;
  }
  .click .button .speak:nth-child(n + 2) {
    display: none;
  }
  button:hover,
  .click span:nth-child(5):hover ~ button,
  .click span:nth-child(6):hover ~ button {
    left: 100%;
    top: 0;
    transform: translateX(-100%);
  }
  button:hover,
  .click span:nth-child(5):hover ~ .button .speak:is(.dblink, .rblink),
  .click span:nth-child(6):hover ~ .button .speak:is(.dblink, .rblink) {
    display: none !important;
  }
  button:hover,
  .click span:nth-child(5):hover ~ .button .speak:is(.doblink),
  .click span:nth-child(6):hover ~ .button .speak:is(.doblink) {
    display: flex !important;
  }
  button:hover,
  .click span:nth-child(2):hover ~ button,
  button:hover,
  .click span:nth-child(3):hover ~ button {
    left: 0%;
    top: 0;
    transform: translateX(0%);
  }
  button:hover,
  .click span:nth-child(2):hover ~ .button .speak:is(.dblink, .hihi),
  .click span:nth-child(3):hover ~ .button .speak:is(.dblink, .hihi) {
    display: none !important;
  }
  button:hover,
  .click span:nth-child(2):hover ~ .button .speak:is(.rblink),
  .click span:nth-child(3):hover ~ .button .speak:is(.rblink) {
    display: flex !important;
  }
  button:hover,
  .click span:nth-child(1):hover ~ button,
  button:hover,
  .click span:nth-child(4):hover ~ button {
    top: 100%;
    left: 0;
    transform: translateY(-100%);
  }
  button:hover,
  .click span:nth-child(1):hover ~ .button .speak:is(.dblink, hihi, rblink),
  .click span:nth-child(4):hover ~ .button .speak:is(.dblink, hihi, rblink) {
    display: none !important;
  }
  button:hover,
  .click span:nth-child(1):hover ~ .button .speak:is(.ublink),
  .click span:nth-child(4):hover ~ .button .speak:is(.ublink) {
    display: flex !important;
  }
  .click {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0px;
    position: relative;
    border-radius: 5px;
  }
  .click span {
    width: 80px;
    height: 80px;
    background-color: transparent;
    display: flex;
  }
  .shadow {
    color: transparent;
    transition: all 0.5s ease;
    z-index: 1;
    pointer-events: none;
    filter: blur(14px);
    background-color: hsla(240, 24%, 12%, 0.384);
  }
  .speak {
    font-size: 15px;
  }
  .wrap {
    position: relative;
    width: 100px;
    height: 40px;
    margin: 0 2rem;
    color: black;
    line-height: 40px;
    font-size: 2rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 0;
    display: flex;
    gap: 5px;
  }
  .eye {
    position: relative;
    margin: auto;
    top: 0;
    bottom: 0;
    background: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-block;
    animation: double-blink 4s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    overflow: hidden;
  }
  @keyframes double-blink {
    0%,
    8% {
      height: 40px;
    }
    10%,
    12% {
      height: 10px;
    }
    13% {
      height: 40px;
    }
    14%,
    16% {
      height: 0;
    }
    18%,
    100% {
      height: 40px;
    }
  }
  .eye:before {
    content: "";
    position: absolute;
    margin: auto;
    width: 10px;
    height: 10px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 50%;
    background: rgba(20, 20, 20, 1);
  }
  .down:before {
    animation: downb 4s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }
  @keyframes downb {
    0%,
    10% {
      top: 0;
      left: -10px;
    }
    20%,
    40% {
      top: 50%;
      left: -10px;
    }
    50%,
    100% {
      top: 0;
      left: -10px;
    }
  }
  .right-blink:before {
    animation: rightb 4s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }
  @keyframes rightb {
    0%,
    10% {
      top: 0;
      left: 50%;
    }
    20%,
    40% {
      top: 50%;
      left: 50%;
    }
    50%,
    100% {
      top: 0;
      left: 50%;
    }
  }
  .up-blink:before {
    animation: upb 4s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }
  @keyframes upb {
    0%,
    10% {
      top: 0;
      left: 0%;
    }
    20%,
    40% {
      top: -50%;
      left: 0%;
    }
    50%,
    100% {
      top: 0;
      left: 0%;
    }
  }
`;

export default FunnyEye;
