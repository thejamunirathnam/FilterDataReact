import React, { useState, useEffect } from "react";
import "./Dashbard.scss";

export default function Dashboard(props) {
  const [list, setList] = useState([]);
  const [flist, setFList] = useState([]);
  const [cdate, setCdate] = useState(false);
  const [sDate, setStartDate] = useState("");
  const [eDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    setList(props.arrlist);
    setFList(props.arrlist);
  }, [props.arrlist]);

  useEffect(() => {
    if (sDate !== "" && eDate !== "") {
      fetchRangeDate();
    }
  }, [eDate, sDate]);

  const fetchRangeDate = () => {
    let filterDate = list.filter(function (item) {
      return item.date >= sDate && item.date <= eDate;
    });
    setFList(filterDate);
  };

  const changeHandler = (e) => {
    if (e.target.value != "custom date") {
      if (e.target.value === "0") {
        setFList(list);
      } else {
        let date = new Date(
          new Date().setDate(new Date().getDate() - e.target.value)
        )
          .toISOString()
          .slice(0, 10);
        setStartDate(date);
        setEndDate(new Date().toISOString().slice(0, 10));
      }
      setCdate(false);
    } else {
      setEndDate("");
      setCdate(true);
    }
  };

  return (
    <div className="main-container">
      <div className="filter-container">
        <div>
          <select onChange={(e) => changeHandler(e)}>
            <option value="0">Full List</option>
            <option value="1">yesterday</option>
            <option value="7">last week</option>
            <option value="30"> last month</option>
            <option value="custom date"> custom date</option>
          </select>
        </div>
        {cdate ? (
          <div className="date-container">
            <label>From: </label>
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="From"
            />
            <label>To: </label>

            <input
              type="date"
              onBlur={(e) => setEndDate(e.target.value)}
              placeholder="To"
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="user-container">
        {flist.map((item, index) => (
          <div className="image-type" key={index}>
            <div className="title">{item.title}</div>
            <div className="desc">{item.notes}</div>
            <div className="remainder">Remainder: {item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
