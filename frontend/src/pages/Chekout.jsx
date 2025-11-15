import React from 'react'
import SecondHeader from '../component/Header/SecondHeader'
import { FaCircle } from "react-icons/fa";
const Checkout = () => { 
  return (
    <div>
      <SecondHeader text="Checkout"></SecondHeader>
      <div className="flex justify-around my-10">
        {/* Bill Details  */}
        <div className="w-[608px] p-2 px-4">
             <form action="">
            <h2 className="text-[36px] font-semibold mb-10">Billing Details</h2>

         <div className="flex gap-6 mb-10">
            <div className='flex flex-col '>
               <label htmlFor="fname" className='font-medium pb-4  text-[#16px]'>First Name</label>
            <input type="text" name='fname' className="border border-[#9F9F9F] px-3 h-[75px]  rounded-lg" />
            </div>
            <div className='flex flex-col'>
               <label htmlFor="lname" className='font-medium pb-4  text-[#16px]'>Last Name</label>
            <input type="text" name='fname' className="border border-[#9F9F9F] px-3 h-[75px] rounded-lg" />
            </div>
         </div>

          <div className="flex flex-col mb-10">
              <label htmlFor="company" className='font-medium pb-4  text-[#16px]'>Company Name (Optional)</label>
            <input type="text" name='company' className="border border-[#9F9F9F] px-3 h-[75px] rounded-lg" />
          </div>

          <div className="flex flex-col mb-10">
            <label htmlFor="country" className='font-medium pb-4  text-[#16px]'> Country / Region </label>
            <select name="country" className="border border-[#9F9F9F] text-[#9F9F9F] px-3 h-[75px] rounded-lg">
              <option value="nepal" className='text-[#9F9F9F]'> Nepal </option>
              <option value="china"> China </option>
              <option value="india"> India </option>
              <option value="pakistan"> Pakistan </option>
              <option value="sir-lanka">Sir Lanka</option>
            </select>
          </div>

          <div className="flex flex-col mb-10">
              <label htmlFor="street" className='font-medium pb-4  text-[#16px]'>Street address</label>
            <input type="text" name='street' className="border border-[#9F9F9F] px-3 h-[75px] rounded-lg" />
          </div>

          <div className="flex flex-col mb-10">
              <label htmlFor="city" className='font-medium pb-4  text-[#16px]'>Town / City</label>
            <input type="text" name='city' className="border border-[#9F9F9F] px-3 h-[75px] rounded-lg" />
          </div>

          <div className="flex flex-col mb-10">
            <label htmlFor="province" className='font-medium pb-4  text-[#16px]'> Province </label>
            <select name="province" className="border border-[#9F9F9F]  text-[#9F9F9F] px-3 h-[75px] rounded-lg">
              <option value="Koshi"> Koshi </option>
              <option value="Madhesh"> Madhesh </option>
              <option value="Bagmati" className='text-[#9F9F9F]'> Bagmati </option>
              <option value="Gandaki"> Gandaki </option>
              <option value="Lumbini"> Lumbini </option>
              <option value="Karnali"> Karnali </option>
              <option value="Sudurpaschim">Sudurpaschim</option>
            </select>
          </div>

          <div className="flex flex-col mb-10">
              <label htmlFor="zio" className='font-medium pb-4  text-[#16px]'>Zip Code</label>
            <input type="text" name='zip' className="border border-[#9F9F9F] px-3 h-[75px] rounded-lg" />
          </div>

          <div className="flex flex-col mb-10">
              <label htmlFor="zio" className='font-medium pb-4  text-[#16px]'>Phone</label>
            <input type="text" name='zip' className="border border-[#9F9F9F] px-3 h-[75px] rounded-lg" />
          </div>

          <div className="flex flex-col mb-10">
              <label htmlFor="zio" className='font-medium pb-4  text-[#16px]'>Email Address</label>
            <input type="text" name='zip' className="border border-[#9F9F9F] px-3 h-[75px] rounded-lg" />
          </div>

          <div className="flex flex-col mb-10">
              <label htmlFor="additional" className='font-medium pb-4 text-[#16px]'> Optional </label>
            <input type="additional" placeholder='Additional Information' name='zip' className="border border-[#9F9F9F] px-3 h-[75px] rounded-lg" />
          </div>

          </form>
        </div>

        {/* Place Order  */}
        <div className="w-[533px] px-2 py-15">
          <div className="flex justify-between ">

            <div className="">
              <h2 className="text-[24px] mb-3 font-medium ">Product</h2>
              <p className="text-[#9F9F9F] my-3">prouct-123 x 1 </p>
              <p className="">Total</p>
            </div>

            <div className="">
               <h2 className="text-[24px] mb-3 font-medium ">Sub Total</h2>
                <p className="font-light my-3"> Rs. 232342 </p>
              <p className="text-[#B88E2F] font-bold text-[24px]">Rs. 123034098</p>
            </div>

         
          </div>
        <hr className='mt-6 mb-2 text-[#D9D9D9]' />

{/* form   for payment method*/}
        <p>
          <h2 className="flex items-center gap-3 text-center"><FaCircle /> Direct Bank Transfer (Currently, This is not available)</h2>
          <p className="text-justify text-[#9F9F9F] pb-6 pt-5">
            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
          </p>
        </p>

        <form action="">
         <div className='flex  gap-3 my-3'>
          <input type="radio" name="method" value="bank" />
          <label htmlFor="bank">Direct Bank Transfer</label>          
         </div>

         <div className='flex  gap-3'>
          <input type="radio" name='method' value="cod" />
          <label htmlFor="cod">Cash On Delivery</label>          
         </div>

         <div className='font-light mt-9 text-justify'>
          Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our
           <span className=' font-semibold'> privacy policy.</span>
         </div>

         <div className="flex items-center py-9 justify-center">
          
           <button className='text-[20px] px-18 py-2 border rounded-2xl hover:bg-[#55f5909e]'> Place order</button>
          
         </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout