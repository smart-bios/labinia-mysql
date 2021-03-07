import os from 'os'
import path from 'path'
import fs from 'fs'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import User from '../models/user';

const home = os.homedir()

export default {

    add: async( req, res ) => {
        try {
            let { username,  email,  password } = req.body
    
            const emailExist = await User.findOne({where: {email}});
    
            if(emailExist){
                return res.status(400).json({
                    status: 'warning',
                    msg: `El email ya esta registrado: ${email}`
                })
            }
            
            password = await bcrypt.hash(password, 10);
            
            const user = await User.create({username, email, password})
            fs.mkdir(path.join(home, `/storage/${user.id}/tmp`), { recursive: true }, (err) => { 
                if (err) throw err;

                fs.mkdir(path.join(home, `/storage/${user.id}/results`), { recursive: true }, (err) => {
                    if (err) throw err;

                    res.json({
                        status: 'success',
                        msg: `User ${user.username} has been created`
                    })                
                });                                   
            });        
    
            
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
            const users = await User.findAll({
                attributes: ["id",'username', 'email']
            });
    
            res.json({
                status: 'success',
                msg: 'List users',
                result: users
            });
    
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
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: ["id",'username', 'email']
            })
    
            if(user){
                res.json({
                    status: 'success',
                    msg: 'search user',
                    result: user
                })
            }else{
                res.json({
                    status: 'warning',
                    msg: 'search user',
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

    edit: async( req, res ) => {
        try {
            const { id } = req.params;
            const { body } = req;
    
            const user = await User.findByPk(id);
    
            if(!user){
                return res.status(400).json({
                    status: 'warning',
                    msg: `No existe el registro para actualizar`
                })
            }
    
            await User.update( body, {where: {id}} );
    
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
    },

    delete: async( req, res ) => {
        try {
            const { id } = req.params;
    
            const user = await User.findByPk(id);
    
            if(!user){
                return res.status(400).json({
                    status: 'warning',
                    msg: `No existe el registro para Eliminar`
                })
            }
    
            await User.update( {status:false}, {where: {id}} );
    
            res.json({
                status: 'success',
                msg: 'delete user',
                result: `data id ${id} deleted`
            })
    
        } catch (error) {
            res.status(500).json({
                status: 'error',
                msg: 'No se a podido registrar el usuario',
                result: error
            });
        }
    },

    login: async(req, res) => {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            
            if(user){
                let match = await bcrypt.compare(req.body.password, user.password)
                
                if(match){
                    let payload = {
                        id : user.id,
                        username : user.username,
                        email : user.email
                    }
                    //Generando token
                    const token = jwt.sign(payload, process.env.SECRET_KEY,{
                        expiresIn: 60 * 60 * 24  // expires in 24 hours
                    })

                    //let tokenReturn = encode(payload)
                    res.status(200).json({
                        status: 'success',
                        msg: `Welcome ${user.username}`,
                        token                         
                    });
                }else{
                    res.status(404).json({
                        status: 'failed',
                        msg: "Username or password is incorrect"
                    });
                }
            }else{
                res.status(404).json({
                    status: 'failed',
                    msg: "Username or password is incorrect"
                });           
            }
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                msg: 'Unable to Sign In',
                error
            })
        }
    }
}