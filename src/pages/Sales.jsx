import { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [labels, setLabels] = useState([]);
  const API_URL = import.meta.env.VITE_URL_SERVER || 'http://localhost:4000/api/v1/orders/';
  let chartInstance;

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`${API_URL}orders/sales`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud de ventas');
        }

        const data = await response.json();
        const months = data.map(sale => `Mes ${sale._id}`);
        const totalSales = data.map(sale => sale.totalSales);

        setLabels(months);
        setSalesData(totalSales);
      } catch (error) {
        console.error("Error al obtener los datos de ventas:", error);
      }
    };

    fetchSalesData();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Si ya existe un gráfico, destrúyelo antes de crear uno nuevo
    if (chartInstance) {
        chartInstance.destroy();
    }

    if (salesData.length > 0) {
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ventas Mensuales',
                data: salesData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfico de Ventas Mensuales',
                },
            },
        },
      });
    }

    // Limpia la instancia al desmontar el componente
    return () => {
      if (chartInstance) {
          chartInstance.destroy();
      }
    };
  }, [salesData, labels]);

  return (
    <div className='h-[calc(100vh-72px)] dark:bg-black'>
      <canvas id="myChart" width="full" height="full" className='dark:bg-black'></canvas>
    </div>
  );
};

export default SalesChart;
