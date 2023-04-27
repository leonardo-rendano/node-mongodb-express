import { model, Schema } from "mongoose";

interface IPerson {
  name: string,
  salary: number,
  approved: boolean
}

const personSchema = new Schema<IPerson>({
  name: String,
  salary: Number,
  approved: Boolean
})

const Person = model<IPerson>("Person", personSchema)

module.exports = Person