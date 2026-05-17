import React, { useEffect, useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://0.0.0.0:80/')
      .then(response => response.json())
      .then(data => setMessage(data.Hello));
  }, []);

  return (
    <div>
      <header>
        <h1> React!</h1>
        <h2>Сообщение  API: {message}</h2>
      </header>
    </div>
  );
};

export default App;
