import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteProduct, getAdminProducts } from "../../actions/productActions"
import { clearError, clearProductDeleted } from "../../slices/productSlice"
import Loader from '../layouts/Loader';
import { MDBDataTableV5} from 'mdbreact';
import {toast } from 'react-toastify'
import Sidebar from "./Sidebar"

export default function ProductList() {
    const { products = [], loading = true, error }  = useSelector(state => state.productsState)
    const { isProductDeleted, error:productError }  = useSelector(state => state.productState)
    const dispatch = useDispatch();

    const setProducts = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Seller Ratings',
                    field: 'sellerRatings', // Add the sellerRatings field
                    sort: 'asc',
                  },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        products.forEach( product => {
            const sellerName = product.seller.name;
            data.rows.push({

                id: product._id,
                name: product.name,
                // npm stat
                price : `Rs.${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, product._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }
    // products.forEach((product) => {
    //     const sellerName = product.seller.name; // Adjust this to your data structure
    
    //     data.rows.push({
    //       // Other fields
    //       sellerRatings: sellerRatings[sellerName]
    //         ? sellerRatings[sellerName].totalRatings / sellerRatings[sellerName].productCount
    //         : 0, // Calculate and display the average seller rating
    //     });
    //   });
    
    //   return data;

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if(error || productError) {
            toast(error || productError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isProductDeleted) {
            toast('Product Deleted Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        dispatch(getAdminProducts)
    },[dispatch, error, isProductDeleted])


    return (
        <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Product List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTableV5
                        data={setProducts()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                }
            </Fragment>
        </div>
    </div>
    )
}