/* eslint-disable no-lone-blocks */
import axios from 'axios';
import React, { useState } from 'react'
import { subirFileStorage } from '../firebase/firebaseStorage';

function Profile() {
    const img = sessionStorage.getItem('img_profile');
    const name_user = sessionStorage.getItem('name_user');
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

    const updateNameUser = () => {
        console.log('cambio nombre');
    }
  return (
    <section className='container mt-5'>
       <div>
           <div className='imgUser'>
               <img src={imgProfile} alt='' className='img-profile'/>
               <input type="file" id="fichero"  onChange={updateURLfoto}/>
               <label htmlFor="fichero" className="circle"><i className='bx bxs-camera-plus fs-2'></i></label>
           </div>
           <div className='mt-5 d-flex flex-column justify-content-center'>
               <p className='mx-auto'>{name_user}</p>
               <div className='d-flex  mx-auto w-75'>
                   <input type="text" className='form-control w-75 mb-3' placeholder='Nombre'/>
                   <button className='w-25' onClick={updateNameUser}>Actualizar</button>
               </div>
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