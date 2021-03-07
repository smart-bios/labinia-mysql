import { DataTypes, Model} from 'sequelize'
import User from  '../models/user'
import database  from '../database'


class Storage extends Model {}
    
Storage.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    filename: {
        type: DataTypes.STRING
    },
    path: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT
    },

    type: {
        type: DataTypes.ENUM,
        values: ['fastq', 'fasta', 'csv', 'other']
    },

    category: {
        type: DataTypes.ENUM,
        values: ['uploaded', 'result'],
        defaultValue: 'uploaded'
    }
},{
    sequelize: database,
    modelName: 'storage'
})

User.hasMany(Storage)
Storage.belongsTo(User)

export default Storage