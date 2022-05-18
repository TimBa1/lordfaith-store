import { Add, Remove } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Announcement } from '../components/Announcement'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import StripeCheckout from 'react-stripe-checkout'
import { userRequest } from '../requestMethods';
import { Link, useHistory } from 'react-router-dom'

const KEY = "pk_test_51KmOxbB3yNlnVSxfkmgAyMSfCbq8S06P1rRN1u1f4UjFrUP8V9FHlMnozt49vHmSUs4ANtIjcjydbdQfzrHqaya900FWY6TPcD";

const Container = styled.div`

`
const Wrapper = styled.div`
  padding:20px;
  ${mobile({ padding:'10px' })}
`
const Title = styled.h1`
  font-weight:300;
  text-algin:center;
`
const Top = styled.div`
  display:flex;
  align-item:center;
  justify-content:space-between;
  padding:20px;
`
const TopButton = styled.button`
  padding:10px;
  font-weight:600;
  cursor:pointer;
  border:${props => props.type === 'filled' && 'none'};
  background-color:${props => props.type === 'filled' ? 'black': 'transparent'};
  color:${props => props.type === 'filled' && 'white'};
  
`
const TopTexts = styled.div`
${mobile({ display:'none' })}
`
const TopText = styled.span`
  text-decoration:underline;
  cursor:pointer;
  margin:0px 10px;
`
const Bottom = styled.div`
  display:flex;
  justify-content:center;
  ${mobile({ flexDirection:'column' })}
`
const Info = styled.div`
  flex:3;
`
const Product = styled.div`
  display:flex;
  justify-content:space-between;
  ${mobile({ flexDirection:'column' })}
`
const ProductDetails = styled.div`
  flex:2;
  display:flex;
`
const Image = styled.img`
  width:200px
`
const Details = styled.div`
  padding:20px;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
`
const ProductName = styled.span`

`
const ProductId = styled.span`

`
const ProductColor = styled.span`
  width:20px;
  height:20px;
  border-radius:50%;
  background-color:${props=>props.color}
`
const ProductSize = styled.div`

`

const PriceDetails = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
`

const ProductAmountContainer = styled.div`
  display:flex;
  align-items:center;
  margin-bottom:20px;
`
const ProductAmount = styled.div`
  font-size:24px;
  margin:5px;
  ${mobile({ margin:'5px 15px' })}
`
const ProductPrice = styled.div`
  font-size:30px;
  font-weight:200;
  ${mobile({ marginBottom:'20px' })}
`
const Hr = styled.hr`
  background-color:#eee;
  border:none;
  height:3px
`
const Summary = styled.div`
  flex:1;
  border:0.5px solid lightgray;
  border-radius:10px;
  padding:20px;
  height:50vh;
`
const SummaryTitle = styled.h1`
  font-weight:400;
`
const SummaryItem = styled.div`
  margin:30px 0px;
  display:flex;
  justify-content:space-between;
  font-weight:${props => props.type === 'total' && '500'};
  font-size:${props=>props.type==='total'&&'24px'}
`
const SummaryItemTitle = styled.span`

`
const SummaryItemPrice = styled.span`

`
const Button = styled.button`
  width:100%;
  padding:10px;
  background-color:black;
  color:white;
  font-weight:600;
  cursor:pointer;

`
function Cart() {
  const cart = useSelector(state => state.cart);
  const [stripeToken, setStripeToken] = useState(null)
  const history = useHistory()

  const onToken = (token) => {
    setStripeToken(token)
  }
  
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
          history.push("/success",{data:res.data})
      } catch { }
    };
  stripeToken && makeRequest();
},[stripeToken,cart.total,history])

  return (
      <Container>
          <Navbar />
          <div style={{height:'30px'}}></div>
          <Announcement />
          <Wrapper>
            <Title>Your Bag</Title>
            <Top>
              <Link to="/">
              <TopButton>Continue Shopping</TopButton>
              </Link>
              <TopTexts>
                <TopText>Shopping Bag 1</TopText>
                <TopText>your wishlist</TopText>
              </TopTexts>
              <TopButton type='filled'>Checkout Now</TopButton>
            </Top>
            <Bottom>
              <Info>
              {cart.products.map(product =>(<><Product>
              <ProductDetails>
                  <Image src={product.img}/>
                    <Details>
                      <ProductName><b>Product: </b>{product.title}</ProductName>
                    <ProductId><b>ID: </b>{ product._id}</ProductId>
                    <ProductColor color={product.color}/>
                    <ProductSize><b>size: </b>{product.size}</ProductSize>
                    </Details>
                  </ProductDetails>
                  <PriceDetails>
                    <ProductAmountContainer>
                      <Add/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove/>
                    </ProductAmountContainer>
                  <ProductPrice>{product.price* product.quantity}</ProductPrice>
                  </PriceDetails>
                </Product> 
                 <Hr/>
              </>
                ))}
                
                
{/*                
                <Product>
                  <ProductDetails>
                    <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png"/>
                    <Details>
                      <ProductName><b>Product: </b>Silver Bracelet</ProductName>
                      <ProductId><b>ID: </b>123456789</ProductId>
                      <ProductColor color="silver"/>
                      <ProductSize><b>size: </b>13"</ProductSize>
                    </Details>
                  </ProductDetails>
                  <PriceDetails>
                    <ProductAmountContainer>
                      <Add/>
                        <ProductAmount>2</ProductAmount>
                      <Remove/>
                    </ProductAmountContainer>
                    <ProductPrice>N 7,000</ProductPrice>
                  </PriceDetails>
                </Product> */}
              </Info>
              <Summary>
                <SummaryTitle>Order Summary</SummaryTitle>
                <SummaryItem>
                  <SummaryItemTitle>Sub Total</SummaryItemTitle>
              <SummaryItemPrice>N {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemTitle>EStimated Delivery</SummaryItemTitle>
                  <SummaryItemPrice>N 2,100</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemTitle>Discount</SummaryItemTitle>
                  <SummaryItemPrice>N -200</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemTitle >Total</SummaryItemTitle>
                  <SummaryItemPrice>N {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <StripeCheckout
                  name="Lordfaith Store"
                  image=""
                  billingAddress
                  shippingAddress
                  description={`your total is N ${cart.total}`} 
                  amount={cart.total*100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button>CHECKOUT</Button>
                </StripeCheckout>
              </Summary>
            </Bottom>
          </Wrapper>
          <Footer/>
    </Container>
  )
}

export default Cart