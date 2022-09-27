import './App.css';
import {useRef, useState} from 'react'

function App() {

  const [lucro, setLucro] = useState()

  let nomeRef = useRef();
  let quantRef = useRef();
  let valorRef = useRef();
  let investRef = useRef();
  let lucroRef = useRef();


  const handleSubmit = (event) => {
    event.preventDefault()

    let nome = event.target[0].value
    let quantidade = event.target[1].value
    let valor = event.target[2].value
    let investimento = event.target[3].value

    let valorTotal = quantidade * valor
    let calculoLucro = valorTotal - investimento

    let mensage = `O ${nome}, teve ${calculoLucro} de Lucro`

    console.log(mensage)

    setLucro(calculoLucro)

    const formData = new FormData();
    formData.append('nome', event.target[0].value);
    formData.append('quantidade', event.target[1].value);
    formData.append('valor', event.target[2].value);
    formData.append('investimento', event.target[3].value);
    formData.append('lucro', calculoLucro);

    fetch(
      "http://localhost/stock-system/api/product/create",
      {
        method: 'POST',
        body: formData,  
      }
      )
      .then((response) => response.json())
      .then((data) => {
        nomeRef.current.value = ''
        quantRef.current.value = ''
        valorRef.current.value = ''
        investRef.current.value = ''
        lucroRef.current.value = ''
        alert("Deu certo")
      });
  }
  

  return (
    <div>
     <h1>Cálculo de Lucros</h1>
     <form onSubmit={(event) => handleSubmit(event)}>
      <input placeholder='Nome' id='nome' type="text" ref={nomeRef}/>
      <input placeholder='Quantidade' id='quant' type="number" ref={quantRef}/>
      <input placeholder='Valor Sugerido' id='valor' type="text" ref={valorRef}/>
      <input placeholder='Investimento' id='invest' type="text" ref={investRef}/>
      <input placeholder='Calcular' type="submit" id='btn'/>
     </form>
      <p>Lucro: {lucro}</p>
    </div>
  );
}

export default App;
