import { LineChart } from "@mui/x-charts/LineChart";

const Home = () => {
  const orders = [
    {
      id: 1,
      name: "John Doe",
      total: 200,
      status: "Approved",
    },
    {
      id: 2,
      name: "Jane Smith",
      total: 50,
      status: "Pending",
    },
    {
      id: 3,
      name: "Michael Johnson",
      total: 400,
      status: "Pending",
    },
    {
      id: 4,
      name: "Emily Brown",
      total: 1600,
      status: "Approved",
    },
    {
      id: 5,
      name: "Walter James",
      total: 600,
      status: "Approved",
    },
  ];

  // Calculate total revenue
  //const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="flex justify-between h-screen p-2 bg-gray-200">
      <div className="flex flex-col w-2/3">
        <div className="flex">
          <div className="bg-white h-52 m-5 w-60 shadow-xl rounded-lg flex flex-col items-center justify-center">
            <div className="h-32 w-32 m-5 border-[10px] border-blue-400 border-solid rounded-full flex items-center justify-center">
              <h2 className="font-bold text-2xl">699</h2>
            </div>
            <h2 className="font-semibold text-xl">Products</h2>
          </div>

          <div className="bg-white h-52 m-5 w-60 shadow-xl rounded-lg flex flex-col items-center justify-center">
            <div className="h-32 w-32 m-5 border-[10px] border-red-400 border-solid rounded-full flex items-center justify-center">
              <h2 className="font-bold text-2xl">100</h2>
            </div>
            <h2 className="font-semibold text-xl">Orders</h2>
          </div>

          <div className="bg-white h-52 m-5 w-60 shadow-xl rounded-lg flex flex-col items-center justify-center">
            <div className="h-32 w-32 m-5 border-[10px] border-slate-400 border-solid rounded-full flex items-center justify-center">
              <h2 className="font-bold text-2xl">200</h2>
            </div>
            <h2 className="font-semibold text-xl">Users</h2>
          </div>
        </div>

        <div className="bg-white m-5 p-5 rounded-lg">
         
            <div className="p-6 bg-white rounded-md">
              <h3 className="text-lg font-bold mb-4">Latest transactions</h3>
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4">Customer</th>
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2 px-4">{order.name}</td>
                      <td className="py-2 px-4">$ {order.total}</td>
                      <td className={`py-2 px-4 font-semibold
                        ${order.status === 'Pending'  ? 'text-red-500' : 'text-green-500' }
                        `}>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          
        </div>
      </div>

      <div className="flex flex-col w-1/3 bg-white p-5 shadow-xl rounded-lg">
        <div className="bg-gray-50 p-5 mb-5 shadow-xl rounded-lg flex flex-col items-center">
          <h2 className="font-bold text-2xl">Total Revenue: $200,000</h2>
        </div>
        <div className="bg-gray-50 p-5 mb-5 shadow-xl rounded-lg flex flex-col items-center">
          <h2 className="font-bold text-2xl">Total Losses: $0</h2>
        </div>

        <div className="bg-gray-50 h-[400px] w-[350px] p-5 shadow-xl rounded-lg flex items-center justify-center">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={350}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
