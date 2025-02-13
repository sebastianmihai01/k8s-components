provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "./modules/vpc"
  environment = var.environment
  vpc_cidr = var.vpc_cidr
}

module "ecs" {
  source = "./modules/ecs"
  environment = var.environment
  vpc_id = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
}

module "rds" {
  source = "./modules/rds"
  environment = var.environment
  vpc_id = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
} 