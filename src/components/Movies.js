import React, {useState,useEffect }  from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import EditMovie from './EditMovie'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 300,
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
}));

const API_MOVIE = "http://localhost:8000/api/movies"

function AllMovies(){

    const [all_movies, setMovies] = useState([]);

    useEffect(() => {

        const getMovies = () => fetch(`${API_MOVIE}`).then(res => res.json());
    
        getMovies().then(data => setMovies(data.movies));    
        
    
      }, []);

    console.log(all_movies);
    
    const classes = useStyles();

    

    function removeMovie(movieId){
      
      

      fetch(`${API_MOVIE+'/'+movieId}`,{
        method:"DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       },        
      }).then(res => res.json());

  }

    return (
        
        <div className={classes.root}>

        {all_movies.map((item, i) => {
         
        return <span>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt={item.title} src={"http://localhost:8000/covers/"+item.cover} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {item.title}
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary">
                   {item.cat_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                   {item.cnt_pro}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.descrp}
                  </Typography>
                  
                </Grid>
                <Grid>
                  <EditMovie movieId={item.id}/>
                  
                </Grid>
                <Grid>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}  onClick={(e) => { removeMovie(item.id)}} >
                    Remove
                  </Typography>
                </Grid>
              </Grid>
              
            </Grid>
          </Grid>
        </Paper>
        </span>
        })}
        
      </div>
      
    
    );

}

export default AllMovies;