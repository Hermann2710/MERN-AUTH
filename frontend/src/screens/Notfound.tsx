import { useNavigate } from "react-router-dom";

function Notfound() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full h-full">
      <h1 className="text-4xl flex gap-5 font-bold">
        <span className="text-red-500">404</span>
        <span>Not found</span>
      </h1>
      <div className="flex flex-col gap-5 justify-center items-center">
        <p className="text-xl">The page you are looking for doesn't exist</p>
        <button onClick={handleClick}  className="border font-extrabold hover:text-white transition ease-in-out duration-500 hover:scale-110 rounded-lg bg-primary text-primary-content px-6 py-2">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Notfound;
