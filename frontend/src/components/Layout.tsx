import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Layout() {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <NavLink to="/" className="text-blue-600 font-bold text-xl">
                UniLink
              </NavLink>
              <div className="hidden md:flex items-center gap-1">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`
                  }
                >
                  피드
                </NavLink>
                <NavLink
                  to="/network"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`
                  }
                >
                  네트워크
                </NavLink>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`
                  }
                >
                  채용 공고
                </NavLink>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <NavLink
                to={`/profile/${user?.id}`}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0) ?? 'U'}
                </div>
                <span className="hidden md:block font-medium">{user?.name}</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-2"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
