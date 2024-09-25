import ErrorMessage from "../components/ErrorMessage"
import "react-toastify/dist/ReactToastify.css";

const Home = () => {

  return (
    <div className="h-[calc(100vh-72px)] bg-white dark:bg-black text-black dark:text-white">
      {/* <LoadingSpinner /> */}
      <ErrorMessage />
    </div>
  );
};

export default Home;

