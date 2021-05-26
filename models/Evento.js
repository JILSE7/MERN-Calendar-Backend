const {Schema, model} = require('mongoose');


const eventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    
    note: {type: String,},
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    }
});

//Quitamos la version del documento y remplazamod _id por id
eventoSchema.method('toJSON',function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})
module.exports = model('Evento', eventoSchema);