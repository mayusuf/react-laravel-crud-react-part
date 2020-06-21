import React, {useState,useEffect }  from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import Movies from './components/Movies'

import './App.css';
import axios from 'axios';

const API_MOVIE = "http://localhost:8000/api/movies"
const API_CAT  = "http://localhost:8000/api/categories"

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  input: {    
    display: 'none',
  },

  Button:{
    margin: theme.spacing(1), 
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: '25ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

}));



function submitForm(contentType, data, setResponse) {
  axios({
      url: `${API_MOVIE}`,
      method: 'POST',
      data: data,
      headers: {
          'Content-Type': contentType
      }
  }).then((response) => {
      setResponse(response.data);

  }).catch((error) => {
      setResponse("error");
  })
}

function getCategories(setCategories){

  axios({
      url: `${API_CAT}`,
      method: 'GET'      
  }).then((response) => {
    //console.log(response.data);   
    setCategories(response.data.yusuf);
    
  }).catch((error) => {
      //setResponse("error");
  })
  
}

function App() {

  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const [descrp, setDesc] = React.useState("");
  const [cat_id, setCat] = React.useState(""); 
  const [cnt_pro, setCountry] = React.useState(""); 
  const [cover, setFile] = React.useState(null);
  
  
  const [cats, setCategories] = useState([]);

  

  useEffect(() => {

    const getCategories = () => fetch(`${API_CAT}`).then(res => res.json());

    getCategories().then(data => setCategories(data.categories));


  }, []);

  //const [cate, setState] = useState(cats);
   
  console.log(cats);
 

  function uploadWithFormData(){
    const formData = new FormData();
    formData.append("title", title);
    formData.append("descrp", descrp);
    formData.append("cat_id", cat_id);
    formData.append("cnt_pro", cnt_pro);
    formData.append("cover", cover);

    submitForm("multipart/form-data", formData, (msg) => console.log(msg));
    
    
}

  return (
    
    <div className="App">  

    <form className={classes.root} >
    
      <div>
        <TextField
          required
          id="outlined-required"
          label="Title"
          defaultValue=""
          variant="outlined"
          onChange={(e) => { setTitle(e.target.value )}}
        />

        <TextField
          required
          id="outlined-required"
          label="Description"
          defaultValue=""
          variant="outlined"
          onChange={(e) => { setDesc(e.target.value )}}
        />

       <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-cat-native-simple">Category*</InputLabel>
        <Select
          native
          value={cat_id}
          onChange={(e) => setCat(e.target.value)}
          required
          label="Category"
         
          inputProps={{
            name: 'cat_id',
            id: 'outlined-cat-native-simple'
          }}>
          
          <option aria-label="None" value="" />
          {cats.map((item, i) => {
            return <option value={item.cat_id}>{item.cat_name} </option>
          })}    
         
          
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-country-native-simple">Country*</InputLabel>
        <Select
          native
          value={cnt_pro}
          onChange={(e) => setCountry(e.target.value)}
          required
          label="Country"
          inputProps={{
            name: 'cnt_pro',
            id: 'outlined-country-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value='USA'>USA</option>
          <option value='UK'>UK</option>
          <option value='Canada'>Canada</option>
          <option value='France'>France</option>
          <option value='Germany'>Germany</option>
        </Select>
      </FormControl>

      <input
        accept="image/*"
        required
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <label htmlFor="contained-button-file">
        <Button className={classes.Button} variant="contained" color="primary" component="span">
          Cover Upload* 
        </Button>
      </label>

      <Button variant="contained" color="primary" onClick={uploadWithFormData}>
        Save
      </Button>

      </div>
    </form>
    
    <Movies/>

    </div>
    
  );
}


export default App;
