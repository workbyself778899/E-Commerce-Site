import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import SecondHeader from '../component/Header/SecondHeader';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const Contact = () => {   
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit=async(data)=>{
    console.log(data)
    try {
        const res = await axios.post('https://e-commerce-site-5h4d.vercel.app/contact/send', data)
    console.log(res)
    if(res.status==200){
        toast.success(res.data.message)
        reset()
    }
    } catch (error) {
        console.log(error)
        toast.error(error.message);
    }
  }
  return (
    <div className='pb-20'>
            <ToastContainer/>
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
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="name" className='font-medium my-3 block' >Your name</label>
                <input type="text" {...register("name",{required:"your name is required."})} name='name' className='border w-[528.75px] rounded-lg px-3 py-4 mb-5'placeholder='Abc' />
                {errors.name && (
                    <p className="text-red-500 text-sm">
                    {errors.name.message}
                </p>)}


                <label htmlFor="email" className='font-medium my-3 block' >Email address</label>

                <input type="email" {...register('email',{required:"Email is required"})} name='email' className='border w-[528.75px] rounded-lg px-3 mb-5 py-4'placeholder='Abc@def.com' />
                {errors.email && (
                    <p className="text-red-500 text-sm">
                    {errors.email.message}
                </p>)}

                <label htmlFor="subject" className='font-medium my-3 block' >Subject</label>
                <input type="text" {...register("subject",{required:"Subject is required"})} name='subject' className='border w-[528.75px] rounded-lg px-3 mb-5 py-4'placeholder='This is an optional' />
                {errors.subject && (
                    <p className="text-red-500 text-sm">
                    {errors.subject.message}
                </p>)}

                <label htmlFor="message" className='font-medium my-3 block' >Message</label>
                <textarea name="message" {...register('message')} className='border text-start h-[120px] w-[528.75px] rounded-lg p-3  mb-14 'placeholder='This is an optional' ></textarea>
                 {errors.message && (
                    <p className="text-red-500 text-sm">
                    {errors.message.message}
                </p>)}
               
               <button type='submit' disabled={isSubmitting} className='px-22 py-3 block border hover:bg-green-200 rounded-2xl '>
                    {isSubmitting?"Submitting...":"Submit"}
               </button>
               
            </form>
           </div>
            
          </div>
    </div>
  )
}

export default Contact