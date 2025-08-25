import React from 'react';

interface DashboardProps {
  totalCarboidratos: number;
  totalProteinas: number;
  totalGorduras: number;
}

const Dashboard: React.FC<DashboardProps> = ({ totalCarboidratos, totalProteinas, totalGorduras }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div className="p-4 bg-blue-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-blue-800">Carboidratos</h3>
        <p className="text-2xl font-bold text-blue-900">{totalCarboidratos.toFixed(2)}g</p>
      </div>
      <div className="p-4 bg-green-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-green-800">Proteínas</h3>
        <p className="text-2xl font-bold text-green-900">{totalProteinas.toFixed(2)}g</p>
      </div>
      <div className="p-4 bg-red-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-red-800">Gorduras</h3>
        <p className="text-2xl font-bold text-red-900">{totalGorduras.toFixed(2)}g</p>
      </div>
    </div>
  );
};

export default Dashboard;