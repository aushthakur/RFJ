import Sidebar from "./sidebar";
import Topbar from "./topbar";

const Layout = ({ children, onLogout }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar onLogout={onLogout} />
        {/* Add padding top to push content below Topbar */}
        <main className="pt-100 px-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
