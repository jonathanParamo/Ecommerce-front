import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from"react-toastify";
import Button from "../components/Button";
import"react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [message, setMessage] = useState(0);

  // Function to show a toast notification
  const notify = () => {
    if(message === 1) {
      toast.error("Something went wrong!")
      setMessage(0)
      return
    }
    toast("Wow so easy!")
    setMessage(1)
  }

  return (
    <section>
      <h1>Hello, this is an example.</h1>
      <Button
        $variant="primary"
        onClick={notify}
      >
        Notify!
      </Button>
      <Button
        $variant="secondary"
        onClick={notify}
      >
        Notify!
      </Button>
      <Button
        $variant="success"
        onClick={notify}
      >
        Notify!
      </Button>
      <Link to='/exa'>
        <Button $variant="dangerous">exa</Button>
      </Link>
      <ToastContainer />
    </section>
  )
}

export default Home;