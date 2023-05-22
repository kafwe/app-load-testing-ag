import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts'
import { useState, useEffect } from 'react'

// Helper functions to calculate percentiles
const get25thPercentile = (arr) => {
    const sortedArr = arr.sort((a, b) => a - b);
    const index = Math.floor(0.25 * (sortedArr.length - 1))
    return sortedArr[index]
}


const get75thPercentile = (arr) => {
    const sortedArr = arr.sort((a, b) => a - b);
    const index = Math.floor(0.75 * (sortedArr.length - 1))
    return sortedArr[index]
}

const computeResponseTimeHistogram = (responseTimes) => {
    // Calculate the bin size using the Freedman-Diaconis rule
    const min = Math.min(...responseTimes)
    const max = Math.max(...responseTimes)
    const iqr = 2 * (get75thPercentile(responseTimes) - get25thPercentile(responseTimes))
    const binSize = 2 * (iqr / (responseTimes.length ** (1 / 3)));
  
    // Calculate the histogram data
    const bins = Math.ceil((max - min) / binSize)
    const histogramData = Array(bins).fill(0)
    responseTimes.forEach((value) => {
      const binIndex = Math.floor((value - min) / binSize)
      histogramData[binIndex]++
    })

  
    // Generate the bin labels for the x-axis
    const binLabels = Array(bins).fill().map((_, index) => {
      const binStart = min + index * binSize;
      const binEnd = binStart + binSize;
      return `${binStart.toFixed(3)} - ${binEnd.toFixed(3)}`;
    });
  
    const data = binLabels.map((label, index) => ({
      name: label,
      number: histogramData[index],
    }))

    return data
}

export default function Histogram({ data }) {
    const [plotData, setPlotData] = useState([])
    
    useEffect(() => {
        setPlotData(computeResponseTimeHistogram(data))
    }, [])

    console.log(data)


    return (
      <ResponsiveContainer width="95%" aspect={4}>
        <BarChart
          width={500}
          height={300}
          data={plotData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" >
            <Label value="Response Time (seconds)" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: 'Number of responses', angle: -90, position: 'insideBottomLeft', offset: 0 }}  />
          <Tooltip />
          <Bar dataKey="number" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
}