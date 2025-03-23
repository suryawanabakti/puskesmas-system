// resources/js/Pages/Reports/components/patient-statistics.tsx
import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';

Chart.register(...registerables);

interface PatientStatisticsProps {
    data: {
        labels: string[];
        data: number[];
    };
    chartType?: 'line' | 'bar' | 'pie' | 'doughnut';
}

export default function PatientStatistics({ data, chartType = 'line' }: PatientStatisticsProps) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Destroy existing chart
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        const colors = [
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)',
            'rgba(83, 102, 255, 0.6)',
            'rgba(40, 159, 64, 0.6)',
            'rgba(210, 199, 199, 0.6)',
        ];

        const config: any = {
            type: chartType,
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Jumlah Pasien',
                        data: data.data,
                        backgroundColor: chartType === 'line' ? 'rgba(75, 192, 192, 0.2)' : colors,
                        borderColor: chartType === 'line' ? 'rgba(75, 192, 192, 1)' : colors.map((c) => c.replace('0.6', '1')),
                        borderWidth: 1,
                        tension: 0.3,
                        fill: chartType === 'line',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top' as const,
                        display: chartType !== 'line' && chartType !== 'bar',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                scales:
                    chartType === 'line' || chartType === 'bar'
                        ? {
                              x: {
                                  display: true,
                                  title: {
                                      display: true,
                                      text: 'Periode',
                                  },
                                  grid: {
                                      display: false,
                                  },
                              },
                              y: {
                                  display: true,
                                  title: {
                                      display: true,
                                      text: 'Jumlah',
                                  },
                                  beginAtZero: true,
                              },
                          }
                        : undefined,
            },
        };

        chartInstance.current = new Chart(ctx, config);

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, chartType]);

    return <canvas ref={chartRef} />;
}
