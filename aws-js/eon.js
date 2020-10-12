var subnetid = '';
var vpcid = '';
var sgid = '';

   
var part1 = `#!/bin/bash
    yum install -y dialog;
    sudo sed -i "s/PasswordAuthentication no/PasswordAuthentication yes/g" /etc/ssh/sshd_config;
    sudo systemctl restart sshd;
    `;
var part6 = `
    echo "#test" >> /etc/hosts;
    sleep 10;
    sudo rpm -Uvh /tmp/vertica*.rpm;
    sleep 60;
    sudo groupadd verticadba;
    sudo useradd dbadmin -G verticadba -p vertica123;
    sudo echo "10.100.1.11 vertica01" >> /etc/hosts;
    sudo echo "10.100.1.12 vertica02" >> /etc/hosts;
    sudo echo "10.100.1.13 vertica03" >> /etc/hosts;
    sudo echo "dbadmin ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers;
    su - dbadmin -p vertica -c "sudo /opt/vertica/sbin/install_vertica --hosts vertica01,vertica02,vertica03 --failure-threshold NONE -T --dba-user-password password --ssh-password vertica --license CE --accept-eula";
    `;
var s3cmd = "sudo aws s3 cp " + s3param.verticarpm + " /tmp/;"
    
var verticauserData=part1 + s3cmd + part6;
var verticauserDataEncoded = btoa(verticauserData);
// AMI is amzn-ami-2011.09.1.x86_64-ebs


function createeoninstance() {
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    var instanceParams1 = {
        ImageId: 'ami-01288945bd24ed49a', 
        //ImageId: 'ami-05dbc2395794a5a52', 
        InstanceType: 't2.micro',
        KeyName: 'mykey_seoul',
        MinCount: 1,
        MaxCount: 1,
        //SecurityGroupIds: ["sg-e6c67b86"],
        UserData: verticauserDataEncoded,
        SubnetId: subnetid,
        IamInstanceProfile: {
          Name: 'ec2s3full'
        },
        TagSpecifications: [
            {
                ResourceType: 'instance',
                Tags: [
                    {
                        Key: 'Type',
                        Value: 'eon'
                    }
                ]
            }
        ],
        PrivateIpAddress: '10.100.1.11',
        
    };
    
    var instanceParams2 = {
        ImageId: 'ami-01288945bd24ed49a', 
        //ImageId: 'ami-05dbc2395794a5a52', 
        InstanceType: 't2.micro',
        KeyName: 'mykey_seoul',
        MinCount: 1,
        MaxCount: 1,
        //SecurityGroupIds: ["sg-e6c67b86"],
        UserData: verticauserDataEncoded,
        SubnetId: subnetid,
        IamInstanceProfile: {
          Name: 'ec2s3full'
        },
        TagSpecifications: [
            {
                ResourceType: 'instance',
                Tags: [
                    {
                        Key: 'Type',
                        Value: 'eon'
                    }
                ]
            }
        ],
        PrivateIpAddress: '10.100.1.12',
        
    };
    
    var instanceParams3 = {
        ImageId: 'ami-01288945bd24ed49a', 
        //ImageId: 'ami-05dbc2395794a5a52', 
        InstanceType: 't2.micro',
        KeyName: 'mykey_seoul',
        MinCount: 1,
        MaxCount: 1,
        //SecurityGroupIds: ["sg-e6c67b86"],
        UserData: verticauserDataEncoded,
        SubnetId: subnetid,
        IamInstanceProfile: {
          Name: 'ec2s3full'
        },
        TagSpecifications: [
            {
                ResourceType: 'instance',
                Tags: [
                    {
                        Key: 'Type',
                        Value: 'eon'
                    }
                ]
            }
        ],
        PrivateIpAddress: '10.100.1.13',
        
    };
    
    // Create a promise on an EC2 service object
    var instancePromise1 = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams1).promise();
    var instancePromise2 = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams2).promise();
    var instancePromise3 = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams3).promise();
    
    // Handle promise's fulfilled/rejected states
    instancePromise1.then(
        function(data) {
            console.log(data);
            var instanceId = data.Instances[0].InstanceId;
            console.log("Created instance", instanceId);
        }).catch(
        function(err) {
            console.error(err, err.stack);
        });
    instancePromise2.then(
        function(data) {
            console.log(data);
            var instanceId = data.Instances[0].InstanceId;
            console.log("Created instance", instanceId);
        }).catch(
        function(err) {
            console.error(err, err.stack);
        });
    instancePromise3.then(
        function(data) {
            console.log(data);
            var instanceId = data.Instances[0].InstanceId;
            console.log("Created instance", instanceId);
        }).catch(
        function(err) {
            console.error(err, err.stack);
        });
}

