var Config = {
	accesskey: "",
	accesssecret: "",
	region: "",
	az: "",
	keypair: "",
    amiid: "",
};

var s3param = {
	verticarpm: "",
	mcrpm: "",
	s3bucket: "",
};

var state = {
    EON_EXIST: "A EON environmnet is already exist.",
    NO_EON: "There is no EON environment in your account now.",
    BUILDING: "Creating the EON enviroment, please do not close this webpage.",
    BUILDING_DONE: "The EON environment is ready now.",
    DESTROYING: "Removing resource for EON enviroment, please do not close this webpage.",
    DESTROYING_DONE: "The EON environment has been removed.",
    INITIAL: "Input your credential to retrieve the EON state.",
}


function InputCred(){
	Config.accesskey = document.getElementById("accesskey").value;
	Config.accesssecret = document.getElementById("accesssecret").value;
	Config.region = document.getElementById("region").value;
    Config.keypair=document.getElementById("keypair").value;
	switch (Config.region) {
		case "us-east-1":
            Config.az = 'us-east-1a';
            Config.amiid = 'ami-0947d2ba12ee1ff75';
            break;
		case "us-east-2":
            Config.az = 'us-east-2a';
            Config.amiid = 'ami-03657b56516ab7912';
            break;
		case "us-west-1":
            Config.az = 'us-west-1a';
            Config.amiid = 'ami-0e4035ae3f70c400f';
            break;
		case "us-west-2":
            Config.az = 'us-west-2a';
            Config.amiid = 'ami-0528a5175983e7f28';
            break;
		case "af-south-1":
            Config.az = 'af-south-1a';
            Config.amiid = 'ami-0cec12e29ebe3f0d5';
            break;
		case "ap-east-1":
            Config.az = 'ap-east-1a';
            Config.amiid = 'ami-814d0ff0';
            break;
		case "ap-south-1":
            Config.az = 'ap-south-1a';
            Config.amiid = 'ami-0e306788ff2473ccb';
            break;
		case "ap-northeast-1":
            Config.az = 'ap-northeast-1a';
            Config.amiid = 'ami-0ce107ae7af2e92b5';
            break;
		case "ap-northeast-2":
			Config.az = 'ap-northeast-2a';
            Config.amiid = 'ami-03b42693dc6a7dc35';
			break;
		case "ap-southeast-1":
            Config.az = 'ap-southeast-1a';
            Config.amiid = 'ami-015a6758451df3cb9';
            break;
		case "ap-southeast-2":
            Config.az = 'ap-southeast-2a';
            Config.amiid = 'ami-0f96495a064477ffb';
            break;
		case "ca-central-1":
            Config.az = 'ca-central-1a';
            Config.amiid = 'ami-0c2f25c1f66a1ff4d';
            break;
		case "eu-central-1":
            Config.az = 'eu-central-1a';
            Config.amiid = 'ami-00a205cb8e06c3c4e';
            break;
		case "eu-west-1":
            Config.az = 'eu-west-1a';
            Config.amiid = 'ami-0bb3fad3c0286ebd5';
            break;
		case "eu-west-2":
            Config.az = 'eu-west-2a';
            Config.amiid = 'ami-0a669382ea0feb73a';
            break;
        case "eu-south-1":
            Config.az = 'eu-south-1a';
            Config.amiid = 'ami-0759301b88845d121';
            break;
		case "eu-west-3":
            Config.az = 'eu-west-3a';
            Config.amiid = 'ami-0de12f76efe134f2f';
            break;
		case "eu-north-1":
            Config.az = 'eu-north-1a';
            Config.amiid = 'ami-0653812935d0743fe';
            break;
		case "me-south-1":
            Config.az = 'me-south-1a';
            Config.amiid = 'ami-08155c9ee8b845e35';
            break;
		case "sa-east-1":
            Config.az = 'sa-east-1a';
            Config.amiid = 'ami-02898a1921d38a50b';
            break;
    }
	alert("Your credential has been configured!");
	AwsConfig();
	var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
	detecteon();
	describeInstances();
}

function ShowCred(){
	document.getElementById("AccessKey").innerText = "AccessKey:" + Config.accesskey;
	document.getElementById("AccessSecret").innerText = "AccessSecret:" + Config.accesssecret;
}

function InvalidCrendentialHandler() {
	alert("The provided Credential or keypair is invalid!");
}

function validate_s3parameter(value) {
    if( /^s3:\/\//i.test(value) ){
        return true;
    } else {
        return false;
    }
}

//function AppendLink() {
//    var divnav = document.getElementById("nav");
//    var linkTmp = document.createElement("a");
//    linkTmp.href = "http://www.baidu.com";
//    linkTmp.innerText = "百度";
//    divnav.appendChild(linkTmp);
//    
//}

function AppendLink(value) {
    var divnav = document.getElementById("nav");
    var linkTmp = document.createElement("a");
    linkTmp.href = value;
    linkTmp.innerText = "INSTALLATION_LOG";
    divnav.appendChild(linkTmp);
}
