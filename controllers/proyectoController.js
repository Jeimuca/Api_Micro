const Proyecto = require('../modelos/proyecto');
const { request, response } = require('express');
const TipoProyectoModel = require('../modelos/TipoProyecto');
const ClienteModel = require('../modelos/cliente');
const UniversidadModel = require('../modelos/universidad');
const EtapaModel = require('../modelos/etapa');

const listarProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find();
        return res.json(proyectos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const crearProyecto = async (req = request, res = response) => {
    try {
        const data = req.body;

        // Validar que los campos necesarios están presentes en req.body
        const { TipoProyecto, cliente, Etapa, Universidad } = data;
        if (!TipoProyecto || !TipoProyecto._id || !cliente || !cliente._id || !Etapa || !Etapa._id || !Universidad || !Universidad._id) {
            return res.status(400).json({ msg: 'Datos de entrada incompletos' });
        }

        // Verificar existencia de TipoProyecto
        const tipoProyectoDB = await TipoProyectoModel.findOne({ _id: TipoProyecto._id });
        if (!tipoProyectoDB) {
            return res.status(400).json({ msg: 'Tipo de proyecto inválido' });
        }

        // Verificar existencia de Cliente
        const clienteDB = await ClienteModel.findOne({ _id: cliente._id });
        if (!clienteDB) {
            return res.status(400).json({ msg: 'Cliente inválido' });
        }

        // Verificar existencia de Etapa
        const etapaDB = await EtapaModel.findOne({ _id: Etapa._id });
        if (!etapaDB) {
            return res.status(400).json({ msg: 'Etapa inválida' });
        }

        // Verificar existencia de Universidad
        const universidadDB = await UniversidadModel.findOne({ _id: Universidad._id });
        if (!universidadDB) {
            return res.status(400).json({ msg: 'Universidad inválida' });
        }

        // Crear y guardar el proyecto
        const proyecto = new Proyecto(data);
        await proyecto.save();

        return res.status(201).json(proyecto);

    } catch (e) {
        return res.status(500).json({ msg: 'Error general ' + e });
    }
}

const editarProyecto = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const proyectoActualizado = await Proyecto.findByIdAndUpdate(id, req.body, { new: true });
        if (!proyectoActualizado) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        return res.status(200).json(proyectoActualizado);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    listarProyectos,
    crearProyecto,
    editarProyecto
}


