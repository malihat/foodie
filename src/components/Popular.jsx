import {useEffect, useState} from 'react';
import env from 'react-dotenv';
import styled from 'styled-components';
import {Splide, SplideSlide} from '@splidejs/react-splide';
// import { Grid } from '@splidejs/splide-extension-grid';
import '@splidejs/splide/dist/css/splide.min.css';
import {Link} from 'react-router-dom';


function Popular() {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem('popular');
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${env.REACT_API_KEY}&number=5?_limit=5`)
      const data = await api.json();
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data);
    }
  }

  return (
    <>
      <h2> Popular Picks </h2>
      <Wrapper >
        {popular.map(recipe => {
          return (
            <Card>
              <Link to={'/recipe/' + recipe.id}>

                <img src={recipe.image} alt={recipe.title} />
                <p> {recipe.title} </p>
              
              </Link>
            </Card>
          )
        })

        }
        {/* <Splide options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem'
        }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={'/recipe/' + recipe.id}>
                    <img src={recipe.image} alt={recipe.title} />
                    <p> {recipe.title} </p>
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            )
          })}
        </Splide> */}
      </Wrapper>
    </>

  )
}


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

export default Popular;
  // min-height: 25rem;
  // position: absolute;
  // z-index: 10;
  // left: 5%;
  // bottom: 0%;
  // transform: translate(-50%, 0%);


  // img {
    // border-radius: 2rem;
    // position: absolute;
    // left: 0;
  // }