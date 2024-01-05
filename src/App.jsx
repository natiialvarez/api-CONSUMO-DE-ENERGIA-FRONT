import React, { useState, useEffect } from 'react';

const ProcuraDeFornecedor = () => {
  const [nome, setNome] = useState('');
  const [consumoMensal, setConsumoMensal] = useState('');
  const [estado, setEstado] = useState('');
  const [fornecedoresEncontrados, setFornecedoresEncontrados] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const buscarFornecedor = async () => {
    if (!consumoMensal) {
      setMensagem("Necessário informar o consumo mensal");
      return;
    }

    try {
      const response = await fetch('https://tiny-pear-chinchilla-gown.cyclic.app/fornecedor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ consumo_mensal: consumoMensal }),
      });
      const data = await response.json();

      if (response.status === 404) {
        setFornecedoresEncontrados([])
        setMensagem(data.mensagem)
        return
      }

      if (response.ok) {
        setFornecedoresEncontrados(data);
        setMensagem('')
        return
      }


    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      setMensagem('Erro ao buscar fornecedores');
    }
  };
  return (
    <div style={{ textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1 style={{ color: 'blueviolet' }}>
        Economize até 40% na conta de luz da sua empresa sem precisar investir
      </h1>
      <h2 style={{ textAlign: 'center' }}>Procure o forncedor de energia ideal para você!</h2>
      <h3 style={{ textAlign: 'center' }}>Coloque o seu consumo mensal e nos iremos mostrar quais os fornecedores atende aos seus requisitos </h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '10px',
          padding: '20px',
          borderRadius: '10px',
          border: '2px solid black',
          width: '400px',
          height: '200px',
          fontSize: '16px'
        }}>
          <input
            style={{
              marginBottom: '10px',
              padding: '8px',
              borderRadius: '5px',
              border: '2px solid black',
              width: '250px',
              fontSize: '16px'
            }}
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />
          <input
            style={{
              marginBottom: '10px',
              padding: '8px',
              borderRadius: '5px',
              border: '2px solid black',
              width: '250px',
              fontSize: '16px'
            }}
            type="text"
            value={consumoMensal}
            onChange={(e) => setConsumoMensal(e.target.value)}
            placeholder="Consumo Mensal"
            required
          />
          <input
            style={{
              marginBottom: '10px',
              padding: '8px',
              borderRadius: '5px',
              border: '2px solid black',
              width: '250px',
              fontSize: '16px'
            }}
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            placeholder="Estado"
          />
          <button
            style={{
              backgroundColor: 'greenyellow',
              color: 'black',
              fontWeight: 'bold',
              border: '2px solid black',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
            onClick={buscarFornecedor}
          >
            Buscar Fornecedor
          </button>
        </div>
      </div>

      {mensagem && fornecedoresEncontrados.length === 0 && <p>{mensagem}</p>}
      {
        fornecedoresEncontrados.length > 0 && ((
          <div style={{
            display: 'flex',
            flexDirection: 'row'
          }} >
            <p>Fornecedores encontrados:</p>
            <div>
              {fornecedoresEncontrados.map((fornecedor, index) => (
                <div key={index} style={{
                  backgroundColor: 'blue',
                  width: '150px',
                }} >
                  <p style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>{fornecedor.nome}</p>
                  <p>{fornecedor.custo_por_kwh}</p>
                </div>
              ))}
            </div>
          </div>
        ))
        /* fornecedoresEncontrados.length > 0 && (
           <div>
             <p>Fornecedores encontrados:</p>
             <ul>
               {fornecedoresEncontrados.map((fornecedor, index) => (
                 <li key={index}>{fornecedor.nome}</li>
               ))}
             </ul>
           </div>
         )*/
      }
    </div >
  );
};

export default ProcuraDeFornecedor;
