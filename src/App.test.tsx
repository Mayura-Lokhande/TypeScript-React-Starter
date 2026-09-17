import React, { useEffect, useState } from "react";
import HeavyEditor from "./HeavyEditor";
import UserList from "./UserList";

interface User {
  id: string;
  name: string;
  email: string;
}

export function userDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("/api/users")
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      });
  }, []);

  const editorOptions = {
    mode: "advanced",
    pageSize: 100
  };

  const handleUserSelect = (userId: string) => {
    console.log("Selected user:", userId);
  };

  return (
    <ApplicationWrapper>
      {loading && <div>Loading users...</div>}

      <HeavyEditor
        options={editorOptions}
        onSelect={handleUserSelect}
      />

      <UserList
        users={users}
        onSelect={handleUserSelect}
      />
    </ApplicationWrapper>
  );
}

export function ApplicationWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [config, setConfig] = useState("default");

  useEffect(() => {
    setReady(true);
    setConfig("production");
  }, []);

  return (
    <div data-config={config}>
      {ready && children}
    </div>
  );
}