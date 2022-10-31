import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import {Link} from 'react-router-dom';
import env from "react-dotenv";

function Veggie() {
  const [veggie, setVeggie] = useState([]);
  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem('veggie');
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${env.REACT_API_KEY}&number=9&tags=vegetarian`)
      const data = await api.json();
      localStorage.setItem('veggie', JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log(data);
    }
  }


  return (
    <>
      <h2> Veggie Picks </h2>
      <Wrapper >
        {veggie.map((recipe) => {
          return (
            <Card>
              <Link to={'/recipe/' + recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <p> {recipe.title} </p>

              </Link>
            </Card>
          )
        })}
       </Wrapper>
    </>  
  )
}


// transform: translate(-50%, 0%);

const Wrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 3rem;
  margin-bottom: 50px;
`

const Card = styled.div`
  a {
    text-decoration: none;
  }

  img {
    border-radius: 2rem;
    width: 100%;
    
    object-fit: cover;
  }
  p {
    width: 85%;
    text-align: center;
    
    font-weight: 600;
    font-size: 1rem;
    padding-top: 10px;
  }
`
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))
`

export default Veggie;

       /* <Splide options={{
        perPage: 3,
        arrows: false,
        pagination: false,
        drag: 'free',
        gap: '5rem'
      }}>
        {veggie.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={'/recipe/' + recipe.id}>
                  <p> {recipe.title} </p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          )
        })}
      </Splide> */

//       const Wrapper = styled.div`
//   margin: 4rem 0;
// `
// const Card = styled.div`
//   min-height: 25rem;
//   border-radius: 2rem;
//   overflow: hidden;
//   position: relative;

//   img {
//     border-radius: 2rem;
//     position: absolute;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
//   p {
//     position: absolute;
//     z-index: 10;
//     left: 4%;
//     bottom: 4%;
    
//     color: white;
//     width: 100%;
//     text-align: center;
//     font-weight: 600;
//     font-size: 1rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `