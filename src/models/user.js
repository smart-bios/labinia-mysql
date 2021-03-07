import { DataTypes, Model} from 'sequelize'
import  db  from '../database'


class User extends Model {}
    
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING
    },

    role: {
        type: DataTypes.ENUM('ADMIN', 'USER'),
        defaultValue: 'USER'
    },

    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
},{
    sequelize: db,
    modelName: 'user'
})

export default User