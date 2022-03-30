/* eslint-disable no-lone-blocks */
import axios from 'axios';
import React, { useState } from 'react'
import { subirFileStorage } from '../firebase/firebaseStorage';

function Profile() {
    const img = sessionStorage.getItem('img_profile');
    const [imgProfile, setImgProfile]=useState(img)

    const emailUser = sessionStorage.getItem('email_user'); 
    const idUser = sessionStorage.getItem('id_user');
    const url=`http://localhost:3002/user_profile/${idUser}`
    const updateURLfoto =async (e)=>{
        const archivoLocal=e.target.files[0];
        if(archivoLocal!==undefined){
            console.log(archivoLocal);
        const urlImagen = await subirFileStorage(archivoLocal, 'imgPosts');
        sessionStorage.setItem('img_profile',urlImagen);
        setImgProfile(urlImagen)
        axios.put(url,{imgProfile:urlImagen}).then((response)=>{
            console.log('imagen actualizada');
        })
        console.log(urlImagen);
        }

    }
  return (
    <section className='container mt-5'>
       <div>
           <div className='imgUser'>
               <img src={imgProfile} alt=''/>
               <input type="file" id="fichero"  onChange={updateURLfoto}/>
               <label htmlFor="fichero" className="circle"><i className='bx bxs-camera-plus fs-2'></i></label>
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