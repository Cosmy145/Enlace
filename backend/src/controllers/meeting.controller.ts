import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

const createMeeting = (req: Request, res: Response) => {
  res.json({ meetingId: uuidv4() });
};

export default createMeeting;
