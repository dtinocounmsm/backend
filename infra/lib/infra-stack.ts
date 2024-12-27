import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as apigatewayv2Integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

interface EnvConfig {
  envName: string;
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps & EnvConfig) {
    super(scope, id, props);

    // Crear un VPC para ECS
    const vpc = new ec2.Vpc(this, `${props.envName}-Vpc`, {
      maxAzs: 2, // Disponibilidad en 2 zonas
    });

    // Crear un clúster ECS
    const cluster = new ecs.Cluster(this, `${props.envName}-Cluster`, {
      vpc,
    });

    // Crear un repositorio ECR (si es necesario)
    const ecrRepo = new ecr.Repository(this, `${props.envName}-EcrRepo`);

    // Crear un rol para las tareas de ECS
    const taskRole = new iam.Role(this, `${props.envName}-TaskRole`, {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    taskRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        'service-role/AmazonECSTaskExecutionRolePolicy',
      ),
    );

    // Crear un grupo de logs en CloudWatch
    const logGroup = new logs.LogGroup(this, `${props.envName}-LogGroup`, {
      retention: logs.RetentionDays.ONE_WEEK,
    });

    // Definir la imagen de Docker desde ECR o una imagen pública
    const containerImage = ecs.ContainerImage.fromAsset('../backend');

    // Crear una tarea Fargate
    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      `${props.envName}-TaskDef`,
      {
        memoryLimitMiB: 512,
        cpu: 256,
        taskRole,
      },
    );

    const container = taskDefinition.addContainer(
      `${props.envName}-Container`,
      {
        image: containerImage,
        logging: ecs.LogDrivers.awsLogs({
          logGroup,
          streamPrefix: `${props.envName}-nestjs`,
        }),
      },
    );

    container.addPortMappings({
      containerPort: 3000,
    });

    // Crear un servicio Fargate
    const fargateService = new ecs.FargateService(
      this,
      `${props.envName}-Service`,
      {
        cluster,
        taskDefinition,
        desiredCount: 1,
        assignPublicIp: true,
      },
    );

    // Crear un API Gateway HTTP API
    const httpApi = new apigatewayv2.HttpApi(this, `${props.envName}-HttpApi`);

    // Obtener la dirección del servicio ECS (usando Public IP o configuración similar)
    const ecsServiceEndpoint = `http://${fargateService.taskDefinition.defaultContainer?.containerPort}`;

    // Agregar una ruta al API Gateway
    httpApi.addRoutes({
      path: '/{proxy+}',
      methods: [
        apigatewayv2.HttpMethod.GET,
        apigatewayv2.HttpMethod.POST,
        apigatewayv2.HttpMethod.PUT,
        apigatewayv2.HttpMethod.DELETE,
        apigatewayv2.HttpMethod.PATCH,
        apigatewayv2.HttpMethod.OPTIONS,
      ],
      integration: new apigatewayv2Integrations.HttpUrlIntegration(
        'EcsIntegration',
        ecsServiceEndpoint,
      ),
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: httpApi.url || 'Something went wrong with the deployment',
    });
  }
}
