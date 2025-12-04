// Python backend with FastAPI
// backend/sse_endpoint.py
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from kafka import KafkaConsumer
import json

app = FastAPI()

async def kafka_event_generator():
    consumer = KafkaConsumer(
        'events',
        bootstrap_servers=['kafka:9092'],
        value_deserializer=lambda m: json.loads(m.decode('utf-8'))
    )

    for message in consumer:
        yield f"data: {json.dumps(message.value)}\n\n"

@app.get("/stream")
async def stream_events():
    return StreamingResponse(
        kafka_event_generator(),
        media_type="text/event-stream"
    )