import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [message, setMessage] = useState(0);

  // Function to show a toast notification
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
    <div className="h-screen bg-gray-800 dark:bg-blue-100">
      <section className="">
        <h1>Hello, this is an example.</h1>
        <button  onClick={notify}>
          Notify!
        </button>
        <button onClick={notify}>
          Notify!
        </button>
        <Link to="/list">
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

