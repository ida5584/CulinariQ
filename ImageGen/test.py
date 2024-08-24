import asyncio
import aiohttp
import json

async def test_generate_image():
    url = "http://localhost:8000/generate-image"
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "prompt": "A Cheese Sandwich in a plate with french fries nearby"
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data, headers=headers) as response:
            if response.status == 200:
                result = await response.json()
                print(f"Success! Generated image URL: {result['image_url']}")
            else:
                error_text = await response.text()
                print(f"Error: Status {response.status}")
                print(f"Response: {error_text}")

async def main():
    print("Testing image generation API...")
    await test_generate_image()

if __name__ == "__main__":
    asyncio.run(main())
