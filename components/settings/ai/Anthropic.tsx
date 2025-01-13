import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCompanyDetails } from "@/lib/company/data";
import { saveCompanyDetails } from "@/lib/company/action";
import { getTranslations } from "next-intl/server";
import { Anthropic, OpenAI } from "@/lib/settings/administration/data";
import { AddGlossaryButton } from "../glossary/buttons";
import EditAnthropicButton from "./EditAntropic";
import EditOpenAIButton from "./EditOpenAI";

export default async function AnthropicData() {
  const supabase = await createClient();
  const AnthropicData = await Anthropic();
  const OpenAIData = await OpenAI();

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-2">
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
          Anthropic API
          </h3>
          <EditAnthropicButton id={AnthropicData}/>
        </div>
        <div>
          <form>
          <input
              type="hidden"
              name="id"
              placeholder={AnthropicData.id}
            />
            <Label htmlFor="API_Key">API Key</Label>
            <input
                className="flex h-9 w-1/2 rounded-md border border-input bg-gray-100 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                value={AnthropicData.API_Key}
                readOnly
              />
			<Label htmlFor="Model">Model</Label>
             <input
                className="flex h-9 w-1/2 rounded-md border border-input bg-gray-100 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                value={AnthropicData.Model}
                readOnly
              />
			<Label htmlFor="Token_Limit_per_Month">Token Limit per Month</Label>
            <input
                className="flex h-9 w-1/2 rounded-md border border-input bg-gray-100 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                value={AnthropicData.Token_Limit_per_Month}
                readOnly
              />
          </form>
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3">
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
          OpenAI
          </h3>
          <EditOpenAIButton id={OpenAIData} />
        </div>
        <div>
          <form>
          <input
              type="hidden"
              name="id"
              placeholder={OpenAIData.id}
            />
            <Label htmlFor="API_Key">API Key</Label>
            <input
                className="flex h-9 w-1/2 rounded-md border border-input bg-gray-100 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                value={OpenAIData.API_Key}
                readOnly
              />
			<Label htmlFor="Token_Limit_per_Month">Token Limit per Month</Label>
            <input
                className="flex h-9 w-1/2 rounded-md border border-input bg-gray-100 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                value={OpenAIData.Token_Limit_per_Month}
                readOnly
              />
          </form>
        </div>
      </div>
    </>
  );
}
