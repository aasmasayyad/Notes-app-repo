
import { Fragment } from 'react';
import classes from './Layout.module.css'
import MainNavigation from './MainNavigation';

const Layout = (props) =>{
    console.log('in Layout')
   return <Fragment> 
       <MainNavigation/>
       <main className={classes.main}>{props.children} </main>
   </Fragment>

}

export default Layout;