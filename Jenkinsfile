node {
    checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/swapnildahiphale/docker-example.git']]])
    stage("Build Application")
        sh 'docker-compose build'
    stage("Run Application")
        sh 'docker-compose up -d'
    stage("Test Application") {
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'selenium']], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/swapnildahiphale/SeleniumExample.git']]])
        sh '''ip=`curl http://instance-data/latest/meta-data/public-ipv4`
            cd $PWD/selenium && docker build -t selenium-test .
            docker run -v $PWD/test-report:/usr/share/app/target/surefire-reports -e TEST_URL=http://$ip:5555/ selenium-test
            '''
        junit allowEmptyResults: true, testResults: 'selenium/test-report/TEST-tests.example.HtmlUnitDriverTest.xml'
    }
    stage("Destroy Environment")
        sh 'docker-compose down'
}
