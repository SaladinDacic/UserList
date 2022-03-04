import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserInterface } from "../../App";
import "./AddEditUser.scss";

interface AddEditUserProps {
  addUser?: (userObj: UserInterface) => void;
  editUser?: (id: string, userObj: UserInterface) => void;
  userList: { [id: string]: UserInterface };
}

export const AddEditUser = ({
  addUser,
  editUser,
  userList,
}: AddEditUserProps) => {
  const { id } = useParams();
  let redirect = useNavigate();
  const [userData] = useState<UserInterface | undefined>(() => {
    if (userList && id) {
      return userList[id];
    } else return;
  });

  const handleAddUser = (
    evt: React.FormEvent<HTMLFormElement> & {
      target: { elements: UserInterface & any };
    }
  ) => {
    evt.preventDefault();
    let newUserObj: UserInterface = {
      UserName: evt.target.elements.UserName.value,
      Email: evt.target.elements.Email.value,
      PhoneNumber: evt.target.elements.PhoneNumber.value,
      Gender: evt.target.elements.Gender.value,
      DateOfBirth: evt.target.elements.DateOfBirth.value,
    };
    if (addUser !== undefined) {
      addUser(newUserObj);
      redirect("/");
    }
  };
  const handleEditUser = (
    evt: React.FormEvent<HTMLFormElement> & {
      target: { elements: UserInterface & any };
    }
  ) => {
    evt.preventDefault();
    let newUserObj: UserInterface = {
      UserName: evt.target.elements.UserName.value,
      Email: evt.target.elements.Email.value,
      PhoneNumber: evt.target.elements.PhoneNumber.value,
      Gender: evt.target.elements.Gender.value,
      DateOfBirth: evt.target.elements.DateOfBirth.value,
    };
    if (editUser !== undefined && id !== undefined) {
      editUser(id, newUserObj);
      redirect("/");
    }
  };
  return (
    <>
      {id ? (
        <form className="AddEditUser" onSubmit={handleEditUser}>
          <label htmlFor="userName">UserName</label>
          <input
            name="UserName"
            defaultValue={userData?.UserName}
            type="text"
          />
          <label htmlFor="email">Email</label>
          <input name="Email" defaultValue={userData?.Email} type="text" />
          <label htmlFor="phoneNumber">Phone</label>
          <input
            name="PhoneNumber"
            defaultValue={userData?.PhoneNumber}
            type="number"
          />
          <label htmlFor="gender">Gender</label>
          {userData && (
            <select name="Gender" id="Gender" defaultValue={userData.Gender}>
              <option key={1} value={"male"}>
                Male
              </option>
              <option key={2} value={"female"}>
                Female
              </option>
            </select>
          )}
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            name="DateOfBirth"
            defaultValue={userData?.DateOfBirth}
            type="date"
          />
          <button>Submit</button>
        </form>
      ) : (
        <form className="AddEditUser" onSubmit={handleAddUser}>
          <label htmlFor="userName">UserName</label>
          <input name="UserName" placeholder="userName" type="text" />
          <label htmlFor="email">Email</label>
          <input name="Email" placeholder="email" type="text" />
          <label htmlFor="phoneNumber">Phone</label>
          <input name="PhoneNumber" placeholder="phoneNumber" type="number" />
          <label htmlFor="gender">Gender</label>
          <select name="Gender" id="Gender">
            <option key={1} value={"male"}>
              Male
            </option>
            <option key={2} value={"female"}>
              Female
            </option>
          </select>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input name="DateOfBirth" placeholder="dateOfBirth" type="date" />
          <button>Submit</button>
        </form>
      )}
    </>
  );
};
