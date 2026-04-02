pipeline {
    agent any

    tools {
        maven 'Maven3'
        nodejs 'NodeJS' // Using Node for bun installation or bun directly if configured
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Source code checked out successfully.'
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                    echo 'Backend built successfully.'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                    echo 'Backend tests passed.'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'bun install'
                    sh 'bun run build'
                    echo 'Frontend built successfully.'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'docker build -t client-project-dashboard:latest -f Dockerfile backend/'
                echo 'Application deployed successfully.'
            }
        }
    }
}
