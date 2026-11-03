# Technical estimates

## AWS services

AWS service estimates:

- ECS - Fargate

  | Service Name | Instances | CPU | Memory |
  | ------------ | --------- | --- | ------ |
  | Comlink      | 20        |  2  | 4gb    |
  | Ender        | 1         |  4  | 8gb    |
  | Roundtable   | 5         |  2  | 4gb    |
  | Socks        | 20        |  4  | 16gb   |
  | Vulcan       | 8         |  4  | 8gb    |
- RDS - Postgres Database
  - Primary - db.m6g.16xlarge
  - Replica - 1 db.m6g.16xlarge
- EC2
  - Devboxes - t2.medium (1 instance per engineer)
- ElastiCache Redis
  - 1 primary and 1 replica with cache.r6g.large
- EC2 ELB - Loadbalancer
  - 250,000 LCU-Hrs/mo
- Cloudwatch - Logs
  - ~20,000 GB of logs ingested/mo
  - ~100,000,000 Metrics requested using GetMetricData API/mo
- Secret Manager
  - ~100 secrets
  - ~250,000 API requests

## Other services

- Terraform Cloud — deploying to cloud
  - ~4 engineers
- Bugsnag — bug awareness
  - Standard plan
- Datadog — metrics and monitoring
  - ~6000 custom metrics / hour
- PagerDuty — alerting
  - ~4 engineers
- v4 open source software is subject to [terms and conditions](https://dydx.exchange/v4-terms). dYdX will not operate or control any protocol that runs the software. The software licensing requires that users of the software comply with all applicable laws and regulations.
