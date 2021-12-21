import { useState, useRef, useEffect } from "react";
import "../../App.css";
const Index = () => {
  const [number, setNumber] = useState();
  const [totalMoney, setTotalMoney] = useState(0);
  const [lsTrs, setLsTrs] = useState([]);
  const [flag, setFlag] = useState(false);

  const searchInput = useRef(null);
  //   Get data from localstorage

  useEffect(() => {
    console.log(localStorage.getItem("totalMoney"));
    // if (!localStorage.getItem("totalMoney"))
    setTotalMoney(parseInt(localStorage.getItem("totalMoney") || 0));
    // else
    //     setTotalMoney(0)
    if (localStorage.getItem("lsTrs"))
      setLsTrs([...localStorage.getItem("lsTrs").split(",")]);

    console.log("before render");
  }, []);
  // When Transaction item update
  useEffect(() => {
    localStorage.setItem("lsTrs", lsTrs);
  }, [lsTrs]);

  //   Credit Funtion
  const crMoney = () => {
    if (!number) return;
    let newMon = totalMoney + number;
    setTotalMoney(newMon);
    setLsTrs([...lsTrs, `Credit ${number}`]);
    setFlag(false);
    handleInput();
    localStorage.setItem("check", "Added");
    localStorage.setItem("totalMoney", newMon);
    // localStorage.setItem("lsTrs", lsTrs);
    console.log("credit", number, lsTrs, typeof totalMoney);
  };

  // Debit function
  const dbMoney = () => {
    if (!number) return;
    console.log("debit", typeof totalMoney);
    let newMon = totalMoney - number;
    if (newMon < 0) return setFlag(true);
    setFlag(false);
    setTotalMoney(newMon);
    setLsTrs([...lsTrs, `Debit ${number}`]);
    localStorage.setItem("totalMoney", newMon);
    // localStorage.setItem("lsTrs", lsTrs);
    handleInput();
  };

  //   Handle Input bar
  const handleInput = () => {
    searchInput.current.value = "";
    searchInput.current.focus();
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      {flag && <span style={{ color: "red" }}>Insufficent Balance</span>}
      <div className="first-block">
        <h3>Balance: <span class="h2 text-primary">{totalMoney}</span></h3>
        <input
          type="number"
          min="0"
          ref={searchInput}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
        <br />
        <div>
          <button onClick={crMoney} class="btn btn-success m-2">
            Add
          </button>
          <button onClick={dbMoney} class="btn btn-danger m-2">
            Remove
          </button>
        </div>
      </div>
      <div className="second-block">
        {lsTrs.length > 0 && (
          <h3 style={{ fontWeight: "bolder" }}>Transactions: </h3>
        )}
        <ul class="list-group">
          {lsTrs.map((item, ind) => {
              let arr = item.split(' ');
              console.log(arr)
            return arr[0]=='Credit' ? <li class="list-group-item d-flex justify-content-between align-items-center p-1 mb-2 bg-success  text-white" key={ind}>{arr[0]}
            <span class="h5" >{arr[1]}</span>
            </li> : <li class="list-group-item d-flex justify-content-between align-items-center p-1 mb-2 bg-danger  text-white" key={ind}>{arr[0]}
            <span class="h5">{arr[1]}</span>
            </li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Index;
