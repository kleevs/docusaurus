---
sidebar_position: 1
---

# Pipeline

La création de pipeline dans Azure Devops permet de mettre en place le CI/CD.

## Intégration continue 
L’intégration continue (CI) est la pratique utilisée par les équipes de développement pour automatiser, fusionner et tester le code. CI permet d’intercepter les bogues au début du cycle de développement, ce qui les rend moins coûteux à corriger. Des tests automatisés s’exécutent dans le cadre du processus CI pour garantir la qualité. Les systèmes CI produisent des artefacts et les alimentent pour les processus de mise en production afin de favoriser des déploiements fréquents.

## Livraison continue
La livraison continue (CD) est un processus par lequel le code est généré, testé et déployé dans un ou plusieurs environnements de test et de production. Le déploiement et le test dans plusieurs environnements augmentent la qualité. Les systèmes CD produisent des artefacts déployables, y compris l’infrastructure et les applications. Les processus de mise en production automatisée utilisent ces artefacts pour publier de nouvelles versions et des correctifs sur les systèmes existants. Les systèmes qui surveillent et envoient des alertes s’exécutent continuellement pour améliorer la visibilité sur l’ensemble du processus CD.

## Modèle de pipeline
Voici un exemple de pipeline pour le déploiement d'une application web .Net sur un App Service Azure.

```yml title=.azure/azure-pipelines.yml
trigger:
  branches:
    include:
      - develop

pool:
  vmImage: "windows-latest"

parameters:
- name: env
  displayName: Environnement
  type: string
  default: dev
  values:
  - ci
  - dev
  - qual
  - prod

variables:
  projectname: <projectname>
  dbprojectname: <dbprojectname>
  dbcontextname: <dbcontextname>
  MajorVersion: 1
  MinorVersion: 0
  isCI: ${{ or(eq(parameters.env, 'ci'), startsWith(variables['Build.SourceBranch'], 'refs/pull/')) }}
  isDeployment: ${{ not(eq(variables.isCI, 'True')) }}
  isDev: ${{ eq(parameters.env, 'dev') }}
  isQual: ${{ eq(parameters.env, 'qual') }}
  isProd: ${{ eq(parameters.env, 'prod') }}
  buildConfiguration: "Release"

  ${{ if eq(variables.isDev, 'True') }}: 
    azureSubscription: <azureSubscription>
    poolname: <poolname>
    dbserver: <dbserver>
    dbname: <dbname>
    appservice: <appservice>
  ${{ if eq(variables.isQual, 'True') }}: 
    azureSubscription: <azureSubscription>
    poolname: <poolname>
    dbserver: <dbserver>
    dbname: <dbname>
    appservice: <appservice>
  ${{ if eq(variables.isProd, 'True') }}: 
    azureSubscription: <azureSubscription>
    poolname: <poolname>
    dbserver: <dbserver>
    dbname: <dbname>
    appservice: <appservice>

name: $(MajorVersion).$(MinorVersion).$(Rev:r)

stages:
  - stage: build
    displayName: Build
    jobs:
      - job: Build
        steps:
          - task: Assembly-Info-NetCore@3
            inputs:
              Path: "$(Build.SourcesDirectory)"
              FileNames: "src/**/*.csproj"
              InsertAttributes: false
              FileEncoding: "auto"
              WriteBOM: false
              VersionNumber: "$(Build.BuildNumber)"
              FileVersionNumber: "$(Build.BuildNumber)"
              LogLevel: "verbose"
              FailOnWarning: false
              DisableTelemetry: false

          - task: DotNetCoreCLI@2
            displayName: Restore Project
            inputs:
              command: "restore"
              projects: "**/*.csproj"
              feedsToUse: "config"
              nugetConfigPath: "nuget.config"

          - task: DotNetCoreCLI@2
            displayName: Install EF Tool
            inputs:
              command: custom
              custom: "tool "
              arguments: install --global dotnet-ef
          
          - task: DotNetCoreCLI@2
            displayName: Build The Project
            inputs:
              command: "build"
              projects: "**/*.csproj"
              arguments: "--configuration $(BuildConfiguration)"
          
          - task: DotNetCoreCLI@2
            displayName: Execute Unit Tests
            enabled: true
            inputs:
              command: "test"
              projects: "**/*[Tt]ests/*.csproj"
              arguments: "--configuration $(BuildConfiguration)"

          - task: DotNetCoreCLI@2
            displayName: Create SQL Scripts
            inputs:
              command: custom
              custom: "ef "
              arguments: migrations script --output $(Build.SourcesDirectory)/script.sql --idempotent --project src/${{ variables.dbprojectname }}/${{ variables.dbprojectname }}.csproj --context ${{ variables.dbcontextname }} --startup-project src/${{ variables.projectname }}/${{ variables.projectname }}.csproj
          
          - task: DotNetCoreCLI@2
            displayName: "Publish API Project"
            condition: and(succeeded(), eq(variables.isDeployment, 'True'))
            inputs:
              command: "publish"
              publishWebProjects: false
              zipAfterPublish: false
              projects: "**/${{ variables.projectname }}.csproj"
              arguments: "--configuration $(BuildConfiguration) --output $(build.artifactstagingdirectory)"
          
          - publish: '$(Build.ArtifactStagingDirectory)'
            condition: and(succeeded(), eq(variables.isDeployment, 'True'))
            displayName: 'Publish Artifact'
            artifact: drop_api

          - publish: $(Build.SourcesDirectory)/script.sql
            condition: and(succeeded(), eq(variables.isDeployment, 'True'))
            displayName: "Publish Artifact: SQLScripts"
            artifact: drop_sql

  - ${{ if eq(variables.isDeployment, 'True') }}:         
    - stage: deploy_api
      condition: succeeded()
      dependsOn: build
      displayName: Deploy AppService
      pool: $(poolname)
      jobs:
        - job: Deploy
          steps:
            - download: current
              artifact: drop_api
   
            - task: AzureRmWebAppDeployment@4
              displayName: 'Azure App Service Deploy: ${{ variables.appservice }}'
              inputs:
                azureSubscription: $(azureSubscription)
                WebAppName: $(appservice)
                packageForLinux: '$(Pipeline.Workspace)/drop_api/${{ variables.projectname }}'  
                
    - stage: deploy_sql
      condition: succeeded()
      dependsOn: build
      displayName: Deploy Database
      pool: $(poolname)
      jobs:
        - job: Deploy
          steps:
            - download: current
              artifact: drop_sql
   
            - task: SqlAzureDacpacDeployment@1
              displayName: 'Azure SQL SqlTask'
              inputs:
                azureSubscription: $(azureSubscription)
                ServerName: $(dbserver)
                DatabaseName: $(dbname)
                AuthenticationType: servicePrincipal
                deployType: SqlTask
                SqlFile: '$(Pipeline.Workspace)/drop_sql/sampleflow.sql'
```

