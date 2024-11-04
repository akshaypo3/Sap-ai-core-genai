'use server'

import { Anthropic } from '@anthropic-ai/sdk';
import { getLocations, getProductsAndServices, getCompanyDetails } from "@/lib/company/data";
import { createClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';
import { saveIroEntries } from '@/lib/assessments/action';
import { redirect } from 'next/navigation';
import { getIroData } from "@/lib/assessments/data";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const CHUNK_SIZE = 5;

function chunkArray(array, size) {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

export async function callAnthropic(input: string, systemPrompt: string) {
  const companyDetails = await getCompanyDetails();
  const companyLocations = await getLocations();
  const servicesAndProducts = await getProductsAndServices();

  let newSysPrompt = "You are a helpful assistant focused on sustainability topics. If a question or request is not related to sustainability, environment, or related areas, respond with: 'Please ask questions about sustainability.' If the questions are about the company which you can see with the attached company . Otherwise, provide a helpful and informative answer related to the sustainability aspect of the question. Please make the answer as short as possible. Some context: ";
  newSysPrompt = newSysPrompt + JSON.stringify(companyDetails) + JSON.stringify(companyLocations) + JSON.stringify(servicesAndProducts);
  console.log(newSysPrompt)

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

export async function performAIAssessment(iroId: string) {
  try {
    const iroData = await getIroData(iroId);

    if (!iroData || iroData.length === 0) {
      throw new Error('No IRO data found for the given ID');
    }

    const companyDetails = await getCompanyDetails();
    const companyLocations = await getLocations();
    const servicesAndProducts = await getProductsAndServices();

    const systemPrompt = `Please provide your answer ONLY in  german, but keep the headlines of the fields in english as they are display in englisch. You are an AI assistant specializing in sustainability and materiality assessments. Use the following company context to inform your assessment:
    
    Company Details: ${JSON.stringify(companyDetails)}
    Company Locations: ${JSON.stringify(companyLocations)}
    Services and Products: ${JSON.stringify(servicesAndProducts)}
    
    Provide a detailed materiality assessment for the given item, considering the company's specific context, industry, and operations.
    At the top of your suggestion, please provide the information, if there is an impact materiality AND an financial materiality. So the user knows to duplicate the iro and do the assessment twice.`;
    
    const userPrompt = `Please provide your answer ONLY in  g Given the following IRO (Impact, Risk, Opportunity) data, provide a detailed analysis. Include the following information:

1. iro_description: A brief description of the item and its relevance to the company, considering the company's specific context.
2. materiality_type: Either 'impact' or 'financial'.
3. impact: For impact materiality, either 'positive' or 'negative'. For financial materiality, either 'chance' or 'risk'.
4. impact_state: For impact materiality, either 'actual' or 'potential'.
5. scale_score: A number from 1 to 5, where 1 is very low and 5 is very high.
6. scale_reason: A brief explanation for the scale score, considering the company's operations and industry.
7. scope_score: A number from 1 to 5, where 1 is limited and 5 is global.
8. scope_reason: A brief explanation for the scope score, considering the company's geographical presence.
9. irremediability_score: A number from 0 to 5, where 0 is easily remediated and 5 is irreversible.
10. irremediability_reason: A brief explanation for the irremediability score, considering the company's capabilities and industry standards.
11. probability_score: A number between 0 and 1, representing the likelihood of the impact occurring.
12. probability_reason: A brief explanation for the probability score, considering the company's current practices and industry trends.

Present your analysis in a structured format, using the item's esrs_id as a header.

IRO data: ${JSON.stringify(iroData[0])}`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    const aiSuggestion = response.content[0].text;

    return { success: true, message: "AI assessment completed", suggestion: aiSuggestion };
  } catch (error) {
    console.error("Error in AI assessment:", error);
    return { success: false, message: "Error performing AI assessment: " + (error as Error).message };
  }
}