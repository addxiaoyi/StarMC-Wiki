
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  // Use gemini-3-flash-preview for fast search and grounding
  async searchWiki(query: string, wikiContext: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是一个 Wiki 助手。基于以下 Wiki 上下文信息，回答用户的问题。如果信息不足，请明确说明。\n\n上下文：\n${wikiContext}\n\n问题：${query}`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  },

  // Use gemini-3-pro-preview for deep thinking/complex tasks
  async complexReasoning(prompt: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text;
  },

  // Chat stream using gemini-3-pro-preview
  async* chatStream(message: string, history: any[] = []) {
    const ai = getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "你是 舵星归途 StarMC 服务器的 AI 助手。你熟悉服务器的规则、历史和技术规格。回答应简洁、友好、具有技术感。"
      }
    });
    
    const stream = await chat.sendMessageStream({ message });
    for await (const chunk of stream) {
      yield (chunk as GenerateContentResponse).text;
    }
  },

  // Image analysis with gemini-3-pro-preview
  async analyzeImage(prompt: string, base64Image: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } }
        ]
      }
    });
    return response.text;
  }
};
