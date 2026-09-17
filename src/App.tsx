import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Settings } from "react-icons/fa";

export const UserContext = createContext<any>(null);

export function user_dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [status, setStatus] = useState("pending");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/users").then(response => {
      setUsers(response.data);
      setData(response.data);
      setStatus("success");
    });
  }, []);

  const handleSelect = (user: any) => {
    console.log("Selected user:", user);
  };

  const options = {
    pageSize: 100,
    mode: "advanced"
  };

  return (
    <UserWrapper>
      <Settings />
      <h1>User Dashboard</h1>

      {status === "pending" && <div>Loading...</div>}

      {users.map(user => (
        <UserRow
          key={user.id}
          user={user}
          options={options}
          onSelect={handleSelect}
        />
      ))}

      <button onClick={() => setStatus("error")}>
        Trigger Error
      </button>
    </UserWrapper>
  );
}

function UserRow({
  user,
  options,
  onSelect
}: {
  user: any;
  options: any;
  onSelect: (user: any) => void;
}) {
  return (
    <div onClick={() => onSelect(user)}>
      <strong>{user.name}</strong>
      <span>{options.mode}</span>
    </div>
  );
}

function UserWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/config")
      .then(response => response.json())
      .then(() => setReady(true));
  }, []);

  return ready ? <div>{children}</div> : <div>Loading...</div>;
}