import { Request, Response } from "express";
import { subjectRepository } from "../repositories/subjectRepository";
import { BadRequestError } from "../helpers/errosHelpers";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      throw new BadRequestError("Name is required");
    }

    const newSubject = subjectRepository.create({ name });

    await subjectRepository.save(newSubject);

    return res.status(201).json({ message: "Subject created" });
  }
}
