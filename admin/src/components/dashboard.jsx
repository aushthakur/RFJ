import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartPie,
  Package,
  ClipboardList,
  RotateCcw,
  Boxes,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setShowModal(false);
    navigate("/", { replace: true });
  };

  // Intercept back button
  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      setShowModal(true); // show modal instead of navigating
      navigate("/dashboard", { replace: true }); // stay on dashboard
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  // Mock Data
  const stats = [
    { title: "Total Orders", value: "₹126,500", icon: <ChartPie size={22} /> },
    { title: "Active Orders", value: "₹126,500", icon: <Package size={22} /> },
    {
      title: "Completed Orders",
      value: "₹126,500",
      icon: <ClipboardList size={22} />,
    },
    {
      title: "Return Orders",
      value: "₹126,500",
      icon: <RotateCcw size={22} />,
    },
    {
      title: "Total Inventory",
      value: "113 Products",
      icon: <Boxes size={22} />,
    },
  ];

  const bestSellers = [
    { name: "Lorem Ipsum", price: "₹126.50", sales: "999 sales" },
    { name: "Lorem Ipsum", price: "₹126.50", sales: "999 sales" },
    { name: "Lorem Ipsum", price: "₹126.50", sales: "999 sales" },
  ];

  const recentOrders = [
    {
      id: "#25426",
      date: "Nov 8th, 2023",
      customer: "Kavin",
      status: "Delivered",
      amount: "₹200.00",
    },
    {
      id: "#25425",
      date: "Nov 7th, 2023",
      customer: "Komael",
      status: "Canceled",
      amount: "₹200.00",
    },
    {
      id: "#25424",
      date: "Nov 6th, 2023",
      customer: "Nikhil",
      status: "Delivered",
      amount: "₹200.00",
    },
    {
      id: "#25423",
      date: "Nov 5th, 2023",
      customer: "Shivam",
      status: "Canceled",
      amount: "₹200.00",
    },
    {
      id: "#25422",
      date: "Nov 4th, 2023",
      customer: "Shadab",
      status: "Delivered",
      amount: "₹200.00",
    },
    {
      id: "#25421",
      date: "Nov 2nd, 2023",
      customer: "Yogesh",
      status: "Delivered",
      amount: "₹200.00",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Home &gt; Dashboard</p>
        </div>
        <div className="text-sm text-gray-600">
          Oct 11, 2025 - Nov 11, 2025
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-500">{stat.title}</span>
              <span className="text-yellow-500">{stat.icon}</span>
            </div>
            <div className="mt-2 font-bold text-lg">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">
              ↑ 34.7% Compared to Oct 2023
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Best Sellers */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold text-lg mb-4">Best Sellers</h2>
          <div className="space-y-4">
            {bestSellers.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.sales}</p>
                  </div>
                </div>
                <p className="font-bold">{item.price}</p>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600">
            REPORT
          </button>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow p-4 md:col-span-2">
          <h2 className="font-bold text-lg mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 px-2">Product</th>
                  <th className="py-2 px-2">Order ID</th>
                  <th className="py-2 px-2">Date</th>
                  <th className="py-2 px-2">Customer</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="py-2 px-2">Lorem Ipsum</td>
                    <td className="py-2 px-2">{order.id}</td>
                    <td className="py-2 px-2">{order.date}</td>
                    <td className="py-2 px-2">{order.customer}</td>
                    <td className="py-2 px-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          order.status === "Delivered"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      {order.status}
                    </td>
                    <td className="py-2 px-2">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
