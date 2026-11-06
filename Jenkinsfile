pipeline {
  agent any

  options {
    timestamps()
    timeout(time: 60, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'node --version'
        sh 'npm --version'
        sh 'npm ci'
        sh 'npx playwright install --with-deps chromium'
      }
    }

    stage('Run Playwright tests') {
      steps {
        withCredentials([
          string(credentialsId: 'playwright-test-email', variable: 'TEST_USER_EMAIL'),
          string(credentialsId: 'playwright-test-password', variable: 'TEST_USER_PASSWORD')
        ]) {
          sh 'npx playwright test --project=chromium'
        }
      }
    }
  }

  post {
    always {
      junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
      archiveArtifacts allowEmptyArchive: true, artifacts: 'playwright-report/**,test-results/**'
    }
  }
}
