import  { Op } from 'sequelize'
import Specie from '../models/specie';


export default {

    add: async( req, res ) => {
        try {
            let { scientific_name } = req.body
    
            const specieExist = await Specie.findOne({where: {scientific_name}});
    
            if(specieExist){
                return res.status(400).json({
                    status: 'warning',
                    msg: `La especie ${scientific_name} ya esta registrada`
                })
            }
            
            const specie = await Specie.create(req.body)        
    
            res.json({
                status: 'success',
                msg: 'add user',
                result: specie
            })
    
            
        } catch (error) {
            res.status(500).json({
                status: 'error',
                msg: 'No se a podido registrar el usuario',
                result: error
            });
        }

    },

    list: async( req, res ) => {
        try {
            const species = await Specie.findAll();
    
            res.json({
                status: 'success',
                msg: 'List species',
                result: species
            });
    
        } catch (error) {
    
            res.status(500).json({
                status: 'error',
                msg: 'No se a podido registrar el usuario',
                result: error
            });
        }
    },

    findById: async( req, res ) => {
        try {
            const { id } = req.params;
            const specie = await Specie.findByPk(id)
    
            if(specie){
                res.json({
                    status: 'success',
                    msg: 'search specie',
                    result: specie
                })
            }else{
                res.json({
                    status: 'warning',
                    msg: 'search',
                    result: 'No se encontraron resultados'
                })
            }
            
        } catch (error) {
            res.status(500).json({
                status: 'error',
                msg: 'No se a podido registrar el usuario',
                result: error
            });
        }
    },

    find: async( req, res ) => {
        try {
            const { text } = req.params;
            const specie = await Specie.findAll({
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${text}%`
                            }
                        },
                        {
                            scientific_name: {
                                [Op.like]: `%${text}%`
                            }
                        }
                    ]
                }
            })
    
            if(specie){
                res.json({
                    status: 'success',
                    msg: 'Busqueda exitosa',
                    result: specie
                })

            }else{
                res.json({
                    status: 'warning',
                    msg: 'No se escontraron resultados',
                })
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                msg: 'ERROR SERVDIOR',
                result: error
            })
        }

    },

    edit: async( req, res ) => {
        try {
            const { id } = req.params;
            const { body } = req;
    
            const specie = await Specie.findByPk(id);
    
            if(!specie){
                return res.status(400).json({
                    status: 'warning',
                    msg: `No existe el registro para actualizar`
                })
            }
    
            await Specie.update( body, {where: {id}} );
    
            res.json({
                status: 'success',
                msg: 'update user',
                result: `data id ${id} updated`
            })
    
        } catch (error) {
            res.status(500).json({
                status: 'error',
                msg: 'No se a podido registrar el usuario',
                result: error
            });
        }

    }
}