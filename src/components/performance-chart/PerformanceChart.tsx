import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Button, Space } from 'antd';

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getChartData = () => {
    if (activeView === 'value') {
      return {
        labels: data.map(item => formatDate(item.date)),
        datasets: [{
          label: 'Valor (ARS)',
          data: data.map(item => item.total),
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
                return `Valor: ${formatCurrency(value)}`;
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
            text: activeView === 'value' ? 'Valor (ARS)' : 'Performance (%)',
            color: activeView === 'value' ? '#2c5aa0' : '#666',
          },
          ticks: {
            callback: function(value: any) {
              if (activeView === 'value') {
                return formatCurrency(value);
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
      {/* Toggle Buttons */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
        <Space>
          <Button
            type={activeView === 'performance' ? 'primary' : 'default'}
            style={{
              backgroundColor: activeView === 'performance' ? '#2c5aa0' : undefined,
              borderColor: activeView === 'performance' ? '#2c5aa0' : undefined,
            }}
            onClick={() => setActiveView('performance')}
          >
            Performance
          </Button>
          <Button
            type={activeView === 'value' ? 'primary' : 'default'}
            style={{
              backgroundColor: activeView === 'value' ? '#2c5aa0' : undefined,
              borderColor: activeView === 'value' ? '#2c5aa0' : undefined,
            }}
            onClick={() => setActiveView('value')}
          >
            Valor
          </Button>
        </Space>
      </div>
      
      {/* Chart */}
      <div style={{ height: '400px' }}>
        <Line data={getChartData()} options={getOptions()} />
      </div>
    </div>
  );
};

export default PerformanceChart;