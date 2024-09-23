'use server'

import { Anthropic } from '@anthropic-ai/sdk';
import { getLocations, getProductsAndServices, getCompanyDetails} from "@/lib/company/data";


const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function callAnthropic(input: string, systemPrompt: string) {
  const companyDetails = await getCompanyDetails();
  const companyLocations = await getLocations();
  const servicesAndProducts = await getProductsAndServices();

let newSysPrompt = "You are a helpful assistant focused on sustainability topics. If a question or request is not related to sustainability, environment, or related areas, respond with: 'Please ask questions about sustainability.' If the questions are about the company which you can see with the attached company . Otherwise, provide a helpful and informative answer related to the sustainability aspect of the question. Please make the answer as short as possible. Some context: ";
newSysPrompt = newSysPrompt+JSON.stringify(companyDetails)+JSON.stringify(companyLocations)+JSON.stringify(servicesAndProducts);
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: input,
        },
      ],
      system: newSysPrompt,
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    throw error;
  }
}