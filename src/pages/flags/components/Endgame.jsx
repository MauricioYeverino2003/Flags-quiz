import React, { useEffect, useState } from 'react'

const Endgame = ({lives, number}) => {

  const [win, setWin] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(async ()=>{
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
  }, [])

  if(loading) return <div>Loading...</div>

  return (
    <div>
      <p>{win?"Congratulations":"Wow... You need to keep practicing..."}</p>
      <img src={url} alt='...loading'/>
    </div>
  )
}

export default Endgame