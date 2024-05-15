// DictionaryApp.js
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Word from './components/Word';
import Loading from './components/Loading.jsx';
import Logo from './assets/img/logo.png';
import NoWordFound from './components/NoWordFound';
import RandomCard from './components/RandomCard';
import wordsService from './services/Words';

const staticRandomWords = [ 'computer', 'guitar', 'mountain', 'ocean', 'sunshine', 'rainbow', 'butterfly', 'cupcake', 'penguin', 'fireworks', 'umbrella', 'library', 'garden', 'bicycle', 'chocolate', 'happiness', 'adventure', 'treasure', 'piano', 'telephone', 'soccer', 'friendship', 'volcano', 'waterfall', 'butterfly', 'lighthouse', 'dragon', 'moonlight', "Love", "Noodle" ];



function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [wordData, setWordData] = useState(null);
  const [notFound, setNotFound] = useState(null);
  const [error, setError] = useState('');
  const [randomMeanings, setRandomMeanings] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setRandomMeanings(staticRandomWords);
  }, []);

  // const fetchRandomWords = async () => {
  //   try {
  //     const wordsArray = await wordsService.getWordsList();

  //     const uniqueAlphabets = new Set();
  //     const selectedWords = [];

  //     while (uniqueAlphabets.size < 10 && selectedWords.length < 10) {
  //       const randomIndex = Math.floor(Math.random() * wordsArray.length);
  //       const word = wordsArray[randomIndex];
  //       const firstLetter = word[0].toLowerCase();

  //       if (!uniqueAlphabets.has(firstLetter)) {
  //         uniqueAlphabets.add(firstLetter);
  //         selectedWords.push(word);
  //       }
  //     }

  //     setRandomMeanings(selectedWords);
  //   } catch (error) {
  //     console.error('Error fetching random words:', error);
  //   }
  // };




  const getDataWord = async (query) => {
    setLoading(true);
    setNotFound(false);
    setWordData(null);
    try {
      const response = await wordsService.getDictionaryWord(query);
      const responseData = response[0];
      setWordData(responseData);
    } catch (error) {
      console.error('Error fetching word data:', error.response.data);
      setLoading(false);
      setNotFound({
        title:  error.response.data.title,
        message:  error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = () => {
    if (searchQuery) {
      setError('');
      setIsVisible(false);
      getDataWord(searchQuery);
    } else {
      setError('Please enter a word...');
      return;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }


  const handleRandomSearch = (meaning) => {
    setIsVisible(false);
    setSearchQuery(meaning);
    getDataWord(meaning);
  };

  const handleBackHome = () => {
    setSearchQuery('');
    setNotFound(null);
    setIsVisible(true);
    setWordData(null);
  }



  return (
    <>
      <Header logo={Logo} title="Vocab Voyage"/>
      <div className="header-search py-4">
        <div className="container-md container-fluid">
          <div className="search-wrapper mb-4">
            <form className="form-wrapper position-relative d-flex">
              <input
                type="text"
                className="form-control search-box"
                placeholder="Search your word..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button className="btn theme-btn search-btn" type="button" onClick={handleSearch}>Search</button>
            </form>
            {error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </div>
      <section className="word-result-sec my-4 mt-lg-5">
        <div className="container-md container-fluid">
          <div className="input-group mb-3">

          </div>
          {loading && <Loading />}
          {
            wordData && (
              <div>
                <Word word={wordData}  handleBackHome={handleBackHome}/>
              </div>
            )
          }
          {notFound && ( 
            <NoWordFound
              title={notFound.title}
              message={notFound.message}
              handleBackHome={handleBackHome}
            />
          )}
        </div>
      </section>
      {
        isVisible && (
          <section className='random-words-sec my-4 mt-lg-5'>
            <div className="container-md container-fluid">
              <div className="row justify-content-center g-3">
                {randomMeanings.map((meaning, index) => (
                  <RandomCard key={index} meaning={meaning} onSearch={handleRandomSearch}/>
                ))}
              </div>
            </div>
          </section>
        )
      }
    </>
  );
}

export default App;
