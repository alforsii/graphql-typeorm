import React from "react";
import { useUsersQuery } from "../../generated/graphql";

interface Props {}
export const Home: React.FC<Props> = () => {
  const { data } = useUsersQuery();

  const GetUsers = () => {
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
};
