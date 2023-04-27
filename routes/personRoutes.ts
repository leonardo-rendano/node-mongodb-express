import { Request, Response } from "express"
const router = require("express").Router()
const Person = require("../models/Person")

router.post("/", async (request: Request, response: Response) => {

  const { name, salary, approved } = request.body

  if (!name) {
    return response.status(422).json({ error: "O campo nome é obrigatório" })
  }

  if (!salary) {
    return response.status(422).json({ error: "O campo salário é obrigatório" })
  }

  if (!approved) {
    return response.status(422).json({ error: "O campo aprovação é obrigatório" })
  }

  const person = {
    name,
    salary,
    approved
  }

  try {

    await Person.create(person)
    return response.status(201).json({ message: "Pessoa inserida no sistema com sucesso!" })

  } catch (error) {
    return response.status(500).json({ error: error })
  }
})

router.get("/", async (request: Request, response: Response) => {

  try {
    const people = await Person.find()
    return response.status(200).json(people)

  } catch (error) {
    return response.status(500).json({ error: error })
  }

})

router.get("/:id", async (request: Request, response: Response) => {

  const id = request.params.id

  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      return response.status(422).json({ message: "Usuário não encontrado" })
    }

    return response.status(200).json(person)

  } catch (error) { 
    response.status(500).json({ error: error })
  }

})

router.patch("/:id", async (request: Request, response: Response) => {

  const id = request.params.id

  const { name, salary, approved } = request.body

  const person = {
    name,
    salary, 
    approved
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)

    if (updatedPerson.matchedCount === 0) {
      response.status(422).json({ message: "O usuário não foi encontrado" })
      return 
    }

    return response.status(200).json(person)

  } catch (error) {
    response.status(500).json({ error: error })
  }
})

router.delete("/:id", async (request: Request, response: Response) => {

  const id = request.params.id

  const person = await Person.findOne({ _id: id })
  
  if (!person) {
    response.status(422).json({ message: "Usuário não encontrado" })
    return 
  }

  try {
    await Person.deleteOne({ _id: id })
    response.status(200).json({ message: "Usuário excluído com sucesso!" })

  } catch (error) {
    response.status(500).json({ error: error })
  }

})

module.exports = router