function CreateVerticaInstance() {
    AwsConfig();
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    s3param.verticarpm = document.getElementById("verticarpm").value;    
    var part1 = `#!/bin/bash
        yum install -y dialog;
        `;
    var part6 = `
        echo "#test" >> /etc/hosts;
        sudo rpm -Uvh /tmp/vertica*.rpm;
        `;
    var s3cmd = "sudo aws s3 cp " + s3param.verticarpm + " /tmp/;"
        
    var userData=part1 + s3cmd + part6;

    var userDataEncoded = btoa(userData);
    // AMI is amzn-ami-2011.09.1.x86_64-ebs
    var instanceParams = {
        ImageId: 'ami-01288945bd24ed49a', 
        //ImageId: 'ami-05dbc2395794a5a52', 
        InstanceType: 't2.micro',
        KeyName: 'mykey_seoul',
        MinCount: 1,
        MaxCount: 1,
        SecurityGroupIds: ["sg-e6c67b86"],
        UserData: userDataEncoded,
        IamInstanceProfile: {
          Name: 'ec2s3full'
        },
    };
    
    // Create a promise on an EC2 service object
    var instancePromise = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise();
    
    // Handle promise's fulfilled/rejected states
    instancePromise.then(
        function(data) {
            console.log(data);
            var instanceId = data.Instances[0].InstanceId;
            console.log("Created instance", instanceId);
        }).catch(
        function(err) {
                console.error(err, err.stack);
                InvalidCrendentialHandler();
        });
}

function createRoleFors3() {
    var iam = new AWS.IAM({ apiVersion: '2010-05-08' });
    var myPolicy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "ec2.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    };
    var createParams = {
        AssumeRolePolicyDocument: JSON.stringify(myPolicy),
        RoleName: "rolefors3access",
        Tags: [
            {
                Key: 'Type',
                Value: 'eon'
            }
        ]
    };
    var policyParams = {
        PolicyArn: "arn:aws:iam::aws:policy/AmazonS3FullAccess",
        RoleName: "rolefors3access"
    };
    iam.createRole(createParams, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            console.log("Role ARN is", data.Role.Arn);
            iam.attachRolePolicy(policyParams, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    console.log("s3access Policy attached");
                }
            });
        }
    });
}

function deletes3role() {
    var iam = new AWS.IAM({ apiVersion: '2010-05-08' });
    var paramdelrole = {
        RoleName: 'rolefors3access'
    };
    var paramdetachrole = {
        PolicyArn: 'arn:aws:iam::aws:policy/AmazonS3FullAccess', /* required */
        RoleName: 'rolefors3access' /* required */
    };
    iam.detachRolePolicy(paramdetachrole, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else
            console.log("s3 policy detached!");
            iam.deleteRole(paramdelrole, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else console.log("Role rolefors3access deleted!");           // successful response
            });
    });
}

function createsg() {
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    var paramsg = {
        Description: "SG for eon vpc",
        GroupName: 'sgforeon',
        VpcId: vpcid,
        TagSpecifications: [
            {
                ResourceType: 'security-group',
                Tags: [
                    {
                        Key: 'Type',
                        Value: 'eon'
                    }
                ]
            }
        ]
    };
    ec2.createSecurityGroup(paramsg, function(err, datasg) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            console.log("SG created!");
            jsonsg=JSON.parse(JSON.stringify(datasg));
            sgid = jsonsg.GroupId;
        }
    });
    //var paramapplyrule = {
    //    GroupId: "sg-903004f8", 
    //    IpPermissions: [
    //        {
    //            FromPort: 22, 
    //            IpProtocol: "tcp", 
    //            IpRanges: [
    //                {
    //                    CidrIp: "203.0.113.0/24", 
    //                    Description: "SSH access from the LA office"
    //                }
    //            ], 
    //            ToPort: 22
    //        }
    //    ]
    //};
    //ec2.authorizeSecurityGroupIngress(params, function(err, data) {
    //    if (err) console.log(err, err.stack); // an error occurred
    //    else     console.log(data);           // successful response
    //});
}

