// import { None } from "@reach-sh/stdlib/dist/types/shared_impl";
import { Component } from "react";
import { loadStdlib } from '@reach-sh/stdlib';
const stdlib = loadStdlib(process.env);

class ClassEvent extends Component {
    //create state for Component
    constructor(){
        super();
        this.state = {
            testState:'Test',
            userOrProjectName:null,
            contractId:null,
            donationAmount:0,
            accountBalance:0,
            projectVotedFor:null,
            schoolProjectShareRation:0,
            roadProjectShareRation:0,
            totalFundsContributed:0,
            contractStartedOrAttached: false,
            schoolProjectFunds:0,
            roadProjectFunds:0,
            userRole:null,
            userOrProjectName:true,
            instructionHeader:'Enter your Username or Project Name',
            // show/hide state properties 
            startOrAttachToContract:true,
            showAccountDefinition:'none',
            enterExistingAccount:'none',
            contributionSection:'none',
            projectVotingSection:'none',
            fundsDistributionAndBalance:'none'
        };
    }

    // helper functions section
    currencyFormater = (x) => stdlib.formatCurrency(x,4) // format to 4 decimal places
    getBalance = async (userAccount) => currencyFormater(await stdlib.balanceOf(userAccount))
    parseAtomicToStandard = (atomicUnits) => atomicUnits/1000000 // function that converts atomice units to standard
    //function that get the balance of funds payed to the contract
    getBalanceContract = async (contractId) => currencyFormater(await stdlib.balanceOf(contractId))
    //function that gets address of the contract
    getContractAddress = async (contactObj) => { return contactObj.getContractAddress() }

    //function that allows a user of start ot attach to a contract
    startOrAttachToContract = () => {
        console.log("Starting contract")
        
        //check if the username is given
        if(this.state.userOrProjectName){
            console.log("Usename is given")
            //check if given name if project or username
            if(this.props.myProps.predefinedUserNames.includes(this.state.userOrProjectName)){
                //set role as contributor
                this.setState({userRole:"Contributor"})
                //now hide the start step and show the create/give existing account step
                this.setState({startOrAttachToContract:'none'})
                this.setState({showAccountDefinition:true})
                this.setState({instructionHeader:"Do you want to create or enter existing account?"})

            }else if(this.props.myProps.predefinedProjects.includes(this.state.userOrProjectName)){
                //set role as project owner
                this.setState({userRole:"Project Owner"})
                //now hide the start step and show the create/give existing account step
                this.setState({startOrAttachToContract:'none'})
                this.setState({showAccountDefinition:true})
                this.setState({instructionHeader:"Do you want to create or enter existing account?"})

            }else{
                //throw and error that the entered name is not yet registered
                alert(`The entered Username / Project Name: "${this.state.userOrProjectName}" is not yet registered`)
            }

            // //check if user wants to create a new account
            // if(this.state.userRole){
            //     //define a course of action whether to creating or fetch existing account
            //     if(this.state.createNewAccount){
            //         // userAccount = await stdlib.newTestAccount(stdlib.parseCurrency(1000))
            //         console.log("User account created.NB(Actual account creation if currently Commented out)")
                    
            //     }else{
            //         alert("This feature is still under development")
            //     }
            // }

            // //define the contract
            // let ctc = null

        }else{
            alert("Please Enter User or Project Name in order to continue")
        }
    }

    handleClick = () => {
        console.log("Class based event handling")
        
    }

    getInputValue = (event)=>{
        // get value enter by user here
        const userValue = event.target.value;
        this.state.userOrProjectName = userValue
    };

    createNewAccount = () => {
        this.setState({showAccountDefinition:'none'})
        this.setState({contributionSection:true})
        this.setState({instructionHeader:"How much would you want to contribute?"})
    }

    enterExistingAccount = () => {
        this.setState({showAccountDefinition:'none'})
        this.setState({enterExistingAccount:true})
    }

    verifyExistingAccount = () => {
        this.setState({enterExistingAccount:'none'})
        this.setState({contributionSection:true})
        this.setState({instructionHeader:"How much would you want to contribute?"})
    }

    confirmContribution = () => {
        this.setState({contributionSection:'none'})
        this.setState({projectVotingSection:true})
        this.setState({instructionHeader:"Vote your favourite project"})
    }

    voteForSchool = () => {
        this.setState({projectVotingSection:'none'})
        this.setState({fundsDistributionAndBalance:true})
        this.setState({instructionHeader:"Thanks for Contributing"})
    }

    voteForRoad = () => {
        this.setState({projectVotingSection:'none'})
        this.setState({fundsDistributionAndBalance:true})
        this.setState({instructionHeader:"Thanks for Contributing"})
    }

    render () {
        return (
            <div>
                <h4 >{this.state.instructionHeader}</h4>
                {/* first step give username/project name */}
                <input style={{display:this.state.startOrAttachToContract}} id="userOrProjectName" type="text" placeholder="Enter User or Project Name" onChange={this.getInputValue}/><br/><br/>
                <button style={{display:this.state.startOrAttachToContract}} onClick={this.startOrAttachToContract}>
                    Confirm
                </button>

                {/* second step choose whether to create or give existing account */}
                <button id="createAccount" onClick={this.createNewAccount} style={{display:this.state.showAccountDefinition}}>
                    Create New Account
                </button> 
                <button id="createAccount" onClick={this.enterExistingAccount}  style={{display:this.state.showAccountDefinition}}>
                    Enter Existing Account
                </button> 

                {/* step 3 enter existing account account */}
                <input id="existingAccount" placeholder="Enter existing account" style={{display:this.state.enterExistingAccount}}/> <br/><br/> 
                <button id="createAccount" onClick={this.verifyExistingAccount}  style={{display:this.state.enterExistingAccount}}>
                    Confirm
                </button>

                {/* step 4 contribution */}
                <input id="existingAccount" placeholder="Amount" style={{display:this.state.contributionSection}} type="number"/> <br/><br/> 
                <button id="createAccount" onClick={this.confirmContribution}  style={{display:this.state.contributionSection}}>
                    Confirm
                </button>

                {/* step 4 project voting section */}
                <div  style={{display:this.state.projectVotingSection}}>
                    <label>1. School Project :</label>
                    <button id="createAccount" onClick={this.voteForSchool}>
                        Vote
                    </button> <br/><br/>
                    <label>2. Road Project :</label>
                    <button id="createAccount" onClick={this.voteForRoad}>
                        Vote
                    </button>
                </div>
               
                {/* Funds distribution section and account balance*/}
                <div style={{display:this.state.fundsDistributionAndBalance}}>
                    <h4>Your Details</h4>
                    <label>You Contributed :</label> <input value= {this.state.donationAmount}/> <br/>
                    <label>You Account Balance is :</label> <input value= {this.state.accountBalance} /> <br/>
                    <label>You Voted For :</label> <input value={this.state.projectVotedFor}/> <br/>
                    <h4>Project Funds Share Ration :</h4> <br/>
                    <label>School Project</label><input value={this.state.schoolProjectShareRation}/> <br/>
                    <label>Road Project</label><input value={this.state.roadProjectShareRation}/> <br/>
                    <label>Total Funds Contributed : </label> <input value={this.state.totalFundsContributed}/> <br/>
                    <label>School Project Got :</label> <input value={this.state.schoolProjectFunds}/> <br/>
                    <label>Road Project Got :</label> <input value={this.state.roadProjectFunds}/> <br/>
                </div>
                
            </div>
        )
    }
}
export default ClassEvent;