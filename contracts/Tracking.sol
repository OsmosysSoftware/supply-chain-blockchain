// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Tracking {
    enum ShipmentStatus { PENDING, IN_TRANSIT, DELIVERED }

    struct Shipment {
        string packageId;
        address sender;
        address receiver;
        string packageName;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    mapping(string => Shipment) public shipments;
    mapping(address => uint256) public shipmentCounts;
    string[] public shipmentIds;

    event ShipmentCreated(string packageId, address indexed sender, address indexed receiver, string packageName, uint256 distance, uint256 price);
    event ShipmentInTransit(string packageId, address indexed sender, address indexed receiver, uint256 pickupTime);
    event ShipmentDelivered(string packageId, address indexed sender, address indexed receiver, uint256 deliveryTime);
    event ShipmentPaid(string packageId, address indexed sender, address indexed receiver, uint256 amount);

    function createShipment(string memory _packageId, address _receiver, string memory _packageName, uint256 _distance, uint256 _price) public payable {
        require(msg.value == _price, "Payment amount must match the price.");
        require(shipments[_packageId].sender == address(0), "Shipment ID already exists.");

        Shipment memory shipment = Shipment({
            packageId: _packageId,
            sender: msg.sender,
            receiver: _receiver,
            packageName: _packageName,
            pickupTime: block.timestamp,
            deliveryTime: 0,
            distance: _distance,
            price: _price,
            status: ShipmentStatus.PENDING,
            isPaid: false
        });

        shipments[_packageId] = shipment;
        shipmentCounts[msg.sender]++; // Increment the sender's shipment count
        shipmentIds.push(_packageId);

        emit ShipmentCreated(_packageId, msg.sender, _receiver, _packageName, _distance, _price);
    }

    function startShipment(string memory _packageId) public {
        Shipment storage shipment = shipments[_packageId];

        require(shipment.sender != address(0), "Shipment does not exist.");
        require(shipment.status == ShipmentStatus.PENDING, "Shipment already in transit.");
        require(shipment.sender == msg.sender, "Only the sender can start the shipment.");

        shipment.status = ShipmentStatus.IN_TRANSIT;
        shipment.pickupTime = block.timestamp;

        emit ShipmentInTransit(_packageId, shipment.sender, shipment.receiver, shipment.pickupTime);
    }

    function completeShipment(string memory _packageId) public {
        Shipment storage shipment = shipments[_packageId];

        require(shipment.sender != address(0), "Shipment does not exist.");
        require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment not in transit.");
        require(shipment.receiver == msg.sender, "Only the receiver can complete the shipment.");
        require(!shipment.isPaid, "Shipment already paid.");

        shipment.status = ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;
        shipment.isPaid = true;

        payable(shipment.sender).transfer(shipment.price);

        emit ShipmentDelivered(_packageId, shipment.sender, shipment.receiver, shipment.deliveryTime);
        emit ShipmentPaid(_packageId, shipment.sender, shipment.receiver, shipment.price);
    }

    function getShipment(string memory _packageId) public view returns (Shipment memory) {
        return shipments[_packageId];
    }

    function getAllShipments() public view returns (Shipment[] memory) {
        Shipment[] memory allShipments = new Shipment[](shipmentIds.length);
        for (uint i = 0; i < shipmentIds.length; i++) {
            allShipments[i] = shipments[shipmentIds[i]];
        }
        return allShipments;
    }

    function getShipmentsCount(address _sender) public view returns (uint256) {
        return shipmentCounts[_sender];
    }

    function getShipmentsByAddress(address _address) public view returns (Shipment[] memory) {
        uint count = 0;
        for (uint i = 0; i < shipmentIds.length; i++) {
            if (shipments[shipmentIds[i]].sender == _address || shipments[shipmentIds[i]].receiver == _address) {
                count++;
            }
        }

        Shipment[] memory result = new Shipment[](count);
        uint index = 0;
        for (uint i = 0; i < shipmentIds.length; i++) {
            if (shipments[shipmentIds[i]].sender == _address || shipments[shipmentIds[i]].receiver == _address) {
                result[index] = shipments[shipmentIds[i]];
                index++;
            }
        }
        return result;
    }
}
