// import { generateText } from 'ai';
// import { vercel } from '@ai-sdk/vercel';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { messages } = req.body;

//   if (!messages) {
//     return res.status(400).json({ error: 'Messages required' });
//   }

//   // Debug: Log to confirm the API key is loaded correctly
//   console.log('Loaded Vercel API key:', process.env.VERCEL_API_KEY);

//   try {
//     // Compose the prompt from messages (simple concatenation)
//     const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n') + '\nassistant:';

//     const response = await generateText({
//       apiKey: process.env.VERCEL_API_KEY,  // <<< pass the API key explicitly
//       model: vercel('v0-1.0-md'),
//       prompt,
//       max_tokens: 200,
//       temperature: 0.7,
//     });

//     res.status(200).json({ role: 'assistant', content: response.text.trim() });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'AI API call failed' });
//   }
// }


// import OpenAI from 'openai';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { messages } = req.body;
//   if (!messages) {
//     return res.status(400).json({ error: 'Messages required' });
//   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo', // or 'gpt-4o', etc.
//       messages,
//       temperature: 0.7,
//     });
//     res.status(200).json(response.choices[0].message);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'AI API call failed' });
//   }
// }
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;
  if (!messages) return res.status(400).json({ error: 'Messages required' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    res.status(200).json({ role: 'assistant', content: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI API call failed' });
  }
}

