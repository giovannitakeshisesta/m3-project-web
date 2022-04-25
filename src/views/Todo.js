import React from 'react';

const Todo = () => {
    return (
        <div>
            <div className=''>
                <div className='fccc'>
                    <h1>Tables </h1>
                    <p>aqui pondrè botones o plantillas de salas</p>
                    <h5>click en la mesa</h5>
                </div>
                <div className='row'>
                    <div className='col'>
                        <ul>
                            <li><b>si la mesa esta libre:</b></li>
                            <ul>
                            <li>introducir Num mesa y comensales</li>
                            </ul>
                        
                            <li>se abre el menu
                                <ul>
                                    <li>filtro alergenos</li>
                                </ul>
                            </li>
                            <li>se toma la comanda, x cada plato
                                <ul>
                                    <li>descripcion producto</li>
                                    <li>precio</li>
                                    <li>remanencia stock.....</li>
                                    <li>boton añade mensaje</li>
                                    <li>boton urgent!</li>
                                    <li>orden de salida</li>
                                </ul>
                            </li>
                            <li>se envia la comanda a la API</li>
                            
                        </ul>
                    </div>
                    <div className='col'>
                        <ul>
                            <li><b>si la mesa esta abierta:</b></li>
                            <li>se abre la comanda</li>
                            <li><b>Boton</b>
                                <ul>
                                    <li>marchar segundos : a barra o cocina</li>
                                    <li>añadir platos</li>  
                                </ul>
                            </li>
                            <li><b> cuenta :</b>
                                <ul>
                                    <li>cuenta/Npersonas</li>
                                    <li>cuenta x separado....</li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>

                <div>
                <hr />
                    <p>Cocina o barra reciben comanda desde la API... como?</p>
                    <p>La mueven como quieren</p>
                    <p>pueden tachar lo que ya ha salido</p>
                    <p>pueden recibir un mensaje de marchar segundos</p>
                    <p>pueden avisar que esta saliendo una comanda</p>
                </div>
                <div>
                <hr />
                    <p>extras:</p>
                    <p>chat</p>
                    <p>forma de pago , con qr acceden a la cuenta de su mesa</p>
                    <p>menu y web page qr mesa</p>
                    <p>venta online de eventos , catas etc</p>
                </div>
            </div>

        </div>
    );
}

export default Todo;
