"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { callAnthropic } from '@/lib/ai/anthropic';
import { useTranslations } from 'next-intl';

export default function AnthropicApiDemo() {
  const t = useTranslations('settings-com');
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await callAnthropic(input, systemPrompt);
      setResponse(result);
    } catch (error) {
      setResponse('Error: ' + (error instanceof Error ? error.message : String(error)));
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Anthropic API Demo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>System Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter system prompt here..."
              className="w-full"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your message here..."
              className="w-full"
            />
          </CardContent>
        </Card>
        <Button type="submit" disabled={loading}>
          {loading ? t('Sending') : t('Send')}
        </Button>
      </form>
      {response && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{response}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}