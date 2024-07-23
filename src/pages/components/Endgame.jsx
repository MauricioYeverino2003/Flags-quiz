import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Endgame = ({lives, number}) => {

  const [win, setWin] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect( ()=>{
    fetchImage();
  }, [])

  const fetchImage = async () => {
    const result = (lives > 0);
    setWin(result);
    const type = result ? 'happy' : 'cry';
    const url = `https://api.waifu.pics/sfw/${type}`;
    try {
      const response = await fetch(url);
      const image = await response.json();
      if(!response.ok){
        throw new Error(`Response Status: ${response.status}`);
      }
      setUrl(image.url);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  }

  if(loading) return <div>Loading...</div>

  return (
    <div className='endgame-container'>
      <Link to={'/'}>
        <button className='return-button'>Return</button>
      </Link>
      <p>{win?"Congratulations":"Wow... You need to keep practicing...\n"}</p>
      <img src={url} alt='...loading'/>
    </div>
  )
}

export default Endgame