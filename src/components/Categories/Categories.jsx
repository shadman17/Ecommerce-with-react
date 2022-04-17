import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesList } from '../../redux/action/categoryAction/categoryAction'
import { Container } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import "./categories.css"
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/api';


const styles = {
  productHeader: {
    marginTop: '100px',
  },

  header: {
    textAlign: 'center'
  }

}



const Categories = ({getCategory, getAllProducts}) => {

  const [loading, setLoading] = useState(false)
  const { categories } = useSelector(store => store.categoriesList)
  const dispatch = useDispatch()

  const data = [...categories]

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      dispatch(getCategoriesList())
      setLoading(false)
    }
    getCategories()

  }, [dispatch])



  const Loading = () => {
    return <div>

      <Grid container justifyContent={"center"} spacing={1} >
        <Grid md={12} item >
          <Skeleton variant="rectangular" height={120} />
        </Grid>
      </Grid>
    </div>
  }

  const Showcategories = () => {
    return (
      <div>
        {
          Object.keys(data).length ? <div className="container">
            <div className="row justify-content-center ">
              <div className="card category-card mx-3 my-2 px-0 py-0"  key={122222} style={{ width: "12rem" }}>
                <Button onClick={getAllProducts} style={{ textDecoration: 'none', color: "black", }}>
                  <div className="card-body">

                    <h6 className="card-text">See All Products</h6>
                  </div>
                </Button>
              </div>
              {
                data.map(item => {
                  return <div className="card category-card mx-3 my-2 px-0 py-0" key={item._id} style={{ width: "12rem" }}>
                    <Button onClick={() => getCategory(item._id)} style={{ textDecoration: 'none', color: "black", }}>
                      <div className="card-body">

                        <h6 className="card-text">{item.name}</h6>
                      </div>
                    </Button>
                  </div>
                })
              }

            </div>
          </div > : <Loading />
        }
      </div>
    )

  }

  return (
    <div className='product-list container' style={styles.productHeader}>
      {/* <Container> */}
      <Typography variant="h4" style={styles.header}>
        Featured Categories
      </Typography>
      <hr />

      {/* </Container > */}
      <Showcategories />
    </div>
  )
}

export default Categories