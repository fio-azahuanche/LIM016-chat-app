/* eslint-disable no-lone-blocks */
import React from 'react'

function Profile() {
    const emailUser = sessionStorage.getItem('email_user')
  return (
    <section className='container mt-5'>
       <div>
           <div className='imgUser'>
               <input type="file" id="fichero" className='' />
               <label htmlFor="fichero" className="circle"><i class='bx bxs-camera-plus fs-2'></i></label>
           </div>
           <div className='mt-5 d-flex flex-column justify-content-center'>
               <input type="text" className='form-control w-75 mx-auto mb-3' placeholder='Nombre'/>
                <input type="text" className='form-control w-75 mx-auto' value={emailUser} disabled/>
           </div>
           
       </div>
    </section>
  )
}

export default Profile

{/* <nav class="navbar navbar-expand-lg navbar-light bg-pink">
            <div class="container-fluid">
                <a class="navbar-brand" href=""><i class='bx bx-left-arrow-circle text-white fs-3'></i></a>
                <form class="d-flex align-items-center justify-content-end">
                    <input class="form-control w-75" type="search" placeholder="Search" aria-label="Search"/>
                    <a href=""><i class='bx bx-search text-white fs-3'></i></a>
                </form>
            </div>
        </nav> */}