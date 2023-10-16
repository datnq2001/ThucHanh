import React, { useState, useEffect } from "react";

function Phone(props) {
  const { contact, render, setRender } = props;
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phones, setPhones] = useState([]);

  const host = "http://localhost:5000/api";

  const handleAddPhone = (contactId) => {
    if (name === "" || phoneNumber === "") {
      return;
    }

    fetch(`${host}/contacts/${contactId}/phones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phoneNumber, contactId }),
    })
      .then(() => {
        setRender(!render);
        setName("");
        setPhoneNumber("");
      })
      .catch((error) => console.error("Error adding phone:", error));
  };

  const handleDelete = (contactId, phoneId) => {
    fetch(`${host}/contacts/${contactId}/phones/${phoneId}`, {
      method: "DELETE",
    })
      .then(() => {
        setRender(!render);
      })
      .catch((error) => console.error("Error deleting phone:", error));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/contacts/${contact.id}/phones`);
        const data = await response.json();
        setPhones(data);
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    };
    fetchData();
  }, [render]);

  return (
    <div className="mb-2">
      <div className="border-t-2 border-black p-1"></div>
      <div className="flex">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 border-black border-2"
          type="text"
          placeholder="Name"
        />
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="ms-1 px-2 border-black border-2"
          type="text"
          placeholder="Phone Number"
        />
        <button onClick={() => handleAddPhone(contact.id)} className="ms-1 px-2 rounded bg-green-500">Add</button>
      </div>
      <div className="mt-2">
        <div className="flex">
          <div className="w-5/12 border-[1px] border-black">
            <div className="ms-2 my-1">Name</div>
          </div>
          <div className="w-5/12 border-[1px] border-black">
            <div className="ms-2 my-1">Number</div>
          </div>
          <div className="w-2/12 border-[1px] border-black">
            <div className="ms-2 my-1"></div>
          </div>
        </div>
        {phones.map((phone, index) => (
          <div key={index} className="flex">
            <div className="w-5/12 border-[1px] border-black">
              <div className="my-1 ms-2">{phone.name}</div>
            </div>
            <div className="w-5/12 border-[1px] border-black">
              <div className="my-1 ms-2">{phone.phoneNumber}</div>
            </div>
            <div className="flex justify-center w-2/12 border-[1px] border-black">
              <button onClick={() => handleDelete(contact.id, phone.id)} className="bg-red-500 px-1 my-1 rounded-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Phone;
