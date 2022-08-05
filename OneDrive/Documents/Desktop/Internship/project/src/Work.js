import React, { useEffect, useState } from "react";
import axios from "axios";
function Work() {
  let [value1, setvalue1] = useState(false); // value1 variable is used to showing form
  let [value2, setvalue2] = useState(false); // value2 is used for popup to show user is added
  let [value3, setvalue3] = useState(false); // value3 is used for popup to show user is deleted
  let [storedata1, setstoredata1] = useState([]); // This storedata1 is used to store the data from api
  let [storedata2, setstoredata2] = useState({
    // This storedata2 is ued to store the values of input field
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  // function to store the data from api to storedata variable (array of object)
  useEffect(() => {
    async function call() {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setstoredata1(result.data);
    }
    call();
  }, []);

  // This onchange function will store the value of input field in storedata2 variable (array of object)
  function onchange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setstoredata2({ ...storedata2, [name]: value });
  }

  //This function is used to save the input field in api data
  async function saveinputfield(event) {
    event.preventDefault();
    if (!validemail(storedata2.email)) {
      alert("Email is invalid");
    } else {
      if (!validurl(storedata2.website)) {
        alert("URL is invalid");
      } else {
        const res = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          storedata2
        );
        setvalue1(false);
        setvalue2(true);
        setstoredata1((data) => [...data, res.data]);
      }
    }
  }

  //This  function is used to delete the data from api
  async function deletedata(id) {
    let isExecuted = window.confirm(
      "Are you sure you want to delete this user"
    );
    if (isExecuted) {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setstoredata1(
        storedata1.filter((item) => {
          return item.id !== id;
        })
      );
      setvalue3(true);
    }
  }

  // function to set value1 variable to true so that input form shown
  function adduser() {
    setvalue1(true);
  }

  // function to validate the email
  function validemail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  //function to validate the url
  function validurl(url) {
    return /\S+\.\S+/.test(url);
  }

  //function to close the popup message
  function closepopup() {
    setvalue2(false);
    setvalue3(false);
  }

  return (
    <>
      <div className="container mt-5">
        {/* if  value1 is become true then below code for form will run */}
        {value1 ? (
          <div className="div1">
            <form>
              <h3>Form</h3>
              <input
                placeholder="Enter Your Name *"
                onChange={onchange}
                type="text"
                name="name"
                className="form-control"
              />
              <input
                placeholder="Enter Your Username *"
                onChange={onchange}
                type="text"
                name="username"
                className="form-control"
              />
              <input
                placeholder="Enter Your Email *"
                onChange={onchange}
                type="email"
                name="email"
                className="form-control"
              />
              <input
                placeholder="Enter Phone Number *"
                onChange={onchange}
                type="number"
                name="phone"
                className="form-control"
              />
              <input
                placeholder="Enter Website Url *"
                onChange={onchange}
                type="url"
                name="website"
                className="form-control"
              />
              <button
                id="bt"
                className="btn btn-primary"
                onClick={saveinputfield}
              >
                Save
              </button>
            </form>
          </div>
        ) : (
          <button onClick={adduser} className="btn btn-primary mb-2">
            Add User
          </button>
        )}

        {/* code for showing the table content */}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Website</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {storedata1.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>
                  <a href={`mailto:` + item.email}>{item.email}</a>
                </td>
                <td>
                  <a href={`tel://+` + item.phone}>{item.phone}</a>
                </td>
                <td>
                  <a href={`https://` + item.website} target="_blank">
                    {item.website}
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => deletedata(item.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* this below code when user is added */}
      {value2 ? (
        <div className="popup">
          <div className="text">
            <img src="img1.png" width={100} />
            <h2>User is added successfully !!</h2>
            <button onClick={closepopup} className="btn btn-danger">
              Close
            </button>
          </div>
        </div>
      ) : (
        <p></p>
      )}

      {/* this below code is for when user is deleted */}
      {value3 ? (
        <div className="popup">
          <div className="text">
            <img src="img1.png" width={100} />
            <h2>User is deleted successfully !!</h2>
            <button onClick={closepopup} className="btn btn-danger">
              Close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default Work;
