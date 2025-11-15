import React from 'react'
import SecondHeader from '../component/Header/SecondHeader'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router';
const Cart = () => { 
  return (
    <div>
      <SecondHeader text="Cart"></SecondHeader>
      <div className='flex  justify-around my-14'>

        {/* Table part  */}
       <div className="">
        <table className='lg:min-w-[817px]'>
          <thead>
        <tr  className=" bg-[#FFF9E5] ">
          <th className=' py-3 text-[16px] font-medium'>Product</th>
          <th className=' py-3 text-[16px] font-medium'>Price</th>
          <th className=' py-3 text-[16px] font-medium'>Quantity</th>
          <th className=' py-3 text-[16px] font-medium'>SubTotal</th>
          <th className=' py-3 text-[16px] font-medium'></th>
        </tr>
          </thead>

        <tbody>
        <tr>
          <td className='flex items-center justify-center gap-2 text-center py-3 text-[#9F9F9F] '>
            <img src="sd" alt="sdf" />
            The product
            </td>
          <td className="px-1 py-3 text-[#9F9F9F] text-center"> Rs.   23231</td>
          <td className="px-1 py-3  text-center">1</td>
          <td className="px-1 py-3  text-center">1</td>
          <td className=""> <MdDelete size={30} color='#FBEBB5  '/> </td>
        </tr>
        </tbody>
        
       </table>
       </div>

        {/* Total Part  */}
        <div className=" w-[393px] max-h-[390px] bg-[#FFF9E5]">
          <h2 className="text-center font-semibold  pt-3 mb-4 text-[32px]">Cart Totals</h2>
            {/* <p className='text-center'>Your total cost of all the  product is give <br /> below.</p>  */}
        <div className="flex items-center justify-around px-5 mb-10">
          <p className='text-center text-base text-[16px] font-medium'>Total</p> 
          <p className='text-[#B88E2F] text-base text-[20px] font-medium'>Rs.12009212</p>
           
        </div>
        
{/* Check Out Button  */}
       <div className='flex items-center justify-center mb-10'>
        <Link to="/checkout">
        <button className='px-8 py-3 border-2 rounded-2xl'>Check Out</button></Link>
       </div>

        </div>

      </div>
    </div>
  )
}

export default Cart