function buildeon() {
    $("#buildeon").attr("disabled",true);
    //1. create vpc
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    var paramvpc = {
        CidrBlock: '10.100.0.0/16',
        TagSpecifications: [
            {
                ResourceType: 'vpc',
                Tags: [
                    {
                        Key: 'Type',
                        Value: 'eon'
                    }
                ]
            }
        ]
    }
    ec2.createVpc(paramvpc, function(err, datavpc) {
        if (err) {
            console.log(err, err.stack);
            InvalidCrendentialHandler();
        } else {
            jsonvpc=JSON.parse(JSON.stringify(datavpc));
            console.log("VPC created:", jsonvpc.Vpc.VpcId);
            console.log(jsonvpc);
            vpcid = jsonvpc.Vpc.VpcId;
            createsg();
            var paramslistrb = {
                Filters: [
                    {
                        Name: "vpc-id", 
                        Values: [
                            vpcid
                        ]
                    }
                ]
            };
            var paramsubnet={
                CidrBlock: "10.100.1.0/24",
                VpcId: vpcid,
                AvailabilityZone: 'ap-northeast-2a',
                TagSpecifications: [
                    {
                        ResourceType: 'subnet',
                        Tags: [
                            {
                                Key: 'Type',
                                Value: 'eon'
                            }
                        ]
                    }
                ]
            }
            createRoleFors3();
            ec2.createSubnet(paramsubnet, function(err,datasubnet){
                if (err) {
                    console.log(err, err.stack);
                } else {
                    jsonsubnet=JSON.parse(JSON.stringify(datasubnet));
                    console.log("Subnet Created: ", jsonsubnet.Subnet.SubnetId);
                    //console.log(vpcid);
                    subnetid = jsonsubnet.Subnet.SubnetId;
                    var parammodifysubnet = {
                        MapPublicIpOnLaunch: {
                            Value: true
                        }, 
                        SubnetId: subnetid
                    };
                    ec2.modifySubnetAttribute(parammodifysubnet, function(err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else     console.log("Enable auto-assign public ip address!");           // successful response
                    });
                    //createeoninstance();
                }
            });
            var paramcreateigw = {
                TagSpecifications: [
                    {
                        ResourceType: 'internet-gateway',
                        Tags: [
                            {
                                Key: 'Type',
                                Value: 'eon'
                            }
                        ]
                    }
                ]
            };
            ec2.createInternetGateway(paramcreateigw, function(err, datacreateigw) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    jsonigw=JSON.parse(JSON.stringify(datacreateigw));
                    console.log("igw created: ", jsonigw.InternetGateway.InternetGatewayId);
                    var igwid = jsonigw.InternetGateway.InternetGatewayId;
                    var paramattachigw = {
                        InternetGatewayId: igwid, 
                        VpcId: vpcid
                    };
                    ec2.attachInternetGateway(paramattachigw, function(err, data) {
                      if (err) {
                          console.log(err, err.stack);
                      } else {
                          console.log("Attach igw to vpc!");
                          ec2.describeRouteTables(paramslistrb, function(err, rtblist) {
                              if (err) {
                                  console.log(err, err.stack);
                              } else {
                                  json=JSON.parse(JSON.stringify(rtblist));
                                  var rtbid=json.RouteTables[0].RouteTableId;
                                  var paramcreateroute = {
                                      DestinationCidrBlock: "0.0.0.0/0", 
                                      GatewayId: igwid,
                                      RouteTableId: rtbid
                                      
                                  };
                                  ec2.createRoute(paramcreateroute, function(err, data) {
                                      if (err) console.log(err, err.stack);
                                      else     console.log("Route Created");
                                  });
                              }   
                          });
                      }
                    });
                }                    
            });
        }
    });
    
    //2. create subnet
    //3. create igw
    //4. attach igw to vpc
    //5. create rb to igw
    //6. attach rb to subnet
    //7. create instance
}

