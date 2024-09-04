import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUsers, removeUsers } from "../features/users/usersSlice";
import { addUser, removeUser } from "../features/user/userSlice";
import Button from "../components/Button";
import styled from "styled-components";

function Example() {
  const dispatch = useDispatch();

  // Get the state of the users and the API status
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);

  // Get the state of the persisted user
  const user = useSelector((state) => state.user.user);

  // Fetch users if the status is "idle"
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // Add a user
  const handleAddUser = () => {
    const newUser = { id: 133, name: "Anonimous" };
    if(!user) {
      dispatch(addUsers(newUser));
      dispatch(addUser(newUser));
    }
  };

  // Delete a user
  const handleRemoveUser = () => {
    if(user) {
      dispatch(removeUser(user.id));
      dispatch(removeUsers(user.id));
    }
  };

  return (
    <MainContainer>
      <Section>
        <h1>Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>

        <h2>Persisted User</h2>
        <div>
          {user ? (
            <div>
              <p>Usuario: {user.name}</p>
              <button onClick={handleRemoveUser}>Delete User</button>
            </div>
          ) : (
            <p>No persisted user found</p>
          )}
        </div>

        <Button $variant="primary" onClick={handleAddUser}>Add persisted user</Button>
      </Section>
    </MainContainer>
  );
}

export default Example;

const MainContainer = styled.div`
  display: flex;/* Oculta el overflow en el contenedor principal */
`;

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px; /* Espacio entre los elementos */
  color: ${({ theme }) => theme.text};
  padding: 20px; /* Espacio interno del section */
`;
