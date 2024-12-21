import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { toyActions } from '../store/actions/toy.actions.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {

    const toys = useSelector(storeState => storeState.toyModule.unfilteredToys)
    const [chartData, setChartData] = useState(howManyInStock())

    useEffect(() => {
        toyActions.loadToys()
    }, [])

    function changeChart(type) {
        if (type === 'toys in stock') return setChartData(howManyInStock())
        if (type === 'toys per label') return setChartData(howManyPerLabel())
    }

    function howManyPerLabel() {
        const toysPerLabel = toys.reduce((accu, toy) => {
            toy.labels && toy.labels.forEach(label => {
                accu[label] = (accu[label] || 0) + 1
            })
            return accu
        }, {})

        const labels = []
        const amount = []
        for (const key in toysPerLabel) {
            labels.push(key)
            amount.push(toysPerLabel[key])
        }

        return { labels, amount }
    }

    function howManyInStock() {
        const amount = toys.reduce((accu, toy) => {
            return toy.inStock ? ++accu[0] : ++accu[1], accu
        }, [0, 0])

        return { labels: ['In Stock', 'Out of Stock'], amount }
    }

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: '# of Toys',
                data: chartData.amount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 3,
            },
        ],
    }

    return (
        <div className='chart'>
            <div className='chart-buttons'>
                <button onClick={() => changeChart('toys in stock')}>Toys in Stock</button>
                <button onClick={() => changeChart('toys per label')}>Toys per Label</button>
            </div>
            <Pie data={data} />
        </div>
    )
}
