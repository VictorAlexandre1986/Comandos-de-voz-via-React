// import './App.css';
// import  { useState, useEffect } from 'react';

// function App() {
//   const [transcript, setTranscript] = useState('');

//   const commands = [
//     {
//       command: 'reset',
//       callback: () => setTranscript(''),
//     },
//     {
//       command: 'Limpar',
//       callback: () => setTranscript(''),
//     },
//     {
//       command: 'Abrir',
//       callback: (site) => window.open('http://' + site),
//     },
//     {
//       command: 'Aumentar fonte',
//       callback: () => {
//         document.getElementById('content').style.fontSize = '22px';
//       },
//     },
//     {
//       command: 'Diminuir fonte',
//       callback: () => {
//         document.getElementById('content').style.fontSize = '16px';
//       },
//     },
//     {
//       command: 'mudar cor',
//       callback: (color) => {
//         document.getElementById('content').style.color = color;
//       },
//     },
//   ];

//   useEffect(() => {
//     // Verifica se o navegador suporta a API de reconhecimento de fala
//     if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
//       console.log("Browser doesn't support speech recognition.");
//     } else {
//       // Inicializa o reconhecimento de fala
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognition = new SpeechRecognition();

//       // Configura o reconhecimento de fala
//       recognition.continuous = true;
//       recognition.lang = 'pt-BR';

//       // Evento de resultado de reconhecimento de fala
//       recognition.onresult = function (event) {
//         let interimTranscript = '';
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           interimTranscript += event.results[i][0].transcript;
//         }
//         setTranscript(interimTranscript);

//         // Aqui você pode verificar se a transcrição corresponde a algum comando e executar a ação correspondente
//         commands.forEach(({ command, callback }) => {
//           if (interimTranscript.includes(command)) {
//             callback();
//           }
//         });
//       };

//       // Inicia a escuta
//       recognition.start();

//       // Cleanup do efeito
//       return () => {
//         recognition.stop();
//       };
//     }
//   }, [commands]);

//   return (
//     <>
//       <div className='container'>
//         <div className='nav'>
//           <h2>Fale alguma coisa</h2>
//         </div>
//         <div id='content'>
//           {transcript}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');
  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const file = new Blob([transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'transcript.txt';
    document.body.appendChild(element);
    element.click();
  };

  const commands = [
    {
      command: 'reset',
      callback: () => setTranscript(''),
    },
    {
      command: 'Limpar',
      callback: () => setTranscript(''),
    },
    {
      command: 'Abrir',
      callback: (site) => window.open('http://' + site),
    },
    {
      command: 'Aumentar fonte',
      callback: () => {
        document.getElementById('content').style.fontSize = '22px';
      },
    },
    {
      command: 'Diminuir fonte',
      callback: () => {
        document.getElementById('content').style.fontSize = '16px';
      },
    },
    {
      command: 'mudar cor',
      callback: (color) => {
        document.getElementById('content').style.color = color;
      },
      
    },{
        command: 'Salvar texto',
        callback: downloadTxtFile,
    },
    
  ];

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log("Browser doesn't support speech recognition.");
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.lang = 'pt-BR';

      recognition.onresult = function (event) {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          interimTranscript += event.results[i][0].transcript;
        }
        setTranscript((prevTranscript) => prevTranscript + ' ' + interimTranscript);

        commands.forEach(({ command, callback }) => {
          if (interimTranscript.includes(command)) {
            callback();
          }
        });
      };

      recognition.start();

      return () => {
        recognition.stop();
      };
    }
  }, [commands]);

  return (
    <>
      <div className='container'>
        <div className='nav'>
          <h2>Fale alguma coisa</h2>
        </div>
        <div id='content'>
          {transcript}
        </div>
      </div>
    </>
  );
}

export default App;
