import React , {useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import axios from 'axios';

const API_MOVIE = "http://localhost:8000/api/movies"
const API_CAT  = "http://localhost:8000/api/categories"

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


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
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function submitForm(contentType, data, id, setResponse) {

  alert(id)

  axios.put(
    `${API_MOVIE+'/'+id}`, data ,{ headers: {"Content-Type": contentType}}
 ).then((response) => {    
    setResponse(response.data);
  }).catch((error) => {
    setResponse("error");
  })


  //   axios.put(
  //     `${API_MOVIE+'/'+id}`, {
  //       "title":"edit Test",
  //       "cover":"yusuf.tmp.jpeg",
  //       "cat_id":"3",
  //       "descrp":"sgogjkdjk",
  //       "cnt_pro":"Germany"
  //   },{ headers: {"Content-Type": contentType}}
  // ).then((response) => {
      
  //     setResponse(response.data);

  //   }).catch((error) => {
  //     setResponse("error");
  //   })

  }
  
  
export default function EditMovie(props) {

    
  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const [descrp, setDesc] = React.useState("");
  const [cat_id, setCat] = React.useState(""); 
  const [cnt_pro, setCountry] = React.useState(""); 
  const [cover, setFile] = React.useState(null);
  
  
  const [cats, setCategories] = useState([]);
  const [movie_details, setMovieDetails] = useState([]);

  useEffect(() => {

    const getCategories = () => fetch(`${API_CAT}`).then(res => res.json());

    getCategories().then(data => setCategories(data.categories));
    
    const getMovieDetails = () => fetch(`${API_MOVIE+'/'+props.movieId}`).then(res => res.json());

    // getMovieDetails().then(
    //   data => setTitle(data.movie[0].title),setDesc(data.movie[0].descrp), 
    //   setCountry(data.movie[0].cnt_pro), setCat(data.movie[0].cat_id),
    //   setFile(data.movie[0].cover));  

    getMovieDetails().then(data=>setTitle(data.movie[0].title));
    getMovieDetails().then(data=>setDesc(data.movie[0].descrp));
    getMovieDetails().then(data=>setCat(data.movie[0].cat_id));
    getMovieDetails().then(data=>setCountry(data.movie[0].cnt_pro));
    getMovieDetails().then(data=>setFile(data.movie[0].cover));

  }, []);
  

  console.log(cats);
  
  //alert(movie_details.cat_id);

  async function uploadWithJSON(){

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

  alert(typeof cover)

  const data = {
    title: title,        
    descrp: descrp,
    cat_id: cat_id,
    cnt_pro: cnt_pro,
    cover:cover
}
   
   if(typeof cover == 'object'){    
      data.cover = await toBase64(cover)
    }else{
      data.cover = "noNewFile"
    }

    //data.push(cov)
    submitForm("application/json", data, props.movieId, (msg) => console.log(msg));
    
}


  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    
    <div style={modalStyle} className={classes.paper}>
     
      <h2 id="simple-modal-title">Movie Edit ({title}) </h2>
      <p id="simple-modal-description">
      <div className="App">  
       
        <form className={classes.root} >
          
          <div>
              
            <TextField
              required
              id="outlined-required"
              label="Title"
              defaultValue={title}
              variant="outlined"
              onChange={(e) => { setTitle(e.target.value )}}
            />

            <TextField
              required
              id="outlined-required"
              label="Description"
              defaultValue={descrp}
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
          <br/>
          {/* <input
            accept="image/*"
            
            className={classes.input}
            id="contained-button-file"
            type="file" 
            
          /> */}
         <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])}  />
          {/* <label htmlFor="contained-button-file">
          <img className={classes.image} alt={title} src={"http://localhost:8000/covers/"+cover} />
            <Button className={classes.Button} variant="contained" color="primary" 
            component="span" onChange={(e) => setFile(e.target.files[0])}>
              Cover Upload* 
            </Button>
          </label> */}
          <br/>
          <Button variant="contained" color="primary" onClick={uploadWithJSON}>
            Save
          </Button>

          </div>
        </form>
       </div>
      </p>
     
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
                    Edit
                  </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
