import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { subjectRepository } from "../repositories/subjectRepository";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    try {
      const newRoom = roomRepository.create({ name, description });
      await roomRepository.save(newRoom);

      return res.status(201).json({ message: "Room created" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;

    if (!title || !url || !idRoom) {
      return res
        .status(400)
        .json({ message: "Title, url and room_id is required" });
    }

    try {
      const room = await roomRepository.findOneBy({ id: Number(idRoom) });

      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }

      const newVideo = videoRepository.create({ title, url, room: room });

      await videoRepository.save(newVideo);

      return res.status(201).json({ message: "Video created" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async addSubject(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { idRoom } = req.params;

    if (!subject_id || !idRoom) {
      return res
        .status(400)
        .json({ message: "Subject_id and room_id is required" });
    }

    try {
      const room = await roomRepository.findOneBy({ id: Number(idRoom) });

      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }

      const subject = await subjectRepository.findOneBy({
        id: Number(subject_id),
      });

      if (!subject) {
        return res.status(404).json({ message: "Room not found" });
      }

      const roomUpdate = {
        ...room,
        subjects: [subject],
      };

      await roomRepository.save(roomUpdate);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async listRoom(req: Request, res: Response) {
    try {
      const rooms = await roomRepository.find({
        relations: {
          subjects: true,
          videos: true,
        },
      });

      return res.status(200).json(rooms);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
