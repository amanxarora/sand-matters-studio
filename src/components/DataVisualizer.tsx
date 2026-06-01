import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DataVisualizerProps {
  score: number;
}

const DataVisualizer: React.FC<DataVisualizerProps> = ({ score }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: 'Illegal Mining Probability', value: score },
    { name: 'Safe Zone', value: Math.max(0, 100 - score) },
  ];

  const COLORS = ['var(--color-danger)', 'var(--color-surface-hover)'];

  if (!mounted) return <div style={{ height: '150px' }}>Loading chart...</div>;

  return (
    <div style={{ height: '180px', width: '100%', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            startAngle={180}
            endAngle={0}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--glass-border)', borderRadius: '4px', color: 'var(--color-text-primary)' }}
            itemStyle={{ color: 'var(--color-text-primary)' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Gauge Center Text */}
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-danger)' }}>
          {data[0].value}%
        </div>
        <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
          Risk Score
        </div>
      </div>
    </div>
  );
};

export default DataVisualizer;
