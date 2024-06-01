import { useState, useEffect, useRef  } from 'react';
import PlayBtn from './PlayBtn';

function Word({ word, handleBackHome }) {
  const [audioSrc, setAudioSrc] = useState('');
  const [phoneticText, setPhoneticText] = useState('');
  
  const audioRef = useRef(null);


useEffect(() => {
  if (word && word.phonetics && word.phonetics.length > 0) {
    word.phonetics.forEach((phonetic) => {
      if (!audioSrc && phonetic.audio) {
        setAudioSrc(phonetic.audio);
      }
      if (!phoneticText && phonetic.text) {
        setPhoneticText(phonetic.text);
      }
    });
  }
}, []);


const handlePlay = () => {
  if (audioRef.current) {
    audioRef.current.play();
  }
};


  
  return (

    <div className='card'>
      <div className="card-body">
        <div className='mb-3 text-end'>
          <button className='btn theme-btn go-home-btn' onClick={handleBackHome}>Back to Home</button>
        </div>
        <div className="heading-wrap">
          <h2  className="text-uppercase fw-bold">{word.word}</h2>
          <span className="text-muted fs-6">{word.phonetic || phoneticText}</span>
          <div className="audio-player">
            {audioSrc && (
              <audio id="audio" src={audioSrc} ref={audioRef}></audio>
            )}
            {audioSrc && (
              <button id="playBtn" type="button" className="btn border-0" onClick={handlePlay}><PlayBtn /></button>
            )}
          </div>
        </div>
        <div className="meaning-wrapper">
          <ul id="meaningWrapper" className="p-0 m-0 list-wrapper">
              {word.meanings.map((item, index) => (
              <li key={index}>
                  <strong className='text-uppercase'>{item.partOfSpeech}</strong>
                  {item.synonyms.length > 0 && (
                  <span className="text-capitalize"><strong>Synonyms</strong>: {item.synonyms.join(", ")}</span>
                  )}
                  {item.antonyms.length > 0 && (
                  <span className="text-capitalize"><strong>Antonyms</strong>: {item.antonyms.join(", ")}</span>
                  )}
                  {item.definitions.map((definition, index) => (
                  <span key={index}>- {definition.definition}</span>
                  ))}
              </li>
              ))}
          </ul>
        </div>
      </div>  
    </div>
  );
}

export default Word;
