import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grade = db.gradesModel;

const create = async (req, res) => {
    const grade = new Grade({
      name: req.body.name,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
      lastModified: Date.now(),
    });
    try {
      const data = await grade.save();
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
    console.log(error);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
    console.log(condition);
  try {
    const data = await Grade.find(condition)
    logger.info(`GET /grade`);
    res.send(data)
  } catch (error) {
    res
    .status(500)
    .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  
  try {
    const data = await Grade.findById({_id: id})
    logger.info(`GET /grade - ${id}`);
    res.send(data)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  
  const id = req.params.id;
  
  try {
    const data = await Grade.findOneAndUpdate({_id: id}, req.body, {new: true})
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    res.send(data)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  
  try {
    const data = await Grade.findOneAndRemove({_id: id})
    logger.info(`DELETE /grade - ${id}`);
    res.send("deleted")
  } catch (error) {
    res
    .status(500)
    .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await Grade.deleteMany({})
    res.send("All is deleted")
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
