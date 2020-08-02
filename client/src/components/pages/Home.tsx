import React from "react";
import { useUsersQuery } from "../../generated/graphql";

export default function Home() {
  const GetUsers = () => {
    const { loading, data } = useUsersQuery();
    if (loading) return <div>Loading...</div>;

    return (
      <div>
        <ul>
          {data?.users.map((user) => (
            <React.Fragment key={user._id}>
              <li>
                ID:{user._id}, Email: {user.email}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  };
  return <GetUsers />;
}
