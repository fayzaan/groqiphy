import { Request, Response } from 'express';
import { getUserState } from '../managers/userStateManager';
import { getGameStageByUserId } from '../managers/gameStageManager';

export const getHint = async (req: Request, res: Response) => {
  try {
    // use userId to fetch the userState and current gameStage to help with the prompt
    const { userId } = req.body;

    const userState = getUserState(userId);
    const gameStage = getGameStageByUserId(userId);

    if (!gameStage) {
      throw new Error('Game stage not found');
    }

    if (!userState) {
      throw new Error('User state not found');
    }

    const { currentStage: { title, description, timer } } = gameStage;
    const { history } = userState;

    const prompt = `
      You are a cybersecurity compliance trainer.
      The simulation is in the stage "${title}" with the following description:
      "${description}"
      The timer is at ${timer} seconds remaining.
      User history: ${history.join(', ') || 'none'}.
      Provide a concise, context-aware hint to help the user mitigate the threat.
    `;

    // Call the OpenAI API using fetch.
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100
      })
    });

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI API error: ${openAIResponse.statusText}`);
    }

    const data = await openAIResponse.json();
    const hint = data.choices[0].message.content.trim();
    res.json({ hint });
  } catch (error) {
    console.error('Error generating hint:', error);
    res.status(500).json({ error: 'Failed to generate hint' });
  }
};