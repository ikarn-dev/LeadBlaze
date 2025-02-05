import { Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
      <Flame className="h-6 w-6 text-orange-500" />
      <span className="text-xl font-bold text-white">LEADBLAZE</span>
    </div>
  );
};

export default Logo;