function destroyvpc() {
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    
    //1. terminate instance    
    //2. remove subnet
    var params = {
        Filters: [
            {
                Name: 'tag:Type',
                Values: [
                    'eon'
                ]
            }
        ]
    };
    ec2.describeSubnets(params, function(err, datalistsubnet) {
        if (err) console.log(err, err.stack); // an error occurred
        else
            json=JSON.parse(JSON.stringify(datalistsubnet));
            console.log("get subnet id:", json.Subnets[0].SubnetId);
            var subnetid = json.Subnets[0].SubnetId;
            var paramdeletesubnet={
                SubnetId: subnetid
            };
            ec2.deleteSubnet(paramdeletesubnet, function(err, data) {
                if (err) console.log(err, err.stack);
                else console.log("subnet deleted");
            });
            //ec2.describeRouteTables(params, function(err, rblist) {
            //    if (err) console.log(err, err.stack);
            //    else
            //        json=JSON.parse(JSON.stringify(rblist));
            //        var rbid=json.RouteTables[0].RouteTableId;
            //        var paramdelrb={
            //            RouteTableId: rbid
            //        }
            //        ec2.deleteRouteTable(paramdelrb, function(err, data) {
            //            if (err) console.log(err, err.stack);
            //            else console.log("Route Table deleted")
            //        });
            //});
            deletes3role();
            ec2.describeVpcs(params, function(err, datalistvpc) {
                if (err) console.log(err, err.stack); // an error occurred
                else     
                    json=JSON.parse(JSON.stringify(datalistvpc));
                    console.log("get vpc id.", json.Vpcs[0].VpcId);
                    var vpcid = json.Vpcs[0].VpcId;
                    ec2.describeInternetGateways(params, function(err, datalistigw) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else     
                            console.log(datalistigw);
                        json=JSON.parse(JSON.stringify(datalistigw));
                        console.log('get igw id.', json.InternetGateways[0].InternetGatewayId);
                        var igwid = json.InternetGateways[0].InternetGatewayId;
                        var paramdettachigw={
                            InternetGatewayId: igwid,
                            VpcId: vpcid
                        };
                        var paramdeleteigw={
                            InternetGatewayId: igwid
                        };
                        ec2.detachInternetGateway(paramdettachigw, function(err, data) {
                            if (err) console.log(err, err.stack); // an error occurred
                            else     
                                console.log("igw dettached");
                                ec2.deleteInternetGateway(paramdeleteigw, function(err, data) {
                                    if (err) console.log(err, err.stack); // an error occurred
                                    else     
                                        console.log("igw deleted");
                                        var paramdeletevpc={
                                            VpcId: vpcid
                                        };
                                        ec2.deleteVpc(paramdeletevpc, function(err, data) {
                                            if (err) console.log(err, err.stack);
                                            else console.log("vpc deleted");
                                            $("#destroyeon").attr("disabled",false);
                                            $("#buildeon").attr("disabled",false);
                                        });
                                });
                        });
                    });
            });    
    });
    
    //3. remove rb
    //4. dettach igw
    //5. remove igw
    //6. remove vpc

    
    //ec2.describeVpcs(paramlistvpc, function(err, datalistvpc) {
    //    if (err) console.log(err, err.stack); // an error occurred
    //    else     
    //        json=JSON.parse(JSON.stringify(datalistvpc));
    //        console.log("get vpc id.");
    //        console.log(json.Vpcs[0].VpcId);
    //        var vpcid = json.Vpcs[0].VpcId;
    //        var paramdeletevpc={
    //            VpcId: vpcid
    //        };
    //        ec2.deleteVpc(paramdeletevpc, function(err, data) {
    //            if (err) console.log(err, err.stack);
    //            else console.log("vpc deleted");
    //        });
    //});

}

async function waitinginstanceterminated() {
  //await sleep(20000);
  destroyvpc();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


function destroyeon() {
    $("#destroyeon").attr("disabled",true);
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    
    var param1 = {
        DryRun: false
	};
    var ids = new Array();
    var param2 = {
        InstanceIds: ids,
        DryRun: false   
    };
    
    ec2.describeInstances(param1, function(err, data) {
	if (err) {
        console.log("Error", err.stack);
        InvalidCrendentialHandler();
	} else {
		console.log("Success");
		var json = JSON.parse(JSON.stringify(data));
		console.log(json.Reservations);
        for (var i in json.Reservations) {
			instances = json.Reservations[i].Instances;
			//document.write(instances[0].InstanceId + "<br>");
            //inst=JSON.stringify(instances[0].InstanceId);

            ids.push(instances[0].InstanceId);
        }
        ec2.terminateInstances(param2, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     
                console.log(data);
                describeInstances();
        });
        waitinginstanceterminated();

    }
    });
}

