import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteOrder, adminOrders as adminOrdersAction } from "../../actions/orderActions"
import { clearError, clearOrderDeleted } from "../../slices/orderSlice"
import Loader from '../layouts/Loader';
import { MDBDataTableV5} from 'mdbreact';
import {toast } from 'react-toastify'
import Sidebar from "./Sidebar"

export default function SellerList() {
    const { adminSellers = [], loading = true, error, isSellerDeleted }  = useSelector(state => state.sellerState)

    const dispatch = useDispatch();

    const setSeller = () => {
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
            
                },
                {
                    label: 'Address',
                    field: 'address',
                    
                },
                {
                    label: 'Contact Number',
                    field: 'contactnumber',
                 
                },
                
            ],
            rows : []
        }

        adminSellers.forEach( seller => {
            data.rows.push({
                id: seller._id,
               
                actions: (
                    <Fragment>
                        <Link to={`/admin/seller/${seller._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        {/* <Button onClick={e => deleteHandler(e, seller._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button> */}
                    </Fragment>
                )
            })
        })

        return data;
    }

    // const deleteHandler = (e, id) => {
    //     e.target.disabled = true;
    //     dispatch(deleteSeller(id))
    // }

    useEffect(() => {
        if(error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        // if(isOrderDeleted) {
        //     toast('Seller Deleted Succesfully!',{
        //         type: 'success',
        //         position: toast.POSITION.BOTTOM_CENTER,
        //         onOpen: () => dispatch(clearSellerDeleted())
        //     })
        //     return;
        // }
   
    //    dispatch(adminSellersAction)
      },[dispatch, error, isSellerDeleted])

    return (
        <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Seller List</h1>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTableV5
                        data={setSeller()}
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