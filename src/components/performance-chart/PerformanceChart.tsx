import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Segmented } from 'antd';
import './PerformanceChart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface PerformanceData {
  date: string;
  pesos: number;
  dolares: number;
  cotizacion: number;
  total: number;
  porcentaje: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const [activeView, setActiveView] = useState<'value' | 'performance'>('performance');
  const [activeCurrency, setActiveCurrency] = useState<'pesos' | 'dolares'>('pesos');
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value: number, currency: 'ARS' | 'USD' = 'ARS') => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: currency === 'USD' ? 2 : 0,
    }).format(value);
  };

  const getCurrencyData = () => {
    switch (activeCurrency) {
      case 'pesos':
        return {
          data: data.map(item => item.pesos),
          label: 'Pesos (ARS)',
          currency: 'ARS' as const
        };
      case 'dolares':
      default:
        return {
          data: data.map(item => item.dolares),
          label: 'Dólares (USD)',
          currency: 'USD' as const
        };
    }
  };

  const getChartData = () => {
    if (activeView === 'value') {
      const currencyData = getCurrencyData();
      return {
        labels: data.map(item => formatDate(item.date)),
        datasets: [{
          label: currencyData.label,
          data: currencyData.data,
          borderColor: '#2c5aa0',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 6,
          fill: false,
          tension: 0.3,
        }],
      };
    } else {
      // Create data with zero crossings for proper color transitions
      const processedData: number[] = [];
      const processedLabels: string[] = [];
      
      data.forEach((item, index) => {
        if (index === 0) {
          processedData.push(item.porcentaje);
          processedLabels.push(formatDate(item.date));
          return;
        }
        
        const current = item.porcentaje;
        const previous = data[index - 1].porcentaje;
        
        // Check if crossing zero line
        if ((previous >= 0 && current < 0) || (previous < 0 && current >= 0)) {
          // Add zero crossing point
          processedData.push(0);
          processedLabels.push(''); // Empty label for crossing point
        }
        
        processedData.push(current);
        processedLabels.push(formatDate(item.date));
      });
      
      return {
        labels: processedLabels,
        datasets: [
          {
            label: 'Performance (%)',
            data: processedData,
            borderColor: '#2c5aa0',
            backgroundColor: (context: any) => {
              const current = context.parsed?.y;
              if (current === undefined) return 'rgba(255, 255, 255, 0.1)';
              return current >= 0 ? 'rgba(82, 196, 26, 0.2)' : 'rgba(255, 77, 79, 0.2)';
            },
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
            fill: 'origin',
            tension: 0.1,
            segment: {
              borderColor: (ctx: any) => {
                const current = ctx.p1.parsed.y;
                return current >= 0 ? '#52c41a' : '#ff4d4f';
              },
              backgroundColor: (ctx: any) => {
                const current = ctx.p1.parsed.y;
                return current >= 0 ? 'rgba(82, 196, 26, 0.2)' : 'rgba(255, 77, 79, 0.2)';
              },
            }
          }
        ],
      };
    }
  };

  const getOptions = () => {
    const currencyData = getCurrencyData();

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              const value = context.parsed.y;

              if (activeView === 'value') {
                return `${currencyData.label}: ${formatCurrency(value, currencyData.currency)}`;
              } else {
                return `Performance: ${value?.toFixed(2)}%`;
              }
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: false,
          },
          ticks: {
            maxRotation: 45,
          }
        },
        y: {
          type: 'linear' as const,
          display: true,
          title: {
            display: true,
            text: activeView === 'value' ? currencyData.label : 'Performance (%)',
            color: activeView === 'value' ? '#2c5aa0' : '#666',
          },
          ticks: {
            callback: function(value: any) {
              if (activeView === 'value') {
                return formatCurrency(value, currencyData.currency);
              } else {
                return value + '%';
              }
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
    };
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Toggle Controls */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#666', fontWeight: 500 }}>Vista:</span>
          <Segmented
            value={activeView}
            onChange={(value) => setActiveView(value as 'performance' | 'value')}
            options={[
              { label: 'Performance', value: 'performance' },
              { label: 'Valor', value: 'value' }
            ]}
            className="custom-segmented"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#666', fontWeight: 500 }}>Moneda:</span>
          <Segmented
            value={activeCurrency}
            onChange={(value) => setActiveCurrency(value as 'pesos' | 'dolares')}
            options={[
              { label: 'Pesos', value: 'pesos' },
              { label: 'Dólares', value: 'dolares' }
            ]}
            className="custom-segmented"
          />
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: '400px' }}>
        <Line data={getChartData()} options={getOptions()} />
      </div>
    </div>
  );
};

export default PerformanceChart;