import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { subjectRepository } from "../repositories/subjectRepository";
import { BadRequestError, NotFoundError } from "../helpers/errosHelpers";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    if (!name) {
      throw new BadRequestError("Name is required");
    }

    const newRoom = roomRepository.create({ name, description });
    await roomRepository.save(newRoom);

    return res.status(201).json({ message: "Room created" });
  }

  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;

    if (!title || !url || !idRoom) {
      throw new BadRequestError("Title, url and room_id is required");
    }

    const room = await roomRepository.findOneBy({ id: Number(idRoom) });

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    const newVideo = videoRepository.create({ title, url, room: room });

    await videoRepository.save(newVideo);

    return res.status(201).json({ message: "Video created" });
  }

  async addSubject(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { idRoom } = req.params;

    if (!subject_id || !idRoom) {
      throw new BadRequestError("Subject_id and room_id is required");
    }

    const room = await roomRepository.findOneBy({ id: Number(idRoom) });

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    const subject = await subjectRepository.findOneBy({
      id: Number(subject_id),
    });

    if (!subject) {
      throw new NotFoundError("Room not found");
    }

    const roomUpdate = {
      ...room,
      subjects: [subject],
    };

    await roomRepository.save(roomUpdate);

    return res.status(204).send();
  }

  async listRoom(req: Request, res: Response) {
    const rooms = await roomRepository.find({
      relations: {
        subjects: true,
        videos: true,
      },
    });

    return res.status(200).json(rooms);
  }
}
