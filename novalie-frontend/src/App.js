import './App.css';
import { useEffect, useState } from "react";
import Controllers from './components/Controllers';
import CurrencyCards from './components/CurrencyCards';
import DataTable from './components/DataTable';
import axios from 'axios';

function App() {
  const [paymentData, setPaymentData] = useState();
  const [office, setOffice] = useState();
  const [agent, setAgent] = useState();
  const [executive, setExecutive] = useState();

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(number);
  };

  useEffect(() => {
    document.title = "Novalie Prueba Técnica";
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          office: office,
          agent: agent,
          executive: executive,
        };

        const response = await axios.get('http://localhost:3001/payment-data', {
          params: params,
        });

        const data = response.data;
        console.log(data)

        if (response.status === 200) {
          setPaymentData(data);
        } else {
          console.error(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
  }, [office, agent, executive]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prima por cobrar</h1>        
      </header>
      <Controllers setOffice={setOffice} setAgent={setAgent} setExecutive={setExecutive} />
      <CurrencyCards formatNumber={formatNumber} />
      <DataTable formatNumber={formatNumber} paymentData={paymentData}/>
    </div>
  );
}

export default App;
