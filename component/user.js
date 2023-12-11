import React, { useState, useEffect } from 'react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('http://localhost:9090/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const createUser = () => {
    fetch('http://localhost:9090/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User created successfully:', data);
        getUsers(); // Refresh the user list after creating a new user
      })
      .catch(error => console.error('Error creating user:', error));
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>User Management</h1>

      <div>
        <h2>Get Users</h2>
        <button onClick={getUsers}>Get Users</button>
        <ul>
          {users.map(user => (
            <li key={user.id}>{`${user.firstName} ${user.lastName} - ${user.email}`}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Create User</h2>
        <form
          onSubmit={event => {
            event.preventDefault();
            createUser();
          }}
        >
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default User;
