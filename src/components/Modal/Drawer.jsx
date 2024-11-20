import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'


const Drawer = ({isDrawerOpen, setIsDrawerOpen}) => {
  return (
    <>
      <div className={`modal h-[100vh] overflow-y-auto shadow-card fixed bg-white !z-9999 top-0 right-[-999px] w-full max-w-[400px] transition-all ease-in-out duration-500 flex justify-center flex-col text-textBold text-center ${isDrawerOpen ? `!right-0 transition-all ease-in-out duration-500` : ``}`}>
                    <FaTimes className='close-button absolute top-0 right-0 mt-4 mr-4 cursor-pointer' onClick={() => setIsDrawerOpen(false)} />
                    <div className='modal__content flex items-center flex-col justify-center text-center w-full'>
                        <h2>
                            History
                        </h2>
                     
                        <div className='shopping__link' >
                            {/* <img src={`/assets/icon/shop-icon.png`} alt="c35043" className='shopping__icon' /> */}
                        </div>

                    </div>
                </div>
                <div className={`backdrop fixed top-0 left-0 w-full h-full bg-black/30 !z-999 hidden opacity-0 transition-all ease-out duration-200 ${isDrawerOpen ? `transition-all ease-out duration-200 !block !opacity-100` : ``}`} onClick={() => setIsDrawerOpen(false)}></div>
    </>
  )
}

export default Drawer
