import { DataGrid } from '@mui/x-data-grid';
import list from '../style/list.module.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import load from '../assets/loading.svg'
import axios from 'axios'

const List = ()=>{

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true) 
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'age', headerName: 'Age', width: 130 },
    { field: 'sex', headerName: 'Sex', width: 130 },
    {
      field: 'mobile',
      headerName: 'Mobile',
      type: 'number',
      width: 90,
    },
    {
      field: 'address',
      headerName: 'Address',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 260,
    },
    { field: 'id', headerName: 'Govt. ID', width: 100 },
    { field: 'id_number', headerName: 'ID Number', width: 170 },
    { field: 'gaurdName', headerName: 'Gaurdian Name', width: 130 },
    { field: 'nationality', headerName: 'Nationality', width: 130 },
  
  
  
  ];
  
  useEffect(()=>{
    const fetchData = async()=>{
      axios.defaults.baseURL = "http://localhost:8080"
      try{

        const res = await axios.get('/users')
        console.log(res.data);
        setRows(res.data)

        setLoading(false)
      }
      catch(err){
        console.log(err);
      }
    }

    fetchData()
  }, [])
  
  if(loading){
    return(
      <div className={list.load}>
        <img className={list.animation} src={load} alt="" />
      </div>
    )
  }

  return (
    <div className={list.section}>
      <div className={list.action}>
        <Link to='/' className={list.btn}>Register User</Link>
      </div>
      <h1 className={list.head}>Users Table</h1>
    <div className={list.list}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id} // <-- set the key prop to the id field
      />
    </div>
    </div>
  );
}

export default List