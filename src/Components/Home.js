import React from 'react';
import BusFindIMG from './Captura de tela 2021-10-30 145202.png';
import {Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import Usuarios from './Usuarios';


class Home extends React.Component{
    
    render(){
    return (
        <div>
            <div  id='imagemBus'>
                <img src={BusFindIMG} alt='BusFinder Imagem' width='500px'/> 
            </div>
            <div className='sobre'>
                <p>BusFinder é um sistema de localização de ônibus circulares. Aqui você pode acompanhar o percurso de ônibus em
                    suas rotas favoritas e ficar sempre adiantado para não perder a hora de embarque no seu ponto mais próximo. </p>
                    
            </div>
            <div className='info'>
                Cadastre-se ou faça login para começar a buscar.
            </div>
            <div className='btn-comecar'>
                <a className='comecar-btn' href='/usuarios'>COMEÇAR</a>
            </div>  
            
        </div>
        
    )
    }
}

export default Home;