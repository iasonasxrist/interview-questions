import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Header = () => {
  const navigate = useNavigate();

  // Go back to start of app
  const handleGoBack = () => {
    navigate("/", { replace: true });
  };

  return (
    // Some responsiveness stylings 
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-white p-2 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <div className="flex items-center mb-2">
          <button
            className="buttonStyle mr-4 rounded-md px-4 py-2 bg-blue-500 text-white flex items-center justify-center"
            onClick={handleGoBack}
          >
            <BsArrowLeft className="mr-2" />
            Back
          </button>
          {/* Title of app */}
          <h1 className="text-2xl font-bold text-center px-4">Notes</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
