import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function BalanceChart({ transactions }) {
    const chartData = transactions.reduce((acc, txn) => {
        const prevBalance = acc.length ? acc[acc.length - 1].balance : 0;
        const newBalance =
            txn.flow === "out"
                ? prevBalance - txn.amount
                : prevBalance + txn.amount;

        acc.push({
            date: new Date(txn.id).toLocaleDateString(),
            balance: newBalance,
        });

        return acc;
    }, []);

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#007bff" />
            </LineChart>
        </ResponsiveContainer>
    );
}
