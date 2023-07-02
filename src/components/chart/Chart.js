import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Charts = ({ data }) => {
	console.log('data: ', data);
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5
				}}
			>
				<XAxis dataKey='month' />
				<YAxis />
				<Tooltip />
				<Legend />
				<CartesianGrid strokeDasharray='3 3' />
				<Line type='monotone' dataKey='user' stroke='#8884d8' />
				<Line type='monotone' dataKey='order' stroke='#82ca9d' />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default Charts;
