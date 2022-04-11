import React, { useState, useEffect } from 'react'
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getproductsList } from '../../redux/action/productAction/productAction';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/api';
import "./products.css"
import Categories from '../../components/Categories/Categories';
import Navbar from '../../components/Navbar/Navbar';


const styles = {
  productHeader: {
    marginTop: '100px',
  },

  header: {
    textAlign: 'center'
  }

}

const Products = () => {

  const { products } = useSelector(store => store.productsList)
  const dispatch = useDispatch()
  
  const data = [...products]
  const [filter, setFilter] = useState([])
  const [category, setCategory] = useState(false)


  const [loading, setLoading] = useState(false)

  const getCategory = async (id) => {
    const updated_list = data.filter(x=> x.category._id === id)
    setFilter(updated_list)
    setCategory(true)
  }

  const getAllProducts = () => {
    setCategory(false)
  }

  useEffect(() => {

    const getProducts = async () => {
      setLoading(true)
      dispatch(getproductsList())
      setLoading(false)
    }

    getProducts()
    

  }, [dispatch])



  const Loading = () => {
    return <div>

      <Grid container justifyContent={"center"} spacing={1} >
        <Grid md={3} item >
          <Skeleton variant="rectangular" width={250} height={300} />
        </Grid>
        <Grid md={3} item >
          <Skeleton variant="rectangular" width={250} height={300} />
        </Grid>
        <Grid md={3} item >
          <Skeleton variant="rectangular" width={250} height={300} />
        </Grid>
        <Grid md={3} item>
          <Skeleton variant="rectangular" width={250} height={300} />
        </Grid>
      </Grid>


    </div>
  }

  const ShowProducts = () => {
    return (
      <div>
        {
          Object.keys(data).length ? ( category ?  <div className="container ">
          <div className="row justify-content-around ">
            {filter.map(item => {
              return <div className="card my-4 mx-3 py-4 product-card" key={item.id} style={{ width: "20rem" }}>
                <img src={`${BASE_URL}${item.image}`} className="card-img-top" alt={item.title} />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.title.slice(0, 20)}</h5>
                  <p className="lead">${item.price}</p>
                  <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
                    <Button variant='outlined' sx={{ color: "black", display: "block", border: "2px black solid", margin: "auto" }}>
                      View Details
                    </Button>
                  </Link>

                </div>
              </div>
            })}
          </div>
        </div> : <div className="container ">
        <div className="row justify-content-around ">
          {data.map(item => {
            return <div className="card my-4 mx-3 py-4 product-card" key={item.id} style={{ width: "20rem" }}>
              <img src={`${BASE_URL}${item.image}`} className="card-img-top" alt={item.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{item.title.slice(0, 20)}</h5>
                <p className="lead">${item.price}</p>
                <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
                  <Button variant='outlined' sx={{ color: "black", display: "block", border: "2px black solid", margin: "auto" }}>
                    View Details
                  </Button>
                </Link>

              </div>
            </div>
          })}
        </div>
      </div> )
            : <Loading />
        }

      </div>
    )
  }

  return (
    <div>
    {
      window.location.href === `http://localhost:3000/products` ? <Navbar/> : null
    }
    
    <div className='product-list ' style={styles.productHeader}>
      <Categories getCategory={getCategory} getAllProducts={getAllProducts}/>
      
      <Container>
      <br/>
        <Typography variant="h4" style={styles.header}>
          Featured Products
        </Typography>
        <hr />

        <ShowProducts />

      </Container>
    </div>
    </div>
  )
}

export default Products