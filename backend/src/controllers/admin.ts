import { Request, Response } from 'express';
import Scenario from '../models/Scenario';

export const getScenarios = async (req: Request, res: Response) => {
  try {
    const scenarios = await Scenario.find();
    res.json(scenarios);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};