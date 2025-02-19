import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const processChartData = (data) => {
    const monthlyData = {};
    const campData = {};

    data.forEach(entry => {
        // Extract Month-Year
        const [day, month, year] = entry.date_time.split(" ")[0].split("/");
        const monthYear = `${new Date(year, month - 1).toLocaleString('en-US', { month: 'short' })} ${year}`;

        // Aggregate Monthly Spending
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = 0;
        }
        monthlyData[monthYear] += entry.fee;

        // Aggregate Camp Spending
        if (!campData[entry.registeredCampName]) {
            campData[entry.registeredCampName] = 0;
        }
        campData[entry.registeredCampName] += entry.fee;
    });

    // Convert object to array for Recharts
    const barChartData = Object.entries(monthlyData).map(([month, total]) => ({ month, total }));
    const pieChartData = Object.entries(campData).map(([name, value]) => ({ name, value }));

    return { barChartData, pieChartData };
};

const AnalyticsCharts = ({ paymentHistory }) => {
    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        if (paymentHistory.length > 0) {
            const { barChartData, pieChartData } = processChartData(paymentHistory);
            setBarData(barChartData);
            setPieData(pieChartData);
        }
    }, [paymentHistory]);

    // Colors for Pie Chart
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart (Monthly Spending) */}
            <div className="bg-white dark:bg-black p-4 shadow rounded-xl">
                <h2 className="text-xl font-semibold text-black dark:text-white">Total Spending Per Month</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart (Spending per Camp) */}
            <div className="bg-white dark:bg-black p-4 shadow rounded-xl">
                <h2 className="text-xl font-semibold text-black dark:text-white">Spending Per Camp</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsCharts;