import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [srcLang, setSrcLang] = useState('en');
  const [tgtLang, setTgtLang] = useState('fr');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    setTranslatedText("")
    setError('.....');
    try {
      const response = await axios.post('http://127.0.0.1:8000/translate', {
        text,
        tgt_lang: tgtLang,
        src_lang: srcLang
      });
      setTranslatedText(response.data.translated_text);
    } catch (error) {
      console.error('Error translating text:', error);
      setError('An error occurred while translating the text.');
    }
    setLoading(false);
  };

  return (
    <div className='wrapper'>
      <h1>Translate Text</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
        style={{fontSize:"30px"}}
      />
      <div style={{marginTop:"3rem"}}>
        <label>Target Language:</label>
        <select value={tgtLang} onChange={(e) => setTgtLang(e.target.value)}>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          {/* Add more languages as needed */}
        </select>
      </div>
      <button onClick={handleTranslate} disabled={loading} style={{marginTop: "3rem"}}>
        {loading ? 'Translating...' : 'Translate'}
      </button>
      <h2>Translated Text</h2>
      <p style={{fontSize: "xx-large", color: "blueviolet"}}>{translatedText}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
