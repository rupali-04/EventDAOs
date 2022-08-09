
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;





// File: contracts\proposal.sol


pragma solidity ^0.8.7;
import "./NFT.sol";

interface iTimeLockContract{
    function ownerOf(uint256 tokenId) external view returns (address);
    function timeLock(uint256) external view returns (uint256);     //eligible to vote?
    function lockLevel(uint256) external view returns (uint256);    //voting power  0 level -> 1 vote; 1 level -> 2 votes; 2 level -> 3 votes
    function countLockToken() external view returns(uint256);
}

contract proposal{
     address[] public deployedaddress;

    struct CreateProposal{
        address ProposalCreator;
        uint256 startVoteTime;
        uint256 EndVoteTime; 
        uint256 voteCountForProposalInFavour;
        uint256 voteCountForProposalInOppose;
        bool status;   
    }
    address public voteTokenContract;
    address public platformOwner;
    uint256 votePercentage;
    mapping(string=>CreateProposal) public proposalCreated;       //proposalCreated[NFTContractAddressForEvent] 
    mapping(address=>uint256) public voteCountByUser;
    mapping(string => bool) public proposalVoteResult;
    event ProposalCreation(address indexed _proposalCreator, string indexed _eventCreate);
    event voteCastByUser(string indexed _event, address indexed _user, bool indexed _voteStatus);
    event eventVoteResult(string indexed _event, bool  indexed _result);
    event eventTimestamp(uint256 indexed _time);
    constructor(address _voteTokenContract,address _platformOwner){
        voteTokenContract = _voteTokenContract; 
        platformOwner = _platformOwner;       
    } 

    function votePercentageTOpass(uint256 _votePercentage) public{
        require(msg.sender == platformOwner, "you are not platform owner");
        votePercentage = _votePercentage;        
    }
    function createProposal(string calldata _proposalForEvent, uint256 _EndVoteTime) public {
        CreateProposal memory propose = proposalCreated[_proposalForEvent];
        require(!propose.status,"Already Proposed");    
        propose.ProposalCreator = msg.sender;
        propose.startVoteTime = block.timestamp;
        propose.EndVoteTime = _EndVoteTime;
        propose.status = true;
        proposalCreated[_proposalForEvent] = propose;
        emit ProposalCreation(msg.sender,_proposalForEvent);
        emit eventTimestamp(propose.startVoteTime);
    }

    modifier voteParameterChecking(string memory _proposalForEvent,uint256 tokenId){
        address _lockContract = voteTokenContract;
        require(msg.sender == iTimeLockContract(_lockContract).ownerOf(tokenId),"token doesn't belong to you");
        require(iTimeLockContract(_lockContract).timeLock(tokenId)!=0,"not in lock state, can't vote");
        _;
    }
    function voteForProposal(string memory proposalForEvent, uint256 tokenId, bool _voteStatus) public voteParameterChecking(proposalForEvent,tokenId) {
        address _lockContract = voteTokenContract;
        CreateProposal memory propose = proposalCreated[proposalForEvent];
        require(propose.status,"Not Proposed");
        require(propose.startVoteTime<=block.timestamp,"Voting Time not started");
        require(propose.EndVoteTime>block.timestamp,"Voting Time Over");
        uint userLevel = iTimeLockContract(_lockContract).lockLevel(tokenId);
        require(userLevel >= voteCountByUser[msg.sender],"Vote count exceed");
        voteCountByUser[msg.sender] = userLevel + 1;        
        if(_voteStatus){
            propose.voteCountForProposalInFavour = userLevel + 1;
        }
        else{
            propose.voteCountForProposalInOppose = userLevel + 1;
        }
        proposalCreated[proposalForEvent] = propose;
        emit voteCastByUser(proposalForEvent, msg.sender,_voteStatus);
    }

    function withdrawProposal(string memory proposalForEvent) public {
        CreateProposal memory propose = proposalCreated[proposalForEvent];
        require(propose.status,"Not Proposed");
        require(propose.EndVoteTime>block.timestamp,"Can't withdraw, withdraw time is over");  
        require(propose.ProposalCreator == msg.sender,"You are not the creator of the proposal");  
        delete proposalCreated[proposalForEvent];
    }

    function voteResult(string memory proposalForEvent,string memory name,string memory symbol) public {
        CreateProposal memory propose = proposalCreated[proposalForEvent];
        require(propose.status,"Not Proposed");
        require(propose.EndVoteTime<block.timestamp,"Voting time not end"); 
        address _lockContract = voteTokenContract;
        uint _count = iTimeLockContract(_lockContract).countLockToken();            
        uint _favor = propose.voteCountForProposalInFavour;
        uint _oppose = propose.voteCountForProposalInOppose; 
        uint requiredVoteCount = (votePercentage/10000) *_count;    // 4% must vote
        require(requiredVoteCount <= _favor + _oppose,"low vote count");
        if(_favor >= _oppose){
            proposalVoteResult[proposalForEvent] = true;
            NFT newContract = new NFT(name,symbol); // deployment of new contract
            deployedaddress.push(address(newContract)); // helps to get address of our contract
            emit eventVoteResult(proposalForEvent, true);
        }
        else{
            proposalVoteResult[proposalForEvent] = false;
            emit eventVoteResult(proposalForEvent, false);
        }        
    }
}






