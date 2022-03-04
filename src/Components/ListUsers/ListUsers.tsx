import { UserInterface } from "../../App";
import { Link } from "react-router-dom";
import "./ListUsers.scss";
import { v4 as uuid } from "uuid";

export const ListUsers = ({
  deleteUser,
  userList,
}: {
  deleteUser: (id: string) => void;
  userList: { [id: string]: UserInterface };
}) => {
  let idList = Object.keys(userList);
  return (
    <div className="ListUsers">
      {userList
        ? Object.values(userList).map((obj: UserInterface, i: number) => {
            return (
              <div className="ListUsers__user" key={uuid()}>
                <h2>UserName : {obj.UserName}</h2>
                <h3>Email : {obj.Email}</h3>
                <h3>PhoneNumber : {obj.PhoneNumber}</h3>
                <h3>Gender : {obj.Gender}</h3>
                <h3>Date of birth : {obj.DateOfBirth}</h3>
                <div>
                  <Link
                    className={"ListUsers__user--link"}
                    to={`/edit/${idList[i]}`}
                  >
                    Edit
                  </Link>
                  <button
                    className={"ListUsers__user--btn"}
                    onClick={() => {
                      deleteUser(idList[i]);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};
