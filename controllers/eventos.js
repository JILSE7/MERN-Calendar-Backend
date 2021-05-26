const {response} = require('express');
const Evento = require('../models/Evento')

const getEventos = async(req, res = response) =>{

    try {
        //Traemos todos los eventos
        const eventos = await Evento.find()
                                    .populate('user', 'name email');
        
        res.status(200).json({
            ok:true,
            eventos
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Upps servidor ocupado, intentalo nuevamente"
        })     
    }
}

// const getEventoById = async(req, res = response) =>{
//     //Traemos todos los eventos
//     const eventos = await Evento.find()
//                                 .populate('user', 'name email');
    
//     res.status(200).json({
//         ok:true,
//         eventos
//     })
// }


const addEvento = async(req, res = response) =>{

    const evento = new Evento(req.body);
    
    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save()
            
        res.status(201).json({
            ok:true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const updateEvento = async(req, res = response) =>{
    
    const eventoId = req.params.id
    const uid = req.uid;
    try {
        let evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: "El evento no esta registrado en la base de datos"
            })
        }
        
        if(evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg: "No tiene los permisos para editar este evento"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new: true});

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Acerquese a administracion"
        })
    }
}


const deleteEvento = async(req, res = response) =>{
    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: "El evento no esta registrado en la base de datos"
            })
        }

        if(evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg: "No tiene los permisos para eliminar este evento"
            })
        }

        await Evento.findByIdAndDelete(eventoId, {useFindAndModify: false});

        res.json({
            ok:true,
            msg: `El evento ${evento.title} ha sido eliminado con exito`
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:true,
            msg: `Comuniquese con la administracion`
        })
    }
}


module.exports = {
    getEventos,
    addEvento,
    updateEvento,
    deleteEvento
}