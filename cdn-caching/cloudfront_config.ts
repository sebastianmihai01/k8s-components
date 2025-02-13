import { CloudFrontRequestEvent, CloudFrontRequestResult } from 'aws-lambda';

export interface CdnConfig {
  defaultTtl: number;
  maxTtl: number;
  allowedMethods: string[];
  cachePolicyName: string;
}

export class CloudFrontHandler {
  private config: CdnConfig;

  constructor(config: Partial<CdnConfig> = {}) {
    this.config = {
      defaultTtl: 86400, // 24 hours
      maxTtl: 31536000, // 1 year
      allowedMethods: ['GET', 'HEAD'],
      cachePolicyName: 'default-policy',
      ...config
    };
  }

  async handleRequest(event: CloudFrontRequestEvent): Promise<CloudFrontRequestResult> {
    const request = event.Records[0].cf.request;
    
    // Add cache control headers
    request.headers['cache-control'] = [{
      key: 'Cache-Control',
      value: `max-age=${this.config.defaultTtl}`
    }];

    return request;
  }
} 