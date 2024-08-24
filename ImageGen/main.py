import asyncio
import aiohttp
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class ImageRequest(BaseModel):
    prompt: str

async def generate_image(prompt: str, api_key: str):
    url = "https://api.monsterapi.ai/v1/generate/txt2img"
    payload = {
        "safe_filter": False,
        "prompt": prompt,
        "style": "enhance"
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": f"Bearer {api_key}"
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=payload, headers=headers) as response:
            response_data = await response.json()
            return response_data.get("process_id")

async def get_image_status(process_id: str, api_key: str):
    url = f"https://api.monsterapi.ai/v1/status/{process_id}"
    headers = {
        "accept": "application/json",
        "authorization": f"Bearer {api_key}"
    }
    async with aiohttp.ClientSession() as session:
        while True:
            async with session.get(url, headers=headers) as response:
                status_data = await response.json()
                
                if status_data.get('status') == 'COMPLETED':
                    return status_data['result']['output'][0]
                elif status_data.get('status') == 'failed':
                    return None
                else:
                    await asyncio.sleep(5)

@app.post("/generate-image")
async def api_generate_image(request: ImageRequest):
    api_key = ""
    
    process_id = await generate_image(request.prompt, api_key)
    if process_id:
        image_url = await get_image_status(process_id, api_key)
        if image_url:
            return {"image_url": image_url}
        else:
            raise HTTPException(status_code=500, detail="Failed to generate image")
    else:
        raise HTTPException(status_code=500, detail="Failed to start image generation process")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
