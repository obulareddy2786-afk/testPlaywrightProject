# Creates (or updates) the Jenkins pipeline job "playwright-tests" that reads the
# root Jenkinsfile from the local git repo, then starts a build.
# Run from your own PowerShell window so you can type the API token securely:
#   powershell -ExecutionPolicy Bypass -File "C:\Users\204761\Downloads\Claude\jenkins\create-job.ps1"

$ErrorActionPreference = 'Stop'

$jenkins = 'http://localhost:8080'
$jobName = 'playwright-tests'
$repoPath = 'C:/Users/204761/Downloads/Claude'

$user = Read-Host 'Jenkins username'
$secureToken = Read-Host 'Jenkins API token' -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
$token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)

$basic = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$user`:$token"))
$headers = @{ Authorization = "Basic $basic" }

# CSRF crumb (required when Jenkins has CSRF protection enabled).
try {
    $crumb = Invoke-RestMethod -Uri "$jenkins/crumbIssuer/api/json" -Headers $headers
    $headers[$crumb.crumbRequestField] = $crumb.crumb
} catch {
    Write-Host 'No CSRF crumb issuer found; continuing without it.'
}

$configXml = @"
<flow-definition plugin="workflow-job">
  <description>Playwright E2E tests, run from the local git repo</description>
  <keepDependencies>false</keepDependencies>
  <properties/>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition" plugin="workflow-cps">
    <scm class="hudson.plugins.git.GitSCM" plugin="git">
      <configVersion>2</configVersion>
      <userRemoteConfigs>
        <hudson.plugins.git.UserRemoteConfig>
          <url>$repoPath</url>
        </hudson.plugins.git.UserRemoteConfig>
      </userRemoteConfigs>
      <branches>
        <hudson.plugins.git.BranchSpec>
          <name>*/main</name>
        </hudson.plugins.git.BranchSpec>
      </branches>
      <doGenerateSubmoduleConfigurations>false</doGenerateSubmoduleConfigurations>
      <submoduleCfg class="empty-list"/>
      <extensions/>
    </scm>
    <scriptPath>Jenkinsfile</scriptPath>
    <lightweight>true</lightweight>
  </definition>
  <triggers/>
  <disabled>false</disabled>
</flow-definition>
"@

$xmlHeaders = $headers.Clone()
$xmlHeaders['Content-Type'] = 'application/xml'

$jobExists = $true
try {
    Invoke-RestMethod -Uri "$jenkins/job/$jobName/api/json" -Headers $headers | Out-Null
} catch {
    $jobExists = $false
}

if ($jobExists) {
    Invoke-RestMethod -Method Post -Uri "$jenkins/job/$jobName/config.xml" -Headers $xmlHeaders -Body $configXml | Out-Null
    Write-Host "Updated job '$jobName'."
} else {
    Invoke-RestMethod -Method Post -Uri "$jenkins/createItem?name=$jobName" -Headers $xmlHeaders -Body $configXml | Out-Null
    Write-Host "Created job '$jobName'."
}

Invoke-RestMethod -Method Post -Uri "$jenkins/job/$jobName/build" -Headers $headers | Out-Null
Write-Host "Build started. Follow it at $jenkins/job/$jobName/"
