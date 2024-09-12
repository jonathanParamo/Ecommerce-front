import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUsers, removeUsers } from "../features/users/usersSlice";
import { addUser, removeUser } from "../features/user/userSlice";

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
    const newUser = { id: 133, name: "Anonymous" };
    if (!user) {
      dispatch(addUsers(newUser));
      dispatch(addUser(newUser));
    }
  };

  // Delete a user
  const handleRemoveUser = () => {
    if (user) {
      dispatch(removeUser(user.id));
      dispatch(removeUsers(user.id));
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <section className="flex-1 flex flex-col items-start gap-2 p-5 text-gray-800">
        <h1 className="text-xl font-bold">Users</h1>
        <ul className="list-disc pl-5">
          {users.map((user) => (
            <li key={user.id} className="py-1">{user.name}</li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-4">Persisted User</h2>
        <div className="mt-2">
          {user ? (
            <div>
              <p className="text-md">Usuario: {user.name}</p>
              <button
                onClick={handleRemoveUser}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
              >
                Delete User
              </button>
            </div>
          ) : (
            <p>No persisted user found</p>
          )}
        </div>

        <button onClick={handleAddUser}>Add persisted user</button>
      </section>
    </div>
  );
}

export default Example;
