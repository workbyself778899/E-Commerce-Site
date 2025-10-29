import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#FFFFFF]  '>
        <div className="flex justify-between mx-3 max-w-[]1440px] border-b border-[#D9D9D9] py-8">
            <div className="text-zinc-400 text-[16px] flex items-center">
                400 University Drive Suite 200 Coral <br /> 
                Gables, <br />
                FL 33134 USA
            </div>

            <div className="flex flex-col gap-5">
               <div className="text-zinc-400 text-[16px]">Links</div> 
                <ul className='flex flex-col gap-5'>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div className="flex flex-col gap-5">
               <div className="text-zinc-400 text-[16px]"> Help</div>
                <ul className='flex flex-col gap-5 '>
                    <li>Payment Option</li>
                    <li>Returns</li>
                    <li>Privacy Policies</li>
                </ul>
            </div>


            <div className="flex flex-col gap-5">
                <div className="text-zinc-400 text-[16px]"> Newsletter</div>
                <div className='flex gap-4'>
                    <input type="text" placeholder='Enter Your Email Address' className='border-b' />
                    <button className='border-b'>SUBSCRIBE</button>
                </div>
            </div>
        </div>
      
        <div className='mx-3 py-3'>
            2022 Meubel House. All rights reverved
        </div>
    </div>
  )
}

export default Footer