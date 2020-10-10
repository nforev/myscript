import boto3
def lambda_handler(event, context):
     #query RDS to get ID or get from SNS topic
     id = *queryresult*
     command = 'sh /path/to/scriptoninstance' + id
     ssm = boto3.client('ssm')
     ssmresponse = ssm.send_command(InstanceIds=['i-instanceid'], DocumentName='AWS-RunShellScript', Parameters= { 'commands': [command] } ) 


You have successfully created a new activation. Your activation code is listed below. Copy this code and keep it in a safe place as you will not be able to access it again.
Activation Code   J+5d0HkeFFbRluB+/2Xw
Activation ID   493975ad-dac5-4078-9439-e60a90c1ff4cYou can now install amazon-ssm-agent and manage your instance using Run Command.



var params = {
  CidrBlock: 'STRING_VALUE', /* required */
  AmazonProvidedIpv6CidrBlock: true || false,
  DryRun: true || false,
  InstanceTenancy: default | dedicated | host,
  Ipv6CidrBlock: 'STRING_VALUE',
  Ipv6CidrBlockNetworkBorderGroup: 'STRING_VALUE',
  Ipv6Pool: 'STRING_VALUE',
  TagSpecifications: [
    {
      ResourceType: client-vpn-endpoint | customer-gateway | dedicated-host | dhcp-options | egress-only-internet-gateway | elastic-ip | elastic-gpu | export-image-task | export-instance-task | fleet | fpga-image | host-reservation | image | import-image-task | import-snapshot-task | instance | internet-gateway | key-pair | launch-template | local-gateway-route-table-vpc-association | natgateway | network-acl | network-interface | placement-group | reserved-instances | route-table | security-group | snapshot | spot-fleet-request | spot-instances-request | subnet | traffic-mirror-filter | traffic-mirror-session | traffic-mirror-target | transit-gateway | transit-gateway-attachment | transit-gateway-multicast-domain | transit-gateway-route-table | volume | vpc | vpc-peering-connection | vpn-connection | vpn-gateway | vpc-flow-log,
      Tags: [
        {
          Key: 'STRING_VALUE',
          Value: 'STRING_VALUE'
        },
        /* more items */
      ]
    },
    /* more items */
  ]
};
ec2.createVpc(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


var params = {
  CidrBlock: 'STRING_VALUE', /* required */
  VpcId: 'STRING_VALUE', /* required */
  AvailabilityZone: 'STRING_VALUE',
  AvailabilityZoneId: 'STRING_VALUE',
  DryRun: true || false,
  Ipv6CidrBlock: 'STRING_VALUE',
  OutpostArn: 'STRING_VALUE',
  TagSpecifications: [
    {
      ResourceType: client-vpn-endpoint | customer-gateway | dedicated-host | dhcp-options | egress-only-internet-gateway | elastic-ip | elastic-gpu | export-image-task | export-instance-task | fleet | fpga-image | host-reservation | image | import-image-task | import-snapshot-task | instance | internet-gateway | key-pair | launch-template | local-gateway-route-table-vpc-association | natgateway | network-acl | network-interface | placement-group | reserved-instances | route-table | security-group | snapshot | spot-fleet-request | spot-instances-request | subnet | traffic-mirror-filter | traffic-mirror-session | traffic-mirror-target | transit-gateway | transit-gateway-attachment | transit-gateway-multicast-domain | transit-gateway-route-table | volume | vpc | vpc-peering-connection | vpn-connection | vpn-gateway | vpc-flow-log,
      Tags: [
        {
          Key: 'STRING_VALUE',
          Value: 'STRING_VALUE'
        },
        /* more items */
      ]
    },
    /* more items */
  ]
};
ec2.createSubnet(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


var params = {
  DryRun: true || false,
  TagSpecifications: [
    {
      ResourceType: client-vpn-endpoint | customer-gateway | dedicated-host | dhcp-options | egress-only-internet-gateway | elastic-ip | elastic-gpu | export-image-task | export-instance-task | fleet | fpga-image | host-reservation | image | import-image-task | import-snapshot-task | instance | internet-gateway | key-pair | launch-template | local-gateway-route-table-vpc-association | natgateway | network-acl | network-interface | placement-group | reserved-instances | route-table | security-group | snapshot | spot-fleet-request | spot-instances-request | subnet | traffic-mirror-filter | traffic-mirror-session | traffic-mirror-target | transit-gateway | transit-gateway-attachment | transit-gateway-multicast-domain | transit-gateway-route-table | volume | vpc | vpc-peering-connection | vpn-connection | vpn-gateway | vpc-flow-log,
      Tags: [
        {
          Key: 'STRING_VALUE',
          Value: 'STRING_VALUE'
        },
        /* more items */
      ]
    },
    /* more items */
  ]
};
ec2.createInternetGateway(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


var params = {
  InternetGatewayId: 'STRING_VALUE', /* required */
  VpcId: 'STRING_VALUE', /* required */
  DryRun: true || false
};
ec2.attachInternetGateway(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


var paramdvpc = {
  Filters: [
    {
      Name: 'eon',
      Values: [
        'eon',
      ]
    },
  ],
};
ec2.describeVpcs(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});



var params = {
  DryRun: true || false,
  TagSpecifications: [
    {
      ResourceType: internet-gateway,
      Tags: [
        {
          Key: 'Type',
          Value: 'eon'
        }
      ]
    }
  ]
};
ec2.createInternetGateway(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});