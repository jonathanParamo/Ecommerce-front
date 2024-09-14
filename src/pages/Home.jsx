import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [message, setMessage] = useState(0);

  const notify = () => {
    if (message === 1) {
      toast.error("Something went wrong!");
      setMessage(0);
      return;
    }
    toast("Wow so easy!");
    setMessage(1);
  };

  return (
    <div className="h-screen bg-white dark:bg-black text-black dark:text-white">
      <section className="p-2 flex flex-col md:flex-row justify-between">
        <h1>Hello, this is an example.</h1>
        <button
          className="w-44 h-12 border-2 border-purple-800 hover:border-purple-900"
          onClick={notify}>
          Notify!
        </button>
        <button
          className="w-44 h-12 border-2 border-blue-800 hover:border-blue-900"

          onClick={notify}>
          Notify!
        </button>
        <Link to="/product-list">
          <button>list</button>
        </Link>
        <Link to="/exa">
          <button>exa</button>
        </Link>
        <ToastContainer />
      </section>
    </div>
  );
};

export default Home;

