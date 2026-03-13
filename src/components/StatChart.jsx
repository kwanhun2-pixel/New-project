import React, { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale, LinearScale,
  PointElement, LineElement, BarElement,
  Title, Tooltip, Legend, Filler
)

export default function StatChart({ data, title, unit }) {
  const [chartType, setChartType] = React.useState('line')

  const { labels, datasets } = useMemo(() => {
    // 항목별로 그룹핑
    const groups = {}
    for (const row of data) {
      const key = [row.ITEM_NAME1, row.ITEM_NAME2, row.ITEM_NAME3].filter(Boolean).join(' > ')
      if (!groups[key]) groups[key] = {}
      groups[key][row.TIME] = parseFloat(row.DATA_VALUE)
    }

    const allTimes = [...new Set(data.map((r) => r.TIME))].sort()
    const palette = [
      '#0066cc', '#e8a000', '#16a34a', '#dc2626',
      '#7c3aed', '#0891b2', '#ea580c', '#65a30d',
    ]

    const datasets = Object.entries(groups).slice(0, 8).map(([name, values], i) => ({
      label: name || title,
      data: allTimes.map((t) => values[t] ?? null),
      borderColor: palette[i % palette.length],
      backgroundColor: palette[i % palette.length] + '33',
      borderWidth: 2,
      pointRadius: allTimes.length > 60 ? 0 : 3,
      fill: false,
      tension: 0.3,
      spanGaps: true,
    }))

    return { labels: allTimes, datasets }
  }, [data, title])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { size: 12 }, padding: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed.y
            return ` ${ctx.dataset.label}: ${val !== null ? Number(val).toLocaleString() : '-'} ${unit}`
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 12,
          maxRotation: 45,
          font: { size: 11 },
        },
        grid: { color: '#eef0f4' },
      },
      y: {
        ticks: {
          font: { size: 11 },
          callback: (v) => Number(v).toLocaleString(),
        },
        grid: { color: '#eef0f4' },
      },
    },
  }

  const chartData = { labels, datasets }
  const ChartComponent = chartType === 'bar' ? Bar : Line

  return (
    <div className="chart-container">
      <div className="chart-type-toggle">
        <button className={chartType === 'line' ? 'active' : ''} onClick={() => setChartType('line')}>
          꺾은선
        </button>
        <button className={chartType === 'bar' ? 'active' : ''} onClick={() => setChartType('bar')}>
          막대
        </button>
      </div>
      <div className="chart-wrap">
        <ChartComponent data={chartData} options={options} />
      </div>
      <div className="chart-unit">단위: {unit}</div>
    </div>
  )
}
