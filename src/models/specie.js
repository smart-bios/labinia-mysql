import { DataTypes, Model} from 'sequelize'
import  db  from '../database'

class Specie extends Model {}
    
Specie.init({
    id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true
    },    
    name: {
        type: DataTypes.STRING
    },

    scientific_name: {
        type: DataTypes.STRING
    },

    short_name: {
        type: DataTypes.STRING
    },

    alias: {
        type: DataTypes.STRING
    },

    kingdom: {
        type: DataTypes.ENUM,
        values: ["Bacteria", "Fungi", "Plantae", "Virus", "Animalia"],
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    img: {
        type: DataTypes.STRING
    },

    status: {
        type: Boolean,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize: db,
    modelName: 'specie'
})

export default Specie