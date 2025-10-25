import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/basics/login";
import Dashboard from "./components/dashboard";
import Sidebar from "./components/basics/sidebar";
import Topbar from "./components/basics/topbar";
import CarouselManager from "./components/editablepages/CarouselManager";
import AllProducts from "./components/allproducts";
import AddProduct from "./components/addproduct";
import EditProduct from "./components/EditProduct";

function PrivateRoute({ children }) {
  const isAuth = localStorage.getItem("adminAuth");
  return isAuth ? children : <Navigate to="/" replace />;
}

// Admin Layout wrapper
function AdminLayout({ children }) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/all-products"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AllProducts />
            </AdminLayout>
          </PrivateRoute>
        }
      />
       <Route
        path="/add-product"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AddProduct />
            </AdminLayout>
          </PrivateRoute>
        }
      />

       <Route
        path="/edit-product"
        element={
          <PrivateRoute>
            <AdminLayout>
              <EditProduct />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/customize/home/hero"
        element={
          <PrivateRoute>
            <AdminLayout>
              <CarouselManager />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* Catch-all: redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
