import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import SecondHeader from '../component/Header/SecondHeader';
const Contact = () => {  
  return (
    <div className='pb-20'>
        
         <SecondHeader text="Contact"></SecondHeader>

          <div className='my-25'>
            <h1 className="font-semibold text-[36px] text-center">
                Get In Touch With Us
            </h1>
            <p className="text-[#9F9F9F] text-center">For More Information About Our Product & Services. Please Feel Free To Drop Us <br /> An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
          </div>

                {/* New Block  */}

          <div className="flex justify-around">
          
          <div className="flex flex-col">
              {/* location  */}
            <div className="my-5">
                <div className="flex gap-6">
                    {/* icon  */}
                    <div className="flex">
                        <FaLocationDot size={29}/>
                    </div>
                    <div> 
                        <span className="text-[24px]  font-medium">
                             Address    
                        </span> 
                        <p>
                            236 5th SE Avenue, New <br /> York NY10000, United <br /> States
                        </p>
                    </div>
                </div>
            </div>

            {/* contact  */}
            <div className="my-5">
                <div className="flex gap-6">
                    {/* icon  */}
                    <div className="flex">
                        <FaPhone size={29}/>
                    </div>
                    <div> 
                        <span className="text-[24px]  font-medium">
                             Phone    
                        </span> 
                        <p>
                            Mobile: +(84) 546-6789 <br />
                            Hotline: +(84 456-6789)
                        </p>
                    </div>
                </div>
            </div>

            {/* time  */}
            <div className="my-5">
                <div className="flex gap-6">
                    {/* icon  */}
                    <div className="flex">
                        <MdAccessTimeFilled size={29}/>
                    </div>
                    <div> 
                        <span className="text-[24px]  font-medium">
                             Working Time  
                        </span> 
                        <p>
                           Monday-Friday: 9:00 - 22:00 <br />
                           Saturday-Sunday: 9:00 - 21:00
                        </p>
                    </div>
                </div>
            </div>
          </div>

            {/* form  */}

           <div className="">
            <form>
                <label htmlFor="name" className='font-medium my-3 block' >Your name</label>
                <input type="text" name='name' className='border w-[528.75px] rounded-lg px-3 py-4 mb-5'placeholder='Abc' />

                <label htmlFor="email" className='font-medium my-3 block' >Email address</label>
                <input type="email" name='email' className='border w-[528.75px] rounded-lg px-3 mb-5 py-4'placeholder='Abc@def.com' />

                <label htmlFor="subject" className='font-medium my-3 block' >Subject</label>
                <input type="text" name='subject' className='border w-[528.75px] rounded-lg px-3 mb-5 py-4'placeholder='This is an optional' />

                <label htmlFor="message" className='font-medium my-3 block' >Message</label>
                <textarea name="message" className='border text-start h-[120px] w-[528.75px] rounded-lg p-3  mb-14 'placeholder='This is an optional' ></textarea>
               
                <input type="submit" className='px-22 py-3 block border rounded-2xl '  />
            </form>
           </div>
            
          </div>
    </div>
  )
}

export default Contact