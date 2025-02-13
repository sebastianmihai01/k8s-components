import { ECS } from 'aws-sdk';

export interface TaskDefinitionConfig {
  family: string;
  cpu: string;
  memory: string;
  containerDefinitions: ECS.ContainerDefinition[];
}

export class ECSTaskDefinitionService {
  private ecs: ECS;

  constructor() {
    this.ecs = new ECS();
  }

  async registerTaskDefinition(config: TaskDefinitionConfig): Promise<ECS.TaskDefinition> {
    const params: ECS.RegisterTaskDefinitionRequest = {
      family: config.family,
      cpu: config.cpu,
      memory: config.memory,
      containerDefinitions: config.containerDefinitions,
      networkMode: 'awsvpc',
      requiresCompatibilities: ['FARGATE'],
    };

    const result = await this.ecs.registerTaskDefinition(params).promise();
    return result.taskDefinition!;
  }
} 