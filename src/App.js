import { useState, useEffect } from "react";
import PieChart from "./components/pieChart";
import "./App.css";
import { Table } from 'antd';
import Summary  from './components/Summary'
import 'antd/dist/antd.css';
function App() {
  
  var initial_date; // used for storing fetched current data from current_date.json

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Vaccination Status',
      dataIndex: 'vaccine_status',
      width: 150,
      render(text, record) {
        return {
          props: {
            style: { color: text === 'VACCINE DONE' ? "green" : "red" }
          },
          children: <div>{text}</div>
        };
      }
    },
  ]; 
  const tempData = []; //to store the fetched data 
  


  const [currentDate, setCurrentDate] = useState(); // Current Date Fetch from current_date.json in public/data
  const [vaccineDates, setVaccineDates] = useState([]); // List Of Vaccine Dates Fetch from vaccine_dates.json in public/data
  const [vaccineData, setData] = useState([]); // List of  people with vaccine status used to check and count status of vaccinat
  


  useEffect(() => {
    // Use fetch() to fetch requited data from public/data

    fetchInitialDate()
    fetchVaccineDate()
    setVaccineDates()
    setData()
  },[])
 
  

  


 // function to fetch current date from current_date.json

  const fetchInitialDate = () => {
    fetch('data/current_date.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        var s = response.json();
        return s;
      })
      .then(json => {
        initial_date = json.current_date
      //  console.log(initial_date);
        setCurrentDate(initial_date) // setting current date from current_date.json
        initialData(initial_date)
        return (initial_date)
      })
      .catch(function () {
        console.log('error');
      })

  }
// function to fetch data from vaccine_dates.json 
  const fetchVaccineDate = () => {
    fetch('data/vaccine_dates.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        var s = response.json();
        return s;
      })
      .then(json => {

        setVaccineDates(json);
        //console.log(json)
      })
      .catch(function () {
        console.log('error');
      })

  }


 // Function to fetch data for current date from vaccine_dates.json
  function initialData(initial_date) {
    fetch('data/vaccine_dates.json').then(res => {
      return res.json()
    }).then(json => {
      json.map(data => {
        let status;
        let t1 = new Date(data.vaccination_date)
        let t2 = new Date(initial_date)
        //console.log(initial_date)
        if (t1 <= t2) {               // comparing if vaccie_date <= current date
          status = 'VACCINE DONE';
        } else {
          status = 'VACCINE PENDING';
        }
        tempData.push({
          key: data.person_id,
          name: data.person_name,
          vaccine_status: status
        })
      })
      setData(tempData);
    })
  }

 // function to decrement date when '-' button is clicked
  function decrementDate() {

    var date = new Date(currentDate);
    date.setDate(date.getDate() - 1); 
   // console.log(date);
    setCurrentDate(date) // updadting the current date 
    updateData()
  }

 // function to inrement date when '+' button is clicked
  function incrementDate() {

    var date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
   // console.log(date);
    setCurrentDate(date) // updadting the current date 
    updateData();
  }

  // function to update the data when increment or decrement button is clicked
  function updateData() {
    vaccineDates.map(data => {
      var status;
      var t1 = new Date(data.vaccination_date)
      var t2 = new Date(currentDate)
      if (t1 <= t2) {
        status = 'VACCINE DONE';
      } else {
        status = 'VACCINE PENDING';
      }
      
     // pushing a data into tempData array with vaccine status of a person.
      tempData.push({
        key: data.person_id,  
        name: data.person_name,
        vaccine_status: status
      })
    })

    setData(tempData)  // setting VaccineData state = tempData.

  }

  // function to calculate the count of vaccinated folks.
  function vaccniatedFolks() {
    let count = 0;
    vaccineData ? (vaccineData.map(data => {
      if (data.vaccine_status === 'VACCINE DONE') {
         count++;
      }
    })):(console.log(''))
    return count;
  }
  // function to calculate the count of non-vaccinated folks.
  function notVaccinatedFolks(){
     return (Math.abs(vaccniatedFolks() - (vaccineData ? (vaccineData.length):(0))));
  }

  return (

    <div className="App">
      <div className="date">

        <button onClick={() => decrementDate()}>-</button> {/* Set Current Date to next date on click  */}
      
        <div className="currentdate">{currentDate ? (new Date(currentDate).toDateString()) : (console.log(''))}</div>
        <button onClick={() => incrementDate()}>+</button> {/* Set Current Date to drevious date on click  */}
      </div>

      <div className = 'summary'>
        <Summary vaccinated = {vaccniatedFolks()} total = {vaccineData ? (vaccineData.length):(0)}/>
      </div>
      <div className='wrapper'>

        <div className='table'>

          <Table columns={columns} dataSource={vaccineData} scroll={{ y: 300 }} />
        </div>
        <div className="chart">

          {/* Update the following Component to display pie chart with proper data, alignment and colors */}

         
          <PieChart data={[vaccniatedFolks(), notVaccinatedFolks()]} />

        </div>
        {/* Add a table with the user data as explained in README.MD */}

      </div>
    </div>
  );
}

export default App;
