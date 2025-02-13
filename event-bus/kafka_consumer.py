from confluent_kafka import Consumer, KafkaError
from typing import Callable, Dict, Any
import json

class KafkaConsumerService:
    def __init__(self, config: Dict[str, Any]):
        self.consumer = Consumer({
            'bootstrap.servers': config['bootstrap_servers'],
            'group.id': config['group_id'],
            'auto.offset.reset': 'earliest'
        })
        
    def subscribe(self, topics: list):
        self.consumer.subscribe(topics)
        
    def start_consuming(self, message_handler: Callable):
        try:
            while True:
                msg = self.consumer.poll(1.0)
                if msg is None:
                    continue
                if msg.error():
                    if msg.error().code() == KafkaError._PARTITION_EOF:
                        continue
                    else:
                        print(f"Consumer error: {msg.error()}")
                        break
                
                message_handler(json.loads(msg.value().decode('utf-8')))
                
        finally:
            self.consumer.close() 