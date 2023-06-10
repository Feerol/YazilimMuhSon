import React, { useState } from 'react';
import './SecondPage.css';
function SecondPage() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse('Loading Article...');
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  //Gelen response'u formatlı hale getiriyoruz.

  const formatResponse = (message) => {
    const parts = message.split(", ");
    const tableRows = parts
      .map((part, i) => {
        if (i % 2 === 0) {
          return (
            <tr key={i}>
              <th>{part}</th>
              <td>
                <a href={parts[i + 1]}>{parts[i + 1]}</a>
              </td>
            </tr>
          );
        } else {
          return null;
        }
      })
      .filter((row) => row !== null);
  
    return (
      <div>
        <table>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>STFU THIS IS A CHATBOT</h1>
      <form onSubmit={handleSubmit}>
        <div><textarea
          value={message}
          placeholder='Ask me dude ...'
          onChange={(e) => setMessage(e.target.value)}> 
        </textarea></div>
        <div><button type="submit">Submit</button></div>
      </form>
      {response &&<div id="baseliner_yazi"><b>ChatGPT:</b></div>}
      {response && <div id="GPT_response">{formatResponse(response)}</div>}
    </div>
  );
}
export default SecondPage;











