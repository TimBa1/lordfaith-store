import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { useState } from 'react'
import { sliderItems } from '../Data';
import { mobile } from "../responsive";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow:hidden;
  ${mobile({ display:'none' })}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index:2;
`
const Wrapper = styled.div`
  height: 100%;
  display:flex;
  transform:translateX(${props=>props.slideIndex *-100}vw)
`
const Slide = styled.div`
    width:100vw;
  height:100vh;
  display: flex;
  align-items: center;
  background-color: #${props=>props.bg}
`
// const Image = styled.div`
//     height:80%
// `
const ImgContainer = styled.div`
  height:100%;
  flex: 1;
`
const InfoContainer = styled.div`
  flex: 1;
  padding:50px
`
const Title = styled.h1`
     font-size:70px
`
const Desc = styled.p`
     margin:50px 0px;
     font-size:20px;
     font-weight:500;
     letter-spacing:2px;

`
const Button = styled.button`
    padding:10px;
    font-size:20px;
    background-color:transparent;
    cursor:pointer
`

export const Slider = () => {
    const [slideIndex,setSlideIndex] = useState(0)
    const handleClick = (direction) => {
        if (direction === 'left') {
            setSlideIndex(slideIndex>0?slideIndex-1:2)
        } else {
            setSlideIndex(slideIndex<2?slideIndex+1:0)
        }
    }
  return (
    <Container className="slidercont">
      <Arrow direction="left" onClick={()=> handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
      {sliderItems.map(item => (
        <Slide bg={item.bg} key={item.id}>
          <ImgContainer>
            < img style={{ height: '80%', marginLeft:'6rem'}} src={require('../assets/fupa.jpg') } alt='no int'/>
          </ImgContainer>
          <InfoContainer>
            <Title>{item.title}</Title>
            <Desc> {item.desc}</Desc>
            <Button>SHOP NOW</Button>
          </InfoContainer>
        </Slide>
        ))}
        {/* <Slide bg="fsfafd">
          <ImgContainer>
            <img style={{height:'90%'}} src={require('../assets/bracs 2.jpg') } alt='no internet'/>
          </ImgContainer>
          <InfoContainer>
            <Title> puma bracelet</Title>
            <Desc> Do not compromise on this or the opportunity a goof bracelet!! get 30% of now order.</Desc>
            <Button>SHOP NOW</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="fbf0f4">
          <ImgContainer>
            <img style={{height:'90%'}} src={require('../assets/bracs 3.jpg') } alt='no internet'/>
          </ImgContainer>
          <InfoContainer>
            <Title> bead bracelet</Title>
            <Desc> Do not compromise on this or the opportunity a goof bracelet!! get 30% of now order.</Desc>
            <Button>SHOP NOW</Button>
          </InfoContainer>
        </Slide> */}
      </Wrapper>
          <Arrow direction="right" onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};
