"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { X, Trash2 } from 'lucide-react';
import { useChat } from '@/app/contexts/ChatContext';
import { callAnthropic } from '@/lib/ai/anthropic';
import { LoadingDots } from '@/components/chats/LoadingDots';

const SYSTEM_PROMPT = `You are a helpful assistant focused on sustainability topics. If a question or request is not related to sustainability, environment, or related areas, respond with: "Please ask questions about sustainability." Otherwise, provide a helpful and informative answer related to the sustainability aspect of the question. Please make the answer as short as possible`;

export const ChatInterface: React.FC = () => {
  const { isChatOpen, closeChat, messages, addMessage, clearChat } = useChat();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await callAnthropic(input, SYSTEM_PROMPT);
      addMessage({ role: 'assistant', content: response });
    } catch (error) {
      console.error('Error calling Anthropic API:', error);
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-1/3 h-2/5 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sustena.AI Assistant</CardTitle>
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={clearChat} title="Clear Chat">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={closeChat} title="Close Chat">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto text-sm">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${message.role === 'user' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
              {message.content}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-2">
            <span className="inline-block p-2 rounded bg-gray-200">
              <LoadingDots />
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about sustainability..."
            className="flex-grow mr-2"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};