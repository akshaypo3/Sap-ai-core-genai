from fastapi import FastAPI, Request
from pydantic import BaseModel
from prompt_handler import build_prompt
import uvicorn

app = FastAPI()

class Prompt(BaseModel):
    prompt: str

@app.post("/generate")
async def generate(prompt: Prompt):
    user_input = prompt.prompt
    response = build_prompt(user_input)
    return {"response": response}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)