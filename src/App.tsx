import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { AddEditUser, Landing } from "./Pages";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { ListUsers } from "./Components";

export interface UserInterface {
  UserName: string;
  Email: string;
  PhoneNumber: string;
  Gender: string;
  DateOfBirth: string;
}
function App() {
  const initialUser = {
    UserName: "Blablo",
    Email: "blablabla@gmail.com",
    PhoneNumber: "065468869",
    Gender: "male",
    DateOfBirth: "1999-12-12",
  };

  const [userList, setUserList] = useState<{ [id: string]: UserInterface }>(
    () => {
      let id = uuid() as string;
      let obj = {} as { [id: string]: UserInterface };
      obj[id] = initialUser;
      return obj;
    }
  );

  const addUser = (userObj: UserInterface) => {
    //1. coppy state
    let oldState = { ...userList };
    //2. create new state
    let newId = uuid();
    let newState = { ...oldState };
    newState[newId] = userObj;
    //3. set newState
    setUserList(newState);
  };
  const editUser = (id: string, userObj: UserInterface) => {
    //1. coppy state
    let oldState = { ...userList };
    //2. create new state
    oldState[id] = userObj;
    let newState = { ...oldState };
    //3. set newState
    setUserList(newState);
  };
  const deleteUser = (id: string) => {
    //1. coppy state
    let oldState = { ...userList };
    //2. create new state
    delete oldState[id];
    let newState = { ...oldState };
    //3. set newState
    setUserList(newState);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            <Landing
              listUsers={
                <ListUsers deleteUser={deleteUser} userList={userList} />
              }
            />
          }
        />
        <Route
          path="/add"
          element={<AddEditUser userList={userList} addUser={addUser} />}
        />
        <Route
          path="/edit/:id"
          element={<AddEditUser userList={userList} editUser={editUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
