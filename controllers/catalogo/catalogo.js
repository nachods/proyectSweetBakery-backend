const Catalogo = require("../../models/catalogo");
const image = require("../../utils/image");
const fs = require('fs');
const path = require('path');

async function createCatalogo(req, res) { // post
  const { nombre, detalle, categoria } = req.body;

  if (!nombre || !detalle || !categoria) {
    res.status(400).send({ msg: "Datos insuficientes" });
    return;
  }

  let imagePath = null;
  if (req.files && req.files.image) {
    imagePath = image.getFileName(req.files.image);
  }

  const catalogo = new Catalogo({
    nombre,
    detalle,
    categoria,
    image: imagePath,
    estado: true,
  });

  try {
    await catalogo.save();
    res.status(200).send({ msg: "Catálogo creado y guardado con éxito" });
  } catch (error) {
    res.status(400).send({ msg: `Error al crear el catálogo: ${error.message}` });
  }
}

async function updateCatalogo(req, res) { // patch
  const { nombre } = req.params; // Nombre actual del catálogo
  const { detalle, categoria, nuevoNombre } = req.body; // nuevoNombre es el nombre que queremos actualizar

  try {
    // Encuentra el catálogo por su nombre actual
    const catalogo = await Catalogo.findOne({ nombre });

    if (!catalogo) {
      return res.status(404).send({ msg: "Catálogo no encontrado" });
    }

    let imagePath = catalogo.image; // Mantén la imagen existente por defecto

    // Verifica si hay una nueva imagen en la solicitud
    if (req.files && req.files.image) {
      imagePath = image.getFileName(req.files.image);

      // Si se subió una nueva imagen, elimina la anterior
      if (catalogo.image) {
        const oldImagePath = path.join(__dirname, "../../uploads", catalogo.image);

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    // Actualiza los campos con los nuevos valores, incluido el nombre
    catalogo.nombre = nuevoNombre || catalogo.nombre; // Actualiza el nombre si se proporciona uno nuevo
    catalogo.detalle = detalle || catalogo.detalle;
    catalogo.categoria = categoria || catalogo.categoria;
    catalogo.image = imagePath;

    // Guarda el catálogo actualizado
    await catalogo.save();

    res.status(200).send({ msg: "Catálogo actualizado con éxito", catalogo });
  } catch (error) {
    res.status(400).send({ msg: `Error al actualizar el catálogo: ${error.message}` });
  }
}

async function deleteCatalogo(req, res) { // delete
  const { nombre } = req.params;

  try {
    const catalogo = await Catalogo.findOneAndDelete({ nombre });

    if (!catalogo) {
      return res.status(404).send({ msg: "Catálogo no encontrado" });
    }

    if (catalogo.image) {
      const imagePath = path.join(__dirname, "../../uploads", catalogo.image);
      console.log('Image Path:', imagePath);

      if (fs.existsSync(imagePath)) {
        console.log('File exists, proceeding to delete...');
        fs.unlinkSync(imagePath);
        console.log('File deleted successfully');
      } else {
        console.log('File does not exist:', imagePath);
      }
    }

    res.status(200).send({ msg: "Catálogo eliminado con éxito" });
  } catch (error) {
    res.status(400).send({ msg: `Error al eliminar el catálogo: ${error.message}` });
  }
}

async function getCatalogo(req, res) { // get
  try {
    const catalogos = await Catalogo.find();

    if (!catalogos || catalogos.length === 0) {
      return res.status(404).send({ msg: "No se encontraron catálogos" });
    }
    res.status(200).send(catalogos);
  } catch (error) {
    res.status(400).send({ msg: `Error al enviar los catálogos: ${error.message}` });
  }
}

module.exports = {
  createCatalogo,
  updateCatalogo,
  deleteCatalogo,
  getCatalogo,
};
