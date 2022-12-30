import React from "react";

const Items = () => {
  const handleOrderForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const itemName = form.item.value;
    const Quantity = form.quantity.value;
    const Phone = form.phone.value;

    const ordered = {
      productName: itemName,
      Quantity: Quantity,
      phone: Phone,
    };
    // const ordereditems = {
    //   orderId: "63af4d89435c85423f3e36f7",
    //   productName: itemName,
    //   Quantity: Quantity,
    // };
    console.log(ordered);

    // post order to mongodb
    fetch(" https://task4-server-chi.vercel.app/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ordered),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          const orderedItems = {
            orderId: data.insertedId,
            productName: itemName,
            Quantity: Quantity,
          };

          fetch(" https://task4-server-chi.vercel.app/ordereditems", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(orderedItems),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
          alert("ordered successfully");
          form.reset();
        }
        console.log(data);
      });

    fetch(" https://task4-server-chi.vercel.app/ordereditems")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div>
      <form
        onSubmit={handleOrderForm}
        className="p-8 mx-auto bg-orange-600 w-96"
      >
        <input
          className="mb-3 px-3 py-2"
          type="text"
          name="item"
          placeholder="Items Name"
        />{" "}
        <br />
        <input
          className="mb-3 px-3 py-2"
          type="text"
          name="quantity"
          placeholder="Quantity "
        />{" "}
        <br />
        <input
          className="mb-3 px-3 py-2"
          type="text"
          name="phone"
          placeholder="phone"
        />{" "}
        <br />
        <button className="btn btn-primary">Order</button>
      </form>
    </div>
  );
};

export default Items;
