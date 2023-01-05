import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import Modal from "./components/Modal.tsx";

function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [showProdWithId, setShowProdWithId] = useState(0);
  const [err, setErr] = useState("");

  useEffect(() => {
    getProducts();
  }, [id, page]);

  const getProducts = () => {
    id === 0
      ? axios
          .get("https://reqres.in/api/products?per_page=5&page=" + page)
          .then((response) => setProducts(response.data.data))
          .catch((err) => setErr("Error " + err.response.status))
      : axios
          .get("https://reqres.in/api/products?id=" + id)
          .then((response) => setProducts([response.data.data]))
          .catch((err) => setErr("Error " + err.response.status));
  };

  return (
    <div className="container">
      {err !== "" ? (
        <div>{err}</div>
      ) : (
        <div className="main-block">
          <input
            type="number"
            placeholder="Enter the id"
            onChange={(event) => setId(+event.target.value)}
            className="main-block__input"
          />
          <table className="main-block__table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Year</th>
              </tr>
            </thead>

            {products ? (
              products.map((prod, index) => (
                <tbody key={index}>
                  <tr
                    onClick={() =>
                      setShowProdWithId(
                        prod.id !== showProdWithId ? prod.id : 0
                      )
                    }
                    style={{
                      backgroundColor: prod.color,
                      borderColor: prod.color,
                    }}
                    className="main-block__data"
                  >
                    <td>{prod?.id}</td>
                    <td>{prod?.name}</td>
                    <td>{prod?.year}</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <Modal isOpen={prod.id === showProdWithId}>
                        <p>
                          <span>id:</span> {prod.id}
                        </p>
                        <p>
                          <span>name:</span> {prod.name}
                        </p>
                        <p>
                          <span>year:</span> {prod.year}
                        </p>
                        <p>
                          <span>color:</span> {prod.color}
                        </p>
                        <p>
                          <span>pantone_value:</span> {prod.pantone_value}
                        </p>
                      </Modal>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <span>Data loading ...</span>
            )}
          </table>
          {id !== 0 ? null : (
            <div className="main-block__btns">
              {page !== 1 ? (
                <button onClick={() => setPage(page - 1)}>
                  <span>&#8249;</span>
                </button>
              ) : (
                <div></div>
              )}
              {page !== 3 ? (
                <button onClick={() => setPage(page + 1)}>
                  <span>&#8250;</span>
                </button>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
