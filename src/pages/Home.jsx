import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "../components/Button";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

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
    <MainContainer>
      <Section>
        <h1>Hello, this is an example.</h1>
        <Button $variant="primary" onClick={notify}>
          Notify!
        </Button>
        <Button $variant="secondary" onClick={notify}>
          Notify!
        </Button>
        <Link to="/list">
          <Button $variant="success">list</Button>
        </Link>
        <Link to="/exa">
          <Button $variant="dangerous">exa</Button>
        </Link>
        <ToastContainer />
      </Section>
    </MainContainer>
  );
};

export default Home;

// Styled Components
const MainContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px; /* Espacio entre los elementos */
  color: ${({ theme }) => theme.text}; /* Usa el color de texto del tema */
`;