Voici un exemple de pipeline pour le déploiement d'une application Web frontend sur un App Service Azure.

```yml title=.azure/azure-pipelines.yml
trigger:
  branches:
    include:
      - develop

pool:
  vmImage: "windows-latest"

parameters:
- name: env
  displayName: Environnement
  type: string
  default: dev
  values:
  - ci
  - dev
  - qual
  - prod

variables:
  MajorVersion: 1
  MinorVersion: 0
  packagename: <packagename>
  publishfolder: <publishfolder>
  isCI: ${{ or(eq(parameters.env, 'ci'), startsWith(variables['Build.SourceBranch'], 'refs/pull/')) }}
  isDeployment: ${{ not(eq(variables.isCI, 'True')) }}
  isDev: ${{ eq(parameters.env, 'dev') }}
  isQual: ${{ eq(parameters.env, 'qual') }}
  isProd: ${{ eq(parameters.env, 'prod') }}
  ${{ if eq(variables.isDev, 'True') }}: 
    azureSubscription: <azureSubscription>
    poolname: <poolname>
    appservice: <appservice>
  ${{ if eq(variables.isQual, 'True') }}: 
    azureSubscription: <azureSubscription>
    poolname: <poolname>
    appservice: <appservice>
  ${{ if eq(variables.isProd, 'True') }}: 
    azureSubscription: <azureSubscription>
    poolname: <poolname>
    appservice: <appservice>

name: $(MajorVersion).$(MinorVersion).$(Rev:r)

pool:
  vmImage: "ubuntu-latest"

stages:
  - stage: build
    displayName: Build
    jobs:
      - job:
        displayName: Build
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: "16.x"
            displayName: "Install Node.js"
    
          - script: |
              yarn install
            displayName: "yarn install"

          - script: |
              yarn build
            displayName: "yarn build"

          - script: |
              cp ${{ variables.packagename }}/public/* ${{ variables.packagename }}/${{ variables.publishfolder }}
            displayName: "copy public folder"
          
          - script: |
              yarn test
            displayName: "yarn test"

          - publish: '${{ variables.packagename }}/${{ variables.publishfolder }}'
            displayName: 'Publish Artifact'
            artifact: drop
            condition: and(succeeded(), eq(variables.isDeployment, 'True'))

  - ${{ eq(variables.isDeployment, 'True') }}:
    - stage: deploy
      displayName: Deploy
      condition: succeeded()
      pool: $(poolname)
      jobs:
        - job:
          displayName: Deploy
          steps:
            - download: current
              artifact: drop

            - task: AzureRmWebAppDeployment@4
              displayName: 'Azure App Service Deploy'
              inputs:
                azureSubscription: $(azureSubscription)
                WebAppName: $(appservice)
                packageForLinux: '$(Pipeline.Workspace)/drop'
```