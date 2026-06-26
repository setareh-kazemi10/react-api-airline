import Axios from "axios";
import { useState } from "react";

const App = () => {
  const [airLineName, setName] = useState("");
  const [item, setItem] = useState({});
  const [error, setError] = useState("");

  function fetchAirLine() {
    setError("");

    if (airLineName.trim() === "") {
      setItem({});
      setError("Please enter an airline name!");
      return;
    }
    
    Axios.get(
      `https://api.api-ninjas.com/v1/airlines?name=${airLineName}`,
      {
        headers: {
          "X-Api-Key":
            "yKtQG2QIiX5002MfciNn3Q==PAxEsgNST7yCnIFc",
        },
      }
    )
      .then((res) => {
        if (res.data.length === 0) {
          setItem({});
          setError("Airline Not Found!");
        } else {
          setItem(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        setItem({});
        setError("Something went wrong!");
      });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2 mt-5">
            <div className="card">
              <div className="card-header">
                <h3>Search Airline</h3>
              </div>

              <div className="card-body">
                <label className="form-label">
                  Airline Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Airline Name Search"
                  value={airLineName}
                  onChange={(event) => setName(event.target.value)}
                />

                <button
                  className="btn btn-danger my-3"
                  onClick={fetchAirLine}
                >
                  Search
                </button>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                {item.name && (
                  <div className="mt-3">
                    <h4>{item.name}</h4>

                    {item.logo_url && (
                      <img
                        src={item.logo_url}
                        className="img-fluid img-thumbnail"
                        alt={item.name}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;