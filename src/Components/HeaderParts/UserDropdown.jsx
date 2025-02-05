import { Settings, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ user, showDropdown, onNavigate, onLogout, onDropdownClose }) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDropdownClose();
        }}
        className="flex items-center gap-2 text-white hover:text-orange-300 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <span className="hidden md:inline">{user.displayName || user.email}</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 text-gray-800">
          <button
            onClick={() => {
              onNavigate("/profile");
              onDropdownClose();
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <Settings className="w-4 h-4" />
            Profile Settings
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
