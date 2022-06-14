// import { None } from "@reach-sh/stdlib/dist/types/shared_impl";
import { Component } from "react";
import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from '../../build/index.main.mjs';

// const stdlib = loadStdlib(process.env);
const stdlib = loadStdlib("ALGO");
let ctc = null;
const interact = { ...stdlib.hasConsoleLogger }
const userParts = {
    'Prince':backend.Prince,
    'Jazz':backend.Jazz,
    'Kip':backend.Kip,
    // 'School':backend.School,
    // 'Road':backend.Road
}

interact.logFromBackend = async (valueFromBackend) => {
    console.log(`The value of backend ${valueFromBackend}`);
}

interact.informUserOfFundsShare = async (totalFunds,schoolProjectFunds,roadProjectFunds) => {
    console.log("*********************************************Results***********************************************************");
    // console.log(totalFunds)
    // console.log(schoolProjectFunds)
    // console.log(roadProjectFunds)

    console.log(totalFunds);
    console.log(schoolProjectFunds);
    console.log(roadProjectFunds);
}

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
            projectVotedFor:'',
            schoolProjectShareRation:0,
            roadProjectShareRation:0,
            totalFundsContributed:0,
            contractStartedOrAttached: false,
            schoolProjectFunds:0,
            roadProjectFunds:0,
            userRole:null,
            contractRole:null,
            userOrProjectName:true,
            instructionHeader:'Enter your Username or Project Name',
            // show/hide state properties 
            startOrAttachToContract:true,
            showAccountDefinition:'none',
            enterExistingAccount:'none',
            confirmAccount:'none',
            createAttachContractSection:'none',
            contributionSection:'none',
            projectVotingSection:'none',
            fundsDistributionAndBalance:'none',
            contractDetailInputAndConfirmation:'none',
            createOrEnterExistingAccSection:'none',
            contractDetails:null,
            contractDetailsJson:'',
            userAccount:null,
            userAccountaddr:'',
            projectVoteValue:0
        };
    }

    // helper functions section
    currencyFormater = (x) => stdlib.formatCurrency(x,4) // format to 4 decimal places
    getBalance = async (userAccount) => this.currencyFormater(await stdlib.balanceOf(userAccount))
    parseAtomicToStandard = (atomicUnits) => atomicUnits/1000000 // function that converts atomice units to standard
    //function that get the balance of funds payed to the contract
    getBalanceContract = async (contractId) => currencyFormater(await stdlib.balanceOf(contractId))
    //function that gets address of the contract
    getContractAddress = async (contactObj) => { return contactObj.getContractAddress() }

    //function that allows a user of start ot attach to a contract
    startOrAttachToContract = () => {        
        //check if the username is given
        if(this.state.userOrProjectName){
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
        }else{
            alert("Please Enter User or Project Name in order to continue")
        }
    }

    handleClick = () => {

    }

    getInputValue = (event)=>{
        // get value enter by user here
        const userValue = event.target.value;
        this.state.userOrProjectName = userValue
    };

    getInputValue2 = (event)=>{
        // get value enter by user here
        this.state.contractDetailsJson = event.target.value;
    };

    getInputValue3 = (event)=>{
        // get value enter by user here
        const userValue = event.target.value;
        this.state.userAccountaddr = userValue
    };

    //function that binds the contribution amount with donationAmount in state
    getInputValueContribution = (event) =>{
        const userValue = event.target.value;
        this.state.donationAmount = userValue
    }

    getInputprojectVotedFor = (event) => {
        const userValue = event.target.value;
        this.state.projectVotedFor = userValue
    }

    getAccountBalance = (event) => {
        const userValue = event.target.value;
        this.state.accountBalance = userValue
    }

    createNewAccount = async () => {
        let userAccount = await stdlib.newTestAccount(stdlib.parseCurrency(1000))
        this.setState({userAccount:userAccount})
        this.setState({userAccountaddr:userAccount.networkAccount.addr})    
        //now show the confirmation section
        this.setState({confirmAccount:true})
    }

    enterExistingAccount = () => {
        this.setState({confirmAccount:true})
    }

    confirmAccount = () => {
        // check that an account has been added/created
        if(this.state.userAccount != ''){
            this.setState({showAccountDefinition:'none'})
            this.setState({createAttachContractSection:true})
            this.setState({instructionHeader:"Do you want to create or attach to an existing contract?"})
        }else{
            alert("User account has not been defined")
        }
    }

    initiateNewContract = async () => {
        //mark current user as contract initializer
        this.setState({contractRole:"Initiator"})
        ctc = await this.state.userAccount.contract(backend)
        console.log("Contract")
        console.log(ctc)
        this.setState({contractDetailInputAndConfirmation:true})
        //now set state of contract as Pending
        this.setState({contractDetailsJson:"Pending"}) 
    }

    attachToExistingContract = () => {
        //mark current user as contract attacher
        this.setState({contractRole:"Attacher"})
        this.setState({contractDetailInputAndConfirmation:true})
    }

    confirmContractDetails = () => {
        //check the contract details is defined in the state
        if(this.state.contractDetailsJson){
            if(this.state.contractDetailsJson == "Pending"){
                console.log("this is a new contract")
                this.setState({createAttachContractSection:'none'})
                this.setState({contributionSection:true})
                this.setState({instructionHeader:"How much would you want to contribute?"})
            }else{
                //this user wants to attach to an existing contract
                ctc = this.state.userAccount.contract(backend,this.state.contractDetailsJson)
                this.setState({createAttachContractSection:'none'})
                this.setState({contributionSection:true})
                this.setState({instructionHeader:"How much would you want to contribute?"})
            }
        }else{
            alert("The contract detail is undefined")
        }
        
    }

    confirmContribution = () => {
        //check that an amount was given
        if(this.state.donationAmount){
            this.setState({contributionSection:'none'})
            this.setState({projectVotingSection:true})
            this.setState({instructionHeader:"Vote your favourite project"})

        }else{
            alert("Please enter your contibution amount")
        }
    }

    voteForSchool = () => {
        this.setState({projectVoteValue:1})
        this.setState({projectVotedFor:'School Project'})
        this.setState({projectVotingSection:'none'})
        this.setState({fundsDistributionAndBalance:true})
        this.setState({instructionHeader:"Thanks for Contributing"})
        //call the transaction comletion function
        this.completeTransaction(1)
    }

    voteForRoad = () => {
        this.setState({projectVoteValue:2})
        this.setState({projectVotedFor:'Road Project'})
        this.setState({projectVotingSection:'none'})
        this.setState({fundsDistributionAndBalance:true})
        this.setState({instructionHeader:"Thanks for Contributing"})
        //call the transaction comletion function
        this.completeTransaction(2)
    }

    completeTransaction = (projectVoteValue) => {
        console.log("completing transation")
        interact.donationAmt = this.state.donationAmount
        interact.projectVote = projectVoteValue
        let userBackend = userParts[this.state.userOrProjectName]
        console.log("project vote")
        console.log(projectVoteValue)

        userBackend(ctc, interact)
        
        // .then(() => {
        //     console.log("backend resolved")
        // })

        if(this.state.contractRole == "Initiator" ? true:false){
            //show the contract details
            ctc.getInfo().then((contractDetails) => {
                // this.setState({contractDetailsJson:JSON.stringify(contractDetails)});
                this.setState({contractDetailsJson:contractDetails._hex});
                console.log({contractDetailsJson:JSON.stringify(contractDetails)})
                //get user account balance
                let accountBalance = this.getBalance(this.state.userAccount).then((balance) => {
                    this.setState({accountBalance:balance})
                })

                // console.log("funcs share below")
                // console.log(interact.informUserOfFundsShare().then(() => {
                //     console.log("fullfilled")
                // }))
            })
        }else{
            console.log("attacher finishing")
            //get user account balance
            // let accountBalance = this.getBalance(this.state.userAccount).then((balance) => {
            //     this.setState({accountBalance:balance})
            // })
        }
    }

    render () {
        return (
            <div>
                <br/>
                <h3 >{this.state.instructionHeader}</h3>
                {/*step 1: give username/project name */}
                <input style={{display:this.state.startOrAttachToContract}} id="userOrProjectName" type="text" placeholder="Enter User or Project Name" onChange={this.getInputValue}/><br/><br/>
                <button style={{display:this.state.startOrAttachToContract}} onClick={this.startOrAttachToContract} type="button" className="btn btn-primary">
                    Confirm
                </button>

                {/*step 2: choose whether to create or give existing account */}
                <div  style={{display:this.state.showAccountDefinition}}>
                    <button id="createAccount" onClick={this.createNewAccount} type="button" className="btn btn-primary">
                        Create New Account
                    </button>
                    &nbsp;&nbsp;
                    <button onClick={this.enterExistingAccount} type="button" className="btn btn-primary">
                        Enter Existing Account
                    </button> 
                    <br/><br/>
                    <input id="existingAccount" placeholder="User Account" style={{display:this.state.confirmAccount}} value={this.state.userAccountaddr} onChange={this.getInputValue3}/> <br/><br/> 
                    <button onClick={this.confirmAccount}  style={{display:this.state.confirmAccount}} type="button" className="btn btn-primary">
                        Confirm
                    </button>
                </div>

                {/* step 4 create or attach to an existing contract */}
                <div  style={{display:this.state.createAttachContractSection}}>
                    <button onClick={this.initiateNewContract} type="button" className="btn btn-primary">
                        Initiate
                    </button>
                    &nbsp;&nbsp;
                    <button onClick={this.attachToExistingContract} type="button" className="btn btn-primary">
                        Attach
                    </button>
                    <br/><br/>
                    <input 
                        style={{ display:this.state.contractRole == "Initiator" ? true:"none" }} 
                        id="contractDetailInput" placeholder="Enter contract detail" value={this.state.contractDetailsJson} onChange={this.getInputValue2} 
                    />
                    <input 
                        style={{display:this.state.contractRole == "Attacher" ? true:"none" }} 
                        placeholder="Enter contract detail" onChange={this.getInputValue2}
                    />
                    <button style={{display:this.state.contractDetailInputAndConfirmation}} onClick={this.confirmContractDetails} type="button" className="btn btn-primary">
                        Confirm
                    </button>
                </div>

                {/* step 5 contribution */}
                <input id="existingAccount" placeholder="Amount" style={{display:this.state.contributionSection}} type="number" alue={this.state.donationAmount} onChange={this.getInputValueContribution} /> <br/><br/> 
                <button id="createAccount" onClick={this.confirmContribution}  style={{display:this.state.contributionSection}} type="button" className="btn btn-primary" >
                    Confirm
                </button>

                {/* step 6 project voting section */}
                <div  style={{display:this.state.projectVotingSection}}>
                    <label><h3>1. School Project &nbsp;&nbsp;</h3></label>
                    <button id="createAccount" onClick={this.voteForSchool} type="button" className="btn btn-primary">
                        Vote
                    </button> <br/><br/>
                    <label><h3>2. Road Project &nbsp;&nbsp;</h3></label>
                    <button id="createAccount" onClick={this.voteForRoad} type="button" className="btn btn-primary">
                        Vote
                    </button>
                </div>
               
                {/* Funds distribution section and account balance*/}
                <div style={{display:this.state.fundsDistributionAndBalance}}>
                    <div id="detailsDiv">
                        <h4>Your Details</h4>
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                Contract Details
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value= {this.state.contractDetailsJson} onChange={this.getInputValue2}
                            />
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                You Contributed
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value= {this.state.donationAmount} onChange={this.getInputValueContribution}
                            />
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                You Account Balance is
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value= {this.state.accountBalance} onChange={this.getAccountBalance}
                            />
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                You Voted For
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value={this.state.projectVotedFor} onChange={this.getInputprojectVotedFor}
                            />
                        </div>

                        <h4>Quadratic Share Ratio</h4>
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                School Share Ratio
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value={this.state.schoolProjectShareRation} 
                                onChange={this.getInputValue2
                                }
                            />
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                Road Share Ratio
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value={this.state.schoolProjectShareRation} 
                                onChange={this.getInputValue2
                                }
                            />
                        </div>

                        <h4>Funds Share</h4>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                Total Funds Contributed
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value={this.state.schoolProjectShareRation} 
                                onChange={this.getInputValue2
                                }
                            />
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                School Project Funds
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value={this.state.schoolProjectShareRation} 
                                onChange={this.getInputValue2
                                }
                            />
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                Road Project Funds
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value={this.state.schoolProjectShareRation} 
                                onChange={this.getInputValue2
                                }
                            />
                        </div>

                        {/* 
                    <label>School Project</label><input value={this.state.schoolProjectShareRation}/> <br/>
                    <label>Road Project</label><input value={this.state.roadProjectShareRation}/> <br/>
                    <label>Total Funds Contributed : </label> <input value={this.state.totalFundsContributed}/> <br/>
                    <label>School Project Got :</label> <input value={this.state.schoolProjectFunds}/> <br/>
                    <label>Road Project Got :</label> <input value={this.state.roadProjectFunds}/> <br/> */}

                        

                        {/* 
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                Contract Details
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value= {this.state.contractDetailsJson} onChange={this.getInputValue2}
                            />
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                Contract Details
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value= {this.state.contractDetailsJson} onChange={this.getInputValue2}
                            />
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                Contract Details
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value= {this.state.contractDetailsJson} onChange={this.getInputValue2}
                            />
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                Contract Details
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                value= {this.state.contractDetailsJson} onChange={this.getInputValue2}
                            />
                        </div> */}
                    </div>

                </div>
                
            </div>
        )
    }
}
export default ClassEvent;