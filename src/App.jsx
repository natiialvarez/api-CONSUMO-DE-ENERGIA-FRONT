import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import './components/App.css'
import { FiInstagram, FiPhoneForwarded } from 'react-icons/fi'
import { AiOutlineMail } from "react-icons/ai";

const ProcuraDeFornecedor = () => {
  const [consumoMensal, setConsumoMensal] = useState('');
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

  const handleConsumoMensalChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === '') {
      setConsumoMensal(value);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://energiawise.com.br/wp-content/uploads/2019/04/Como-a-energia-solar-pode-ajudar-no-fornecimento-de-eletricidade-em-energia-de-todo-o-Brasil.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh'
      }}
    >
      <div style={{ textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Header />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='box'>
          <input
            className='consumo'
            type="text"
            value={consumoMensal}
            onChange={handleConsumoMensalChange}
            placeholder="Consumo Mensal. Ex: 300"
            required
          />
          <button
            className='botao'
            onClick={buscarFornecedor}
          >
            Buscar Fornecedor
          </button>
        </div>
      </div>

      {mensagem && fornecedoresEncontrados.length === 0 && <p className='mensagem'>{mensagem}</p>}
      {
        fornecedoresEncontrados.length > 0 && (
          <div className="fornecedores">
            <p style={{ marginTop: '5px', marginBottom: '5px' }}>Fornecedores encontrados:</p>
            <div>
              <p>{fornecedoresEncontrados.map((fornecedor, index) => (
                <Card fornecedor={fornecedor} key={index} />))} </p>
            </div>
          </div>
        )
      }
      <footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', padding: '3px 0' }}>
        <div>
          <p>Entre em contato:</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <FiPhoneForwarded size={20} color='black' />
            <p style={{ margin: '0', marginLeft: '5px' }}>+55 (11) 93409-0834</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <FiInstagram size={20} color='black' />
            <p style={{ margin: '0', marginLeft: '5px' }}>clarkeenergia</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AiOutlineMail size={20} color='black' />
            <p style={{ margin: '0', marginLeft: '5px' }}>contato@clarke.com.br</p>
          </div>
        </div>
      </footer>
    </div>

  );


};

export default ProcuraDeFornecedor;
