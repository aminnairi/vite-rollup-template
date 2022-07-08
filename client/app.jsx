import React, {useState, useEffect} from "react";

export const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then(response => {
      return response.json();
    }).then(newUsers => {
      setUsers(newUsers);
    }).catch(error => {
      setUsers([]);
    });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <table> 
        <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table> 
    </>
  );
};
