import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const Controllers = ({ setOffice, setAgent, setExecutive }) => {
const [officeOptions, setOfficeOptions] = useState([]);
const [agentOptions, setAgentOptions] = useState([]);

const handleOfficeChange = (selectedOption) => {
setOffice(selectedOption.value);
};

const handleAgentChange = (selectedOption) => {
setAgent(selectedOption.value);
};

const handleExecutiveChange = (selectedOption) => {
setExecutive(selectedOption.value);
};

const executiveOptions = [
    { value: true, label: 'Si' },
    { value: false, label: 'No' },
];

useEffect(() => {    
    fetch('http://localhost:3001/data-options')
        .then((response) => response.json())
        .then((data) => {
        setOfficeOptions(data.officeOptions);
        setAgentOptions(data.agentOptions);
        })
        .catch((error) => console.error('Error fetching options:', error));
}, []);

return (
    <div className='controllers'>
        <div>
            <Select
                placeholder='Oficina'
                className='select-input'
                options={officeOptions}
                onChange={handleOfficeChange}
            />
        </div>
        <div>
            <Select
                placeholder='Agente'
                className='select-input'
                options={agentOptions}
                onChange={handleAgentChange}
            />
        </div>
        <div>
            <Select
                placeholder='Ejecutiva'
                className='select-input'
                options={executiveOptions}
                onChange={handleExecutiveChange}
            />
        </div>
    </div>
    );
};

export default Controllers;
