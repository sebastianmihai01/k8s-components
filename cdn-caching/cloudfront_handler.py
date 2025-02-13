from typing import Dict, Any
import json

class CloudFrontHandler:
    def __init__(self, config: Dict[str, Any] = None):
        self.config = {
            'default_ttl': 86400,  # 24 hours
            'max_ttl': 31536000,  # 1 year
            'allowed_methods': ['GET', 'HEAD'],
            'cache_policy_name': 'default-policy'
        }
        if config:
            self.config.update(config)

    def handle_request(self, event: Dict[str, Any]) -> Dict[str, Any]:
        request = event['Records'][0]['cf']['request']
        
        # Add cache control headers
        request['headers']['cache-control'] = [{
            'key': 'Cache-Control',
            'value': f"max-age={self.config['default_ttl']}"
        }]
        
        return request 