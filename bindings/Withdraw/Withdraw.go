// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package withdraw

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
)

// WithdrawMetaData contains all meta data concerning the Withdraw contract.
var WithdrawMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[],\"name\":\"AddressNotAllowed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AlreadyClaimed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AlreadyDealedEpoch\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AlreadyDealedHeight\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AlreadyInitialized\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AlreadyNotifyCycle\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AlreadyVoted\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AmountNotZero\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AmountUnmatch\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AmountZero\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"BalanceNotEnough\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"BlockNotMatch\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CallerNotAllowed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ClaimableAmountZero\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ClaimableDepositZero\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ClaimableRewardZero\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CycleNotMatch\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DepositAmountLTMinAmount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"EthAmountZero\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"FailedToCall\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"FailedToTransfer\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidMerkleProof\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidThreshold\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"LengthNotMatch\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"LsdTokenAmountZero\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NodeAlreadyExist\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NodeAlreadyRemoved\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NodeNotClaimable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotClaimable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFactoryAdmin\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotNetworkAdmin\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPubkeyOwner\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotTrustNode\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ProposalAlreadyExecuted\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"PubkeyAlreadyExist\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"PubkeyNotExist\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"PubkeyStatusUnmatch\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"RateChangeOverLimit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReachCycleWithdrawLimit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReachPubkeyNumberLimit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReachUserWithdrawLimit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"SecondsZero\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"SoloNodeDepositDisabled\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"SubmitBalancesDisable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"TrustNodeDepositDisabled\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UserDepositDisabled\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"VoterNumberOverLimit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"VotersDuplicate\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"VotersNotEnough\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"VotersNotExist\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"WithdrawIndexEmpty\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"WithdrawIndexOver\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"previousAdmin\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"newAdmin\",\"type\":\"address\"}],\"name\":\"AdminChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"beacon\",\"type\":\"address\"}],\"name\":\"BeaconUpgraded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"enumINetworkWithdraw.DistributeType\",\"name\":\"distributeType\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"dealedHeight\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"userAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"nodeAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"platformAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"maxClaimableWithdrawIndex\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"mvAmount\",\"type\":\"uint256\"}],\"name\":\"DistributeRewards\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"time\",\"type\":\"uint256\"}],\"name\":\"EtherDeposited\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"index\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"claimableReward\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"claimableDeposit\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"enumINetworkWithdraw.ClaimType\",\"name\":\"claimType\",\"type\":\"uint8\"}],\"name\":\"NodeClaimed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"withdrawCycle\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"ejectedStartWithdrawCycle\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"ejectedValidators\",\"type\":\"uint256[]\"}],\"name\":\"NotifyValidatorExit\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"dealedEpoch\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"merkleRoot\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"nodeRewardsFileCid\",\"type\":\"string\"}],\"name\":\"SetMerkleRoot\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"userWithdrawLimitPerCycle\",\"type\":\"uint256\"}],\"name\":\"SetUserWithdrawLimitPerCycle\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"cycleSeconds\",\"type\":\"uint256\"}],\"name\":\"SetWithdrawCycleSeconds\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"withdrawLimitPerCycle\",\"type\":\"uint256\"}],\"name\":\"SetWithdrawLimitPerCycle\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"lsdTokenAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"ethAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"withdrawIndex\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"instantly\",\"type\":\"bool\"}],\"name\":\"Unstake\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"implementation\",\"type\":\"address\"}],\"name\":\"Upgraded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"withdrawIndexList\",\"type\":\"uint256[]\"}],\"name\":\"Withdraw\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"currentWithdrawCycle\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"depositEth\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"depositEthAndUpdateTotalMissingAmount\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"enumINetworkWithdraw.DistributeType\",\"name\":\"_distributeType\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"_dealedHeight\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_userAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_nodeAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_platformAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_maxClaimableWithdrawIndex\",\"type\":\"uint256\"}],\"name\":\"distribute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"ejectedStartCycle\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"ejectedValidatorsAtCycle\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"factoryAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"factoryCommissionRate\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"feePoolAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"cycle\",\"type\":\"uint256\"}],\"name\":\"getEjectedValidatorsAtCycle\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"}],\"name\":\"getUnclaimedWithdrawalsOfUser\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_lsdTokenAddress\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_userDepositAddress\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_networkProposalAddress\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_networkBalancesAddress\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_feePoolAddress\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_factoryAddress\",\"type\":\"address\"}],\"name\":\"init\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"initialized\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"latestDistributePriorityFeeHeight\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"latestDistributeWithdrawalsHeight\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"latestMerkleRootEpoch\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"lsdTokenAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"maxClaimableWithdrawIndex\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"merkleRoot\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"networkBalancesAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"networkProposalAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"nextWithdrawIndex\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_index\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_totalRewardAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_totalExitDepositAmount\",\"type\":\"uint256\"},{\"internalType\":\"bytes32[]\",\"name\":\"_merkleProof\",\"type\":\"bytes32[]\"},{\"internalType\":\"enumINetworkWithdraw.ClaimType\",\"name\":\"_claimType\",\"type\":\"uint8\"}],\"name\":\"nodeClaim\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"nodeClaimEnabled\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"nodeCommissionRate\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"nodeRewardsFileCid\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_withdrawCycle\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_ejectedStartCycle\",\"type\":\"uint256\"},{\"internalType\":\"uint256[]\",\"name\":\"_validatorIndexList\",\"type\":\"uint256[]\"}],\"name\":\"notifyValidatorExit\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_recipient\",\"type\":\"address\"}],\"name\":\"platformClaim\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"platformCommissionRate\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"proxiableUUID\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_dealedEpoch\",\"type\":\"uint256\"},{\"internalType\":\"bytes32\",\"name\":\"_merkleRoot\",\"type\":\"bytes32\"},{\"internalType\":\"string\",\"name\":\"_nodeRewardsFileCid\",\"type\":\"string\"}],\"name\":\"setMerkleRoot\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"_value\",\"type\":\"bool\"}],\"name\":\"setNodeClaimEnabled\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_userWithdrawLimitPerCycle\",\"type\":\"uint256\"}],\"name\":\"setUserWithdrawLimitAmountPerCycle\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_withdrawCycleSeconds\",\"type\":\"uint256\"}],\"name\":\"setWithdrawCycleSeconds\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_withdrawLimitPerCycle\",\"type\":\"uint256\"}],\"name\":\"setWithdrawLimitAmountPerCycle\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"totalClaimedDepositOfNode\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"totalClaimedRewardOfNode\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalMissingAmountForWithdraw\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalPlatformClaimedAmount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalPlatformCommission\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"totalWithdrawAmountAtCycle\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_lsdTokenAmount\",\"type\":\"uint256\"}],\"name\":\"unstake\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newImplementation\",\"type\":\"address\"}],\"name\":\"upgradeTo\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newImplementation\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"upgradeToAndCall\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"userDepositAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"userWithdrawAmountAtCycle\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"userWithdrawLimitAmountPerCycle\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256[]\",\"name\":\"_withdrawIndexList\",\"type\":\"uint256[]\"}],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdrawCycleSeconds\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdrawLimitAmountPerCycle\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"withdrawalAtIndex\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"_address\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}]",
}

// WithdrawABI is the input ABI used to generate the binding from.
// Deprecated: Use WithdrawMetaData.ABI instead.
var WithdrawABI = WithdrawMetaData.ABI

// Withdraw is an auto generated Go binding around an Ethereum contract.
type Withdraw struct {
	WithdrawCaller     // Read-only binding to the contract
	WithdrawTransactor // Write-only binding to the contract
	WithdrawFilterer   // Log filterer for contract events
}

// WithdrawCaller is an auto generated read-only Go binding around an Ethereum contract.
type WithdrawCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// WithdrawTransactor is an auto generated write-only Go binding around an Ethereum contract.
type WithdrawTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// WithdrawFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type WithdrawFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// WithdrawSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type WithdrawSession struct {
	Contract     *Withdraw         // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// WithdrawCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type WithdrawCallerSession struct {
	Contract *WithdrawCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts   // Call options to use throughout this session
}

// WithdrawTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type WithdrawTransactorSession struct {
	Contract     *WithdrawTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts   // Transaction auth options to use throughout this session
}

// WithdrawRaw is an auto generated low-level Go binding around an Ethereum contract.
type WithdrawRaw struct {
	Contract *Withdraw // Generic contract binding to access the raw methods on
}

// WithdrawCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type WithdrawCallerRaw struct {
	Contract *WithdrawCaller // Generic read-only contract binding to access the raw methods on
}

// WithdrawTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type WithdrawTransactorRaw struct {
	Contract *WithdrawTransactor // Generic write-only contract binding to access the raw methods on
}

// NewWithdraw creates a new instance of Withdraw, bound to a specific deployed contract.
func NewWithdraw(address common.Address, backend bind.ContractBackend) (*Withdraw, error) {
	contract, err := bindWithdraw(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Withdraw{WithdrawCaller: WithdrawCaller{contract: contract}, WithdrawTransactor: WithdrawTransactor{contract: contract}, WithdrawFilterer: WithdrawFilterer{contract: contract}}, nil
}

// NewWithdrawCaller creates a new read-only instance of Withdraw, bound to a specific deployed contract.
func NewWithdrawCaller(address common.Address, caller bind.ContractCaller) (*WithdrawCaller, error) {
	contract, err := bindWithdraw(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &WithdrawCaller{contract: contract}, nil
}

// NewWithdrawTransactor creates a new write-only instance of Withdraw, bound to a specific deployed contract.
func NewWithdrawTransactor(address common.Address, transactor bind.ContractTransactor) (*WithdrawTransactor, error) {
	contract, err := bindWithdraw(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &WithdrawTransactor{contract: contract}, nil
}

// NewWithdrawFilterer creates a new log filterer instance of Withdraw, bound to a specific deployed contract.
func NewWithdrawFilterer(address common.Address, filterer bind.ContractFilterer) (*WithdrawFilterer, error) {
	contract, err := bindWithdraw(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &WithdrawFilterer{contract: contract}, nil
}

// bindWithdraw binds a generic wrapper to an already deployed contract.
func bindWithdraw(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(WithdrawABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Withdraw *WithdrawRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Withdraw.Contract.WithdrawCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Withdraw *WithdrawRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Withdraw.Contract.WithdrawTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Withdraw *WithdrawRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Withdraw.Contract.WithdrawTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Withdraw *WithdrawCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Withdraw.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Withdraw *WithdrawTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Withdraw.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Withdraw *WithdrawTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Withdraw.Contract.contract.Transact(opts, method, params...)
}

// CurrentWithdrawCycle is a free data retrieval call binding the contract method 0xdb17815b.
//
// Solidity: function currentWithdrawCycle() view returns(uint256)
func (_Withdraw *WithdrawCaller) CurrentWithdrawCycle(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "currentWithdrawCycle")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// CurrentWithdrawCycle is a free data retrieval call binding the contract method 0xdb17815b.
//
// Solidity: function currentWithdrawCycle() view returns(uint256)
func (_Withdraw *WithdrawSession) CurrentWithdrawCycle() (*big.Int, error) {
	return _Withdraw.Contract.CurrentWithdrawCycle(&_Withdraw.CallOpts)
}

// CurrentWithdrawCycle is a free data retrieval call binding the contract method 0xdb17815b.
//
// Solidity: function currentWithdrawCycle() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) CurrentWithdrawCycle() (*big.Int, error) {
	return _Withdraw.Contract.CurrentWithdrawCycle(&_Withdraw.CallOpts)
}

// EjectedStartCycle is a free data retrieval call binding the contract method 0x8a699828.
//
// Solidity: function ejectedStartCycle() view returns(uint256)
func (_Withdraw *WithdrawCaller) EjectedStartCycle(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "ejectedStartCycle")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// EjectedStartCycle is a free data retrieval call binding the contract method 0x8a699828.
//
// Solidity: function ejectedStartCycle() view returns(uint256)
func (_Withdraw *WithdrawSession) EjectedStartCycle() (*big.Int, error) {
	return _Withdraw.Contract.EjectedStartCycle(&_Withdraw.CallOpts)
}

// EjectedStartCycle is a free data retrieval call binding the contract method 0x8a699828.
//
// Solidity: function ejectedStartCycle() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) EjectedStartCycle() (*big.Int, error) {
	return _Withdraw.Contract.EjectedStartCycle(&_Withdraw.CallOpts)
}

// EjectedValidatorsAtCycle is a free data retrieval call binding the contract method 0x261a792d.
//
// Solidity: function ejectedValidatorsAtCycle(uint256 , uint256 ) view returns(uint256)
func (_Withdraw *WithdrawCaller) EjectedValidatorsAtCycle(opts *bind.CallOpts, arg0 *big.Int, arg1 *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "ejectedValidatorsAtCycle", arg0, arg1)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// EjectedValidatorsAtCycle is a free data retrieval call binding the contract method 0x261a792d.
//
// Solidity: function ejectedValidatorsAtCycle(uint256 , uint256 ) view returns(uint256)
func (_Withdraw *WithdrawSession) EjectedValidatorsAtCycle(arg0 *big.Int, arg1 *big.Int) (*big.Int, error) {
	return _Withdraw.Contract.EjectedValidatorsAtCycle(&_Withdraw.CallOpts, arg0, arg1)
}

// EjectedValidatorsAtCycle is a free data retrieval call binding the contract method 0x261a792d.
//
// Solidity: function ejectedValidatorsAtCycle(uint256 , uint256 ) view returns(uint256)
func (_Withdraw *WithdrawCallerSession) EjectedValidatorsAtCycle(arg0 *big.Int, arg1 *big.Int) (*big.Int, error) {
	return _Withdraw.Contract.EjectedValidatorsAtCycle(&_Withdraw.CallOpts, arg0, arg1)
}

// FactoryAddress is a free data retrieval call binding the contract method 0x966dae0e.
//
// Solidity: function factoryAddress() view returns(address)
func (_Withdraw *WithdrawCaller) FactoryAddress(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "factoryAddress")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// FactoryAddress is a free data retrieval call binding the contract method 0x966dae0e.
//
// Solidity: function factoryAddress() view returns(address)
func (_Withdraw *WithdrawSession) FactoryAddress() (common.Address, error) {
	return _Withdraw.Contract.FactoryAddress(&_Withdraw.CallOpts)
}

// FactoryAddress is a free data retrieval call binding the contract method 0x966dae0e.
//
// Solidity: function factoryAddress() view returns(address)
func (_Withdraw *WithdrawCallerSession) FactoryAddress() (common.Address, error) {
	return _Withdraw.Contract.FactoryAddress(&_Withdraw.CallOpts)
}

// FactoryCommissionRate is a free data retrieval call binding the contract method 0xc2156b4b.
//
// Solidity: function factoryCommissionRate() view returns(uint256)
func (_Withdraw *WithdrawCaller) FactoryCommissionRate(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "factoryCommissionRate")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// FactoryCommissionRate is a free data retrieval call binding the contract method 0xc2156b4b.
//
// Solidity: function factoryCommissionRate() view returns(uint256)
func (_Withdraw *WithdrawSession) FactoryCommissionRate() (*big.Int, error) {
	return _Withdraw.Contract.FactoryCommissionRate(&_Withdraw.CallOpts)
}

// FactoryCommissionRate is a free data retrieval call binding the contract method 0xc2156b4b.
//
// Solidity: function factoryCommissionRate() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) FactoryCommissionRate() (*big.Int, error) {
	return _Withdraw.Contract.FactoryCommissionRate(&_Withdraw.CallOpts)
}

// FeePoolAddress is a free data retrieval call binding the contract method 0x4319ebe4.
//
// Solidity: function feePoolAddress() view returns(address)
func (_Withdraw *WithdrawCaller) FeePoolAddress(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "feePoolAddress")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// FeePoolAddress is a free data retrieval call binding the contract method 0x4319ebe4.
//
// Solidity: function feePoolAddress() view returns(address)
func (_Withdraw *WithdrawSession) FeePoolAddress() (common.Address, error) {
	return _Withdraw.Contract.FeePoolAddress(&_Withdraw.CallOpts)
}

// FeePoolAddress is a free data retrieval call binding the contract method 0x4319ebe4.
//
// Solidity: function feePoolAddress() view returns(address)
func (_Withdraw *WithdrawCallerSession) FeePoolAddress() (common.Address, error) {
	return _Withdraw.Contract.FeePoolAddress(&_Withdraw.CallOpts)
}

// GetEjectedValidatorsAtCycle is a free data retrieval call binding the contract method 0x2c0f4166.
//
// Solidity: function getEjectedValidatorsAtCycle(uint256 cycle) view returns(uint256[])
func (_Withdraw *WithdrawCaller) GetEjectedValidatorsAtCycle(opts *bind.CallOpts, cycle *big.Int) ([]*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "getEjectedValidatorsAtCycle", cycle)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// GetEjectedValidatorsAtCycle is a free data retrieval call binding the contract method 0x2c0f4166.
//
// Solidity: function getEjectedValidatorsAtCycle(uint256 cycle) view returns(uint256[])
func (_Withdraw *WithdrawSession) GetEjectedValidatorsAtCycle(cycle *big.Int) ([]*big.Int, error) {
	return _Withdraw.Contract.GetEjectedValidatorsAtCycle(&_Withdraw.CallOpts, cycle)
}

// GetEjectedValidatorsAtCycle is a free data retrieval call binding the contract method 0x2c0f4166.
//
// Solidity: function getEjectedValidatorsAtCycle(uint256 cycle) view returns(uint256[])
func (_Withdraw *WithdrawCallerSession) GetEjectedValidatorsAtCycle(cycle *big.Int) ([]*big.Int, error) {
	return _Withdraw.Contract.GetEjectedValidatorsAtCycle(&_Withdraw.CallOpts, cycle)
}

// GetUnclaimedWithdrawalsOfUser is a free data retrieval call binding the contract method 0xfd6b5a49.
//
// Solidity: function getUnclaimedWithdrawalsOfUser(address user) view returns(uint256[])
func (_Withdraw *WithdrawCaller) GetUnclaimedWithdrawalsOfUser(opts *bind.CallOpts, user common.Address) ([]*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "getUnclaimedWithdrawalsOfUser", user)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// GetUnclaimedWithdrawalsOfUser is a free data retrieval call binding the contract method 0xfd6b5a49.
//
// Solidity: function getUnclaimedWithdrawalsOfUser(address user) view returns(uint256[])
func (_Withdraw *WithdrawSession) GetUnclaimedWithdrawalsOfUser(user common.Address) ([]*big.Int, error) {
	return _Withdraw.Contract.GetUnclaimedWithdrawalsOfUser(&_Withdraw.CallOpts, user)
}

// GetUnclaimedWithdrawalsOfUser is a free data retrieval call binding the contract method 0xfd6b5a49.
//
// Solidity: function getUnclaimedWithdrawalsOfUser(address user) view returns(uint256[])
func (_Withdraw *WithdrawCallerSession) GetUnclaimedWithdrawalsOfUser(user common.Address) ([]*big.Int, error) {
	return _Withdraw.Contract.GetUnclaimedWithdrawalsOfUser(&_Withdraw.CallOpts, user)
}

// Initialized is a free data retrieval call binding the contract method 0x158ef93e.
//
// Solidity: function initialized() view returns(bool)
func (_Withdraw *WithdrawCaller) Initialized(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "initialized")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// Initialized is a free data retrieval call binding the contract method 0x158ef93e.
//
// Solidity: function initialized() view returns(bool)
func (_Withdraw *WithdrawSession) Initialized() (bool, error) {
	return _Withdraw.Contract.Initialized(&_Withdraw.CallOpts)
}

// Initialized is a free data retrieval call binding the contract method 0x158ef93e.
//
// Solidity: function initialized() view returns(bool)
func (_Withdraw *WithdrawCallerSession) Initialized() (bool, error) {
	return _Withdraw.Contract.Initialized(&_Withdraw.CallOpts)
}

// LatestDistributePriorityFeeHeight is a free data retrieval call binding the contract method 0x4dff8430.
//
// Solidity: function latestDistributePriorityFeeHeight() view returns(uint256)
func (_Withdraw *WithdrawCaller) LatestDistributePriorityFeeHeight(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "latestDistributePriorityFeeHeight")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// LatestDistributePriorityFeeHeight is a free data retrieval call binding the contract method 0x4dff8430.
//
// Solidity: function latestDistributePriorityFeeHeight() view returns(uint256)
func (_Withdraw *WithdrawSession) LatestDistributePriorityFeeHeight() (*big.Int, error) {
	return _Withdraw.Contract.LatestDistributePriorityFeeHeight(&_Withdraw.CallOpts)
}

// LatestDistributePriorityFeeHeight is a free data retrieval call binding the contract method 0x4dff8430.
//
// Solidity: function latestDistributePriorityFeeHeight() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) LatestDistributePriorityFeeHeight() (*big.Int, error) {
	return _Withdraw.Contract.LatestDistributePriorityFeeHeight(&_Withdraw.CallOpts)
}

// LatestDistributeWithdrawalsHeight is a free data retrieval call binding the contract method 0x9fa1f5ba.
//
// Solidity: function latestDistributeWithdrawalsHeight() view returns(uint256)
func (_Withdraw *WithdrawCaller) LatestDistributeWithdrawalsHeight(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "latestDistributeWithdrawalsHeight")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// LatestDistributeWithdrawalsHeight is a free data retrieval call binding the contract method 0x9fa1f5ba.
//
// Solidity: function latestDistributeWithdrawalsHeight() view returns(uint256)
func (_Withdraw *WithdrawSession) LatestDistributeWithdrawalsHeight() (*big.Int, error) {
	return _Withdraw.Contract.LatestDistributeWithdrawalsHeight(&_Withdraw.CallOpts)
}

// LatestDistributeWithdrawalsHeight is a free data retrieval call binding the contract method 0x9fa1f5ba.
//
// Solidity: function latestDistributeWithdrawalsHeight() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) LatestDistributeWithdrawalsHeight() (*big.Int, error) {
	return _Withdraw.Contract.LatestDistributeWithdrawalsHeight(&_Withdraw.CallOpts)
}

// LatestMerkleRootEpoch is a free data retrieval call binding the contract method 0xb5ca7410.
//
// Solidity: function latestMerkleRootEpoch() view returns(uint256)
func (_Withdraw *WithdrawCaller) LatestMerkleRootEpoch(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "latestMerkleRootEpoch")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// LatestMerkleRootEpoch is a free data retrieval call binding the contract method 0xb5ca7410.
//
// Solidity: function latestMerkleRootEpoch() view returns(uint256)
func (_Withdraw *WithdrawSession) LatestMerkleRootEpoch() (*big.Int, error) {
	return _Withdraw.Contract.LatestMerkleRootEpoch(&_Withdraw.CallOpts)
}

// LatestMerkleRootEpoch is a free data retrieval call binding the contract method 0xb5ca7410.
//
// Solidity: function latestMerkleRootEpoch() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) LatestMerkleRootEpoch() (*big.Int, error) {
	return _Withdraw.Contract.LatestMerkleRootEpoch(&_Withdraw.CallOpts)
}

// LsdTokenAddress is a free data retrieval call binding the contract method 0x87505b9d.
//
// Solidity: function lsdTokenAddress() view returns(address)
func (_Withdraw *WithdrawCaller) LsdTokenAddress(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "lsdTokenAddress")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// LsdTokenAddress is a free data retrieval call binding the contract method 0x87505b9d.
//
// Solidity: function lsdTokenAddress() view returns(address)
func (_Withdraw *WithdrawSession) LsdTokenAddress() (common.Address, error) {
	return _Withdraw.Contract.LsdTokenAddress(&_Withdraw.CallOpts)
}

// LsdTokenAddress is a free data retrieval call binding the contract method 0x87505b9d.
//
// Solidity: function lsdTokenAddress() view returns(address)
func (_Withdraw *WithdrawCallerSession) LsdTokenAddress() (common.Address, error) {
	return _Withdraw.Contract.LsdTokenAddress(&_Withdraw.CallOpts)
}

// MaxClaimableWithdrawIndex is a free data retrieval call binding the contract method 0x0a64041b.
//
// Solidity: function maxClaimableWithdrawIndex() view returns(uint256)
func (_Withdraw *WithdrawCaller) MaxClaimableWithdrawIndex(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "maxClaimableWithdrawIndex")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// MaxClaimableWithdrawIndex is a free data retrieval call binding the contract method 0x0a64041b.
//
// Solidity: function maxClaimableWithdrawIndex() view returns(uint256)
func (_Withdraw *WithdrawSession) MaxClaimableWithdrawIndex() (*big.Int, error) {
	return _Withdraw.Contract.MaxClaimableWithdrawIndex(&_Withdraw.CallOpts)
}

// MaxClaimableWithdrawIndex is a free data retrieval call binding the contract method 0x0a64041b.
//
// Solidity: function maxClaimableWithdrawIndex() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) MaxClaimableWithdrawIndex() (*big.Int, error) {
	return _Withdraw.Contract.MaxClaimableWithdrawIndex(&_Withdraw.CallOpts)
}

// MerkleRoot is a free data retrieval call binding the contract method 0x2eb4a7ab.
//
// Solidity: function merkleRoot() view returns(bytes32)
func (_Withdraw *WithdrawCaller) MerkleRoot(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "merkleRoot")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// MerkleRoot is a free data retrieval call binding the contract method 0x2eb4a7ab.
//
// Solidity: function merkleRoot() view returns(bytes32)
func (_Withdraw *WithdrawSession) MerkleRoot() ([32]byte, error) {
	return _Withdraw.Contract.MerkleRoot(&_Withdraw.CallOpts)
}

// MerkleRoot is a free data retrieval call binding the contract method 0x2eb4a7ab.
//
// Solidity: function merkleRoot() view returns(bytes32)
func (_Withdraw *WithdrawCallerSession) MerkleRoot() ([32]byte, error) {
	return _Withdraw.Contract.MerkleRoot(&_Withdraw.CallOpts)
}

// NetworkBalancesAddress is a free data retrieval call binding the contract method 0x38fcf092.
//
// Solidity: function networkBalancesAddress() view returns(address)
func (_Withdraw *WithdrawCaller) NetworkBalancesAddress(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "networkBalancesAddress")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// NetworkBalancesAddress is a free data retrieval call binding the contract method 0x38fcf092.
//
// Solidity: function networkBalancesAddress() view returns(address)
func (_Withdraw *WithdrawSession) NetworkBalancesAddress() (common.Address, error) {
	return _Withdraw.Contract.NetworkBalancesAddress(&_Withdraw.CallOpts)
}

// NetworkBalancesAddress is a free data retrieval call binding the contract method 0x38fcf092.
//
// Solidity: function networkBalancesAddress() view returns(address)
func (_Withdraw *WithdrawCallerSession) NetworkBalancesAddress() (common.Address, error) {
	return _Withdraw.Contract.NetworkBalancesAddress(&_Withdraw.CallOpts)
}

// NetworkProposalAddress is a free data retrieval call binding the contract method 0xb4701c09.
//
// Solidity: function networkProposalAddress() view returns(address)
func (_Withdraw *WithdrawCaller) NetworkProposalAddress(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "networkProposalAddress")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// NetworkProposalAddress is a free data retrieval call binding the contract method 0xb4701c09.
//
// Solidity: function networkProposalAddress() view returns(address)
func (_Withdraw *WithdrawSession) NetworkProposalAddress() (common.Address, error) {
	return _Withdraw.Contract.NetworkProposalAddress(&_Withdraw.CallOpts)
}

// NetworkProposalAddress is a free data retrieval call binding the contract method 0xb4701c09.
//
// Solidity: function networkProposalAddress() view returns(address)
func (_Withdraw *WithdrawCallerSession) NetworkProposalAddress() (common.Address, error) {
	return _Withdraw.Contract.NetworkProposalAddress(&_Withdraw.CallOpts)
}

// NextWithdrawIndex is a free data retrieval call binding the contract method 0x7e4dc15c.
//
// Solidity: function nextWithdrawIndex() view returns(uint256)
func (_Withdraw *WithdrawCaller) NextWithdrawIndex(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "nextWithdrawIndex")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// NextWithdrawIndex is a free data retrieval call binding the contract method 0x7e4dc15c.
//
// Solidity: function nextWithdrawIndex() view returns(uint256)
func (_Withdraw *WithdrawSession) NextWithdrawIndex() (*big.Int, error) {
	return _Withdraw.Contract.NextWithdrawIndex(&_Withdraw.CallOpts)
}

// NextWithdrawIndex is a free data retrieval call binding the contract method 0x7e4dc15c.
//
// Solidity: function nextWithdrawIndex() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) NextWithdrawIndex() (*big.Int, error) {
	return _Withdraw.Contract.NextWithdrawIndex(&_Withdraw.CallOpts)
}

// NodeClaimEnabled is a free data retrieval call binding the contract method 0xd3638c7e.
//
// Solidity: function nodeClaimEnabled() view returns(bool)
func (_Withdraw *WithdrawCaller) NodeClaimEnabled(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "nodeClaimEnabled")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// NodeClaimEnabled is a free data retrieval call binding the contract method 0xd3638c7e.
//
// Solidity: function nodeClaimEnabled() view returns(bool)
func (_Withdraw *WithdrawSession) NodeClaimEnabled() (bool, error) {
	return _Withdraw.Contract.NodeClaimEnabled(&_Withdraw.CallOpts)
}

// NodeClaimEnabled is a free data retrieval call binding the contract method 0xd3638c7e.
//
// Solidity: function nodeClaimEnabled() view returns(bool)
func (_Withdraw *WithdrawCallerSession) NodeClaimEnabled() (bool, error) {
	return _Withdraw.Contract.NodeClaimEnabled(&_Withdraw.CallOpts)
}

// NodeCommissionRate is a free data retrieval call binding the contract method 0x4636e4e5.
//
// Solidity: function nodeCommissionRate() view returns(uint256)
func (_Withdraw *WithdrawCaller) NodeCommissionRate(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "nodeCommissionRate")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// NodeCommissionRate is a free data retrieval call binding the contract method 0x4636e4e5.
//
// Solidity: function nodeCommissionRate() view returns(uint256)
func (_Withdraw *WithdrawSession) NodeCommissionRate() (*big.Int, error) {
	return _Withdraw.Contract.NodeCommissionRate(&_Withdraw.CallOpts)
}

// NodeCommissionRate is a free data retrieval call binding the contract method 0x4636e4e5.
//
// Solidity: function nodeCommissionRate() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) NodeCommissionRate() (*big.Int, error) {
	return _Withdraw.Contract.NodeCommissionRate(&_Withdraw.CallOpts)
}

// NodeRewardsFileCid is a free data retrieval call binding the contract method 0xd57dc824.
//
// Solidity: function nodeRewardsFileCid() view returns(string)
func (_Withdraw *WithdrawCaller) NodeRewardsFileCid(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "nodeRewardsFileCid")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// NodeRewardsFileCid is a free data retrieval call binding the contract method 0xd57dc824.
//
// Solidity: function nodeRewardsFileCid() view returns(string)
func (_Withdraw *WithdrawSession) NodeRewardsFileCid() (string, error) {
	return _Withdraw.Contract.NodeRewardsFileCid(&_Withdraw.CallOpts)
}

// NodeRewardsFileCid is a free data retrieval call binding the contract method 0xd57dc824.
//
// Solidity: function nodeRewardsFileCid() view returns(string)
func (_Withdraw *WithdrawCallerSession) NodeRewardsFileCid() (string, error) {
	return _Withdraw.Contract.NodeRewardsFileCid(&_Withdraw.CallOpts)
}

// PlatformCommissionRate is a free data retrieval call binding the contract method 0x1da4dd0d.
//
// Solidity: function platformCommissionRate() view returns(uint256)
func (_Withdraw *WithdrawCaller) PlatformCommissionRate(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "platformCommissionRate")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// PlatformCommissionRate is a free data retrieval call binding the contract method 0x1da4dd0d.
//
// Solidity: function platformCommissionRate() view returns(uint256)
func (_Withdraw *WithdrawSession) PlatformCommissionRate() (*big.Int, error) {
	return _Withdraw.Contract.PlatformCommissionRate(&_Withdraw.CallOpts)
}

// PlatformCommissionRate is a free data retrieval call binding the contract method 0x1da4dd0d.
//
// Solidity: function platformCommissionRate() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) PlatformCommissionRate() (*big.Int, error) {
	return _Withdraw.Contract.PlatformCommissionRate(&_Withdraw.CallOpts)
}

// ProxiableUUID is a free data retrieval call binding the contract method 0x52d1902d.
//
// Solidity: function proxiableUUID() view returns(bytes32)
func (_Withdraw *WithdrawCaller) ProxiableUUID(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "proxiableUUID")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// ProxiableUUID is a free data retrieval call binding the contract method 0x52d1902d.
//
// Solidity: function proxiableUUID() view returns(bytes32)
func (_Withdraw *WithdrawSession) ProxiableUUID() ([32]byte, error) {
	return _Withdraw.Contract.ProxiableUUID(&_Withdraw.CallOpts)
}

// ProxiableUUID is a free data retrieval call binding the contract method 0x52d1902d.
//
// Solidity: function proxiableUUID() view returns(bytes32)
func (_Withdraw *WithdrawCallerSession) ProxiableUUID() ([32]byte, error) {
	return _Withdraw.Contract.ProxiableUUID(&_Withdraw.CallOpts)
}

// TotalClaimedDepositOfNode is a free data retrieval call binding the contract method 0x6c570dc1.
//
// Solidity: function totalClaimedDepositOfNode(address ) view returns(uint256)
func (_Withdraw *WithdrawCaller) TotalClaimedDepositOfNode(opts *bind.CallOpts, arg0 common.Address) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "totalClaimedDepositOfNode", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalClaimedDepositOfNode is a free data retrieval call binding the contract method 0x6c570dc1.
//
// Solidity: function totalClaimedDepositOfNode(address ) view returns(uint256)
func (_Withdraw *WithdrawSession) TotalClaimedDepositOfNode(arg0 common.Address) (*big.Int, error) {
	return _Withdraw.Contract.TotalClaimedDepositOfNode(&_Withdraw.CallOpts, arg0)
}

// TotalClaimedDepositOfNode is a free data retrieval call binding the contract method 0x6c570dc1.
//
// Solidity: function totalClaimedDepositOfNode(address ) view returns(uint256)
func (_Withdraw *WithdrawCallerSession) TotalClaimedDepositOfNode(arg0 common.Address) (*big.Int, error) {
	return _Withdraw.Contract.TotalClaimedDepositOfNode(&_Withdraw.CallOpts, arg0)
}

// TotalClaimedRewardOfNode is a free data retrieval call binding the contract method 0xbb2d840c.
//
// Solidity: function totalClaimedRewardOfNode(address ) view returns(uint256)
func (_Withdraw *WithdrawCaller) TotalClaimedRewardOfNode(opts *bind.CallOpts, arg0 common.Address) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "totalClaimedRewardOfNode", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalClaimedRewardOfNode is a free data retrieval call binding the contract method 0xbb2d840c.
//
// Solidity: function totalClaimedRewardOfNode(address ) view returns(uint256)
func (_Withdraw *WithdrawSession) TotalClaimedRewardOfNode(arg0 common.Address) (*big.Int, error) {
	return _Withdraw.Contract.TotalClaimedRewardOfNode(&_Withdraw.CallOpts, arg0)
}

// TotalClaimedRewardOfNode is a free data retrieval call binding the contract method 0xbb2d840c.
//
// Solidity: function totalClaimedRewardOfNode(address ) view returns(uint256)
func (_Withdraw *WithdrawCallerSession) TotalClaimedRewardOfNode(arg0 common.Address) (*big.Int, error) {
	return _Withdraw.Contract.TotalClaimedRewardOfNode(&_Withdraw.CallOpts, arg0)
}

// TotalMissingAmountForWithdraw is a free data retrieval call binding the contract method 0x3c677dbe.
//
// Solidity: function totalMissingAmountForWithdraw() view returns(uint256)
func (_Withdraw *WithdrawCaller) TotalMissingAmountForWithdraw(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "totalMissingAmountForWithdraw")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalMissingAmountForWithdraw is a free data retrieval call binding the contract method 0x3c677dbe.
//
// Solidity: function totalMissingAmountForWithdraw() view returns(uint256)
func (_Withdraw *WithdrawSession) TotalMissingAmountForWithdraw() (*big.Int, error) {
	return _Withdraw.Contract.TotalMissingAmountForWithdraw(&_Withdraw.CallOpts)
}

// TotalMissingAmountForWithdraw is a free data retrieval call binding the contract method 0x3c677dbe.
//
// Solidity: function totalMissingAmountForWithdraw() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) TotalMissingAmountForWithdraw() (*big.Int, error) {
	return _Withdraw.Contract.TotalMissingAmountForWithdraw(&_Withdraw.CallOpts)
}

// TotalPlatformClaimedAmount is a free data retrieval call binding the contract method 0xb3594059.
//
// Solidity: function totalPlatformClaimedAmount() view returns(uint256)
func (_Withdraw *WithdrawCaller) TotalPlatformClaimedAmount(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "totalPlatformClaimedAmount")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalPlatformClaimedAmount is a free data retrieval call binding the contract method 0xb3594059.
//
// Solidity: function totalPlatformClaimedAmount() view returns(uint256)
func (_Withdraw *WithdrawSession) TotalPlatformClaimedAmount() (*big.Int, error) {
	return _Withdraw.Contract.TotalPlatformClaimedAmount(&_Withdraw.CallOpts)
}

// TotalPlatformClaimedAmount is a free data retrieval call binding the contract method 0xb3594059.
//
// Solidity: function totalPlatformClaimedAmount() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) TotalPlatformClaimedAmount() (*big.Int, error) {
	return _Withdraw.Contract.TotalPlatformClaimedAmount(&_Withdraw.CallOpts)
}

// TotalPlatformCommission is a free data retrieval call binding the contract method 0xfef25c0d.
//
// Solidity: function totalPlatformCommission() view returns(uint256)
func (_Withdraw *WithdrawCaller) TotalPlatformCommission(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "totalPlatformCommission")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalPlatformCommission is a free data retrieval call binding the contract method 0xfef25c0d.
//
// Solidity: function totalPlatformCommission() view returns(uint256)
func (_Withdraw *WithdrawSession) TotalPlatformCommission() (*big.Int, error) {
	return _Withdraw.Contract.TotalPlatformCommission(&_Withdraw.CallOpts)
}

// TotalPlatformCommission is a free data retrieval call binding the contract method 0xfef25c0d.
//
// Solidity: function totalPlatformCommission() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) TotalPlatformCommission() (*big.Int, error) {
	return _Withdraw.Contract.TotalPlatformCommission(&_Withdraw.CallOpts)
}

// TotalWithdrawAmountAtCycle is a free data retrieval call binding the contract method 0x8a726d78.
//
// Solidity: function totalWithdrawAmountAtCycle(uint256 ) view returns(uint256)
func (_Withdraw *WithdrawCaller) TotalWithdrawAmountAtCycle(opts *bind.CallOpts, arg0 *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "totalWithdrawAmountAtCycle", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalWithdrawAmountAtCycle is a free data retrieval call binding the contract method 0x8a726d78.
//
// Solidity: function totalWithdrawAmountAtCycle(uint256 ) view returns(uint256)
func (_Withdraw *WithdrawSession) TotalWithdrawAmountAtCycle(arg0 *big.Int) (*big.Int, error) {
	return _Withdraw.Contract.TotalWithdrawAmountAtCycle(&_Withdraw.CallOpts, arg0)
}

// TotalWithdrawAmountAtCycle is a free data retrieval call binding the contract method 0x8a726d78.
//
// Solidity: function totalWithdrawAmountAtCycle(uint256 ) view returns(uint256)
func (_Withdraw *WithdrawCallerSession) TotalWithdrawAmountAtCycle(arg0 *big.Int) (*big.Int, error) {
	return _Withdraw.Contract.TotalWithdrawAmountAtCycle(&_Withdraw.CallOpts, arg0)
}

// UserDepositAddress is a free data retrieval call binding the contract method 0x46773830.
//
// Solidity: function userDepositAddress() view returns(address)
func (_Withdraw *WithdrawCaller) UserDepositAddress(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "userDepositAddress")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// UserDepositAddress is a free data retrieval call binding the contract method 0x46773830.
//
// Solidity: function userDepositAddress() view returns(address)
func (_Withdraw *WithdrawSession) UserDepositAddress() (common.Address, error) {
	return _Withdraw.Contract.UserDepositAddress(&_Withdraw.CallOpts)
}

// UserDepositAddress is a free data retrieval call binding the contract method 0x46773830.
//
// Solidity: function userDepositAddress() view returns(address)
func (_Withdraw *WithdrawCallerSession) UserDepositAddress() (common.Address, error) {
	return _Withdraw.Contract.UserDepositAddress(&_Withdraw.CallOpts)
}

// UserWithdrawAmountAtCycle is a free data retrieval call binding the contract method 0xf5ff612d.
//
// Solidity: function userWithdrawAmountAtCycle(address , uint256 ) view returns(uint256)
func (_Withdraw *WithdrawCaller) UserWithdrawAmountAtCycle(opts *bind.CallOpts, arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "userWithdrawAmountAtCycle", arg0, arg1)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// UserWithdrawAmountAtCycle is a free data retrieval call binding the contract method 0xf5ff612d.
//
// Solidity: function userWithdrawAmountAtCycle(address , uint256 ) view returns(uint256)
func (_Withdraw *WithdrawSession) UserWithdrawAmountAtCycle(arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	return _Withdraw.Contract.UserWithdrawAmountAtCycle(&_Withdraw.CallOpts, arg0, arg1)
}

// UserWithdrawAmountAtCycle is a free data retrieval call binding the contract method 0xf5ff612d.
//
// Solidity: function userWithdrawAmountAtCycle(address , uint256 ) view returns(uint256)
func (_Withdraw *WithdrawCallerSession) UserWithdrawAmountAtCycle(arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	return _Withdraw.Contract.UserWithdrawAmountAtCycle(&_Withdraw.CallOpts, arg0, arg1)
}

// UserWithdrawLimitAmountPerCycle is a free data retrieval call binding the contract method 0xc2942579.
//
// Solidity: function userWithdrawLimitAmountPerCycle() view returns(uint256)
func (_Withdraw *WithdrawCaller) UserWithdrawLimitAmountPerCycle(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "userWithdrawLimitAmountPerCycle")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// UserWithdrawLimitAmountPerCycle is a free data retrieval call binding the contract method 0xc2942579.
//
// Solidity: function userWithdrawLimitAmountPerCycle() view returns(uint256)
func (_Withdraw *WithdrawSession) UserWithdrawLimitAmountPerCycle() (*big.Int, error) {
	return _Withdraw.Contract.UserWithdrawLimitAmountPerCycle(&_Withdraw.CallOpts)
}

// UserWithdrawLimitAmountPerCycle is a free data retrieval call binding the contract method 0xc2942579.
//
// Solidity: function userWithdrawLimitAmountPerCycle() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) UserWithdrawLimitAmountPerCycle() (*big.Int, error) {
	return _Withdraw.Contract.UserWithdrawLimitAmountPerCycle(&_Withdraw.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(uint8)
func (_Withdraw *WithdrawCaller) Version(opts *bind.CallOpts) (uint8, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "version")

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(uint8)
func (_Withdraw *WithdrawSession) Version() (uint8, error) {
	return _Withdraw.Contract.Version(&_Withdraw.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(uint8)
func (_Withdraw *WithdrawCallerSession) Version() (uint8, error) {
	return _Withdraw.Contract.Version(&_Withdraw.CallOpts)
}

// WithdrawCycleSeconds is a free data retrieval call binding the contract method 0x4a4b061b.
//
// Solidity: function withdrawCycleSeconds() view returns(uint256)
func (_Withdraw *WithdrawCaller) WithdrawCycleSeconds(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "withdrawCycleSeconds")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// WithdrawCycleSeconds is a free data retrieval call binding the contract method 0x4a4b061b.
//
// Solidity: function withdrawCycleSeconds() view returns(uint256)
func (_Withdraw *WithdrawSession) WithdrawCycleSeconds() (*big.Int, error) {
	return _Withdraw.Contract.WithdrawCycleSeconds(&_Withdraw.CallOpts)
}

// WithdrawCycleSeconds is a free data retrieval call binding the contract method 0x4a4b061b.
//
// Solidity: function withdrawCycleSeconds() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) WithdrawCycleSeconds() (*big.Int, error) {
	return _Withdraw.Contract.WithdrawCycleSeconds(&_Withdraw.CallOpts)
}

// WithdrawLimitAmountPerCycle is a free data retrieval call binding the contract method 0xdfbb4b72.
//
// Solidity: function withdrawLimitAmountPerCycle() view returns(uint256)
func (_Withdraw *WithdrawCaller) WithdrawLimitAmountPerCycle(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "withdrawLimitAmountPerCycle")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// WithdrawLimitAmountPerCycle is a free data retrieval call binding the contract method 0xdfbb4b72.
//
// Solidity: function withdrawLimitAmountPerCycle() view returns(uint256)
func (_Withdraw *WithdrawSession) WithdrawLimitAmountPerCycle() (*big.Int, error) {
	return _Withdraw.Contract.WithdrawLimitAmountPerCycle(&_Withdraw.CallOpts)
}

// WithdrawLimitAmountPerCycle is a free data retrieval call binding the contract method 0xdfbb4b72.
//
// Solidity: function withdrawLimitAmountPerCycle() view returns(uint256)
func (_Withdraw *WithdrawCallerSession) WithdrawLimitAmountPerCycle() (*big.Int, error) {
	return _Withdraw.Contract.WithdrawLimitAmountPerCycle(&_Withdraw.CallOpts)
}

// WithdrawalAtIndex is a free data retrieval call binding the contract method 0xa8e1b8ef.
//
// Solidity: function withdrawalAtIndex(uint256 ) view returns(address _address, uint256 _amount)
func (_Withdraw *WithdrawCaller) WithdrawalAtIndex(opts *bind.CallOpts, arg0 *big.Int) (struct {
	Address common.Address
	Amount  *big.Int
}, error) {
	var out []interface{}
	err := _Withdraw.contract.Call(opts, &out, "withdrawalAtIndex", arg0)

	outstruct := new(struct {
		Address common.Address
		Amount  *big.Int
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Address = *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	outstruct.Amount = *abi.ConvertType(out[1], new(*big.Int)).(**big.Int)

	return *outstruct, err

}

// WithdrawalAtIndex is a free data retrieval call binding the contract method 0xa8e1b8ef.
//
// Solidity: function withdrawalAtIndex(uint256 ) view returns(address _address, uint256 _amount)
func (_Withdraw *WithdrawSession) WithdrawalAtIndex(arg0 *big.Int) (struct {
	Address common.Address
	Amount  *big.Int
}, error) {
	return _Withdraw.Contract.WithdrawalAtIndex(&_Withdraw.CallOpts, arg0)
}

// WithdrawalAtIndex is a free data retrieval call binding the contract method 0xa8e1b8ef.
//
// Solidity: function withdrawalAtIndex(uint256 ) view returns(address _address, uint256 _amount)
func (_Withdraw *WithdrawCallerSession) WithdrawalAtIndex(arg0 *big.Int) (struct {
	Address common.Address
	Amount  *big.Int
}, error) {
	return _Withdraw.Contract.WithdrawalAtIndex(&_Withdraw.CallOpts, arg0)
}

// DepositEth is a paid mutator transaction binding the contract method 0x439370b1.
//
// Solidity: function depositEth() payable returns()
func (_Withdraw *WithdrawTransactor) DepositEth(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "depositEth")
}

// DepositEth is a paid mutator transaction binding the contract method 0x439370b1.
//
// Solidity: function depositEth() payable returns()
func (_Withdraw *WithdrawSession) DepositEth() (*types.Transaction, error) {
	return _Withdraw.Contract.DepositEth(&_Withdraw.TransactOpts)
}

// DepositEth is a paid mutator transaction binding the contract method 0x439370b1.
//
// Solidity: function depositEth() payable returns()
func (_Withdraw *WithdrawTransactorSession) DepositEth() (*types.Transaction, error) {
	return _Withdraw.Contract.DepositEth(&_Withdraw.TransactOpts)
}

// DepositEthAndUpdateTotalMissingAmount is a paid mutator transaction binding the contract method 0x9d2f846e.
//
// Solidity: function depositEthAndUpdateTotalMissingAmount() payable returns()
func (_Withdraw *WithdrawTransactor) DepositEthAndUpdateTotalMissingAmount(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "depositEthAndUpdateTotalMissingAmount")
}

// DepositEthAndUpdateTotalMissingAmount is a paid mutator transaction binding the contract method 0x9d2f846e.
//
// Solidity: function depositEthAndUpdateTotalMissingAmount() payable returns()
func (_Withdraw *WithdrawSession) DepositEthAndUpdateTotalMissingAmount() (*types.Transaction, error) {
	return _Withdraw.Contract.DepositEthAndUpdateTotalMissingAmount(&_Withdraw.TransactOpts)
}

// DepositEthAndUpdateTotalMissingAmount is a paid mutator transaction binding the contract method 0x9d2f846e.
//
// Solidity: function depositEthAndUpdateTotalMissingAmount() payable returns()
func (_Withdraw *WithdrawTransactorSession) DepositEthAndUpdateTotalMissingAmount() (*types.Transaction, error) {
	return _Withdraw.Contract.DepositEthAndUpdateTotalMissingAmount(&_Withdraw.TransactOpts)
}

// Distribute is a paid mutator transaction binding the contract method 0xc980ba89.
//
// Solidity: function distribute(uint8 _distributeType, uint256 _dealedHeight, uint256 _userAmount, uint256 _nodeAmount, uint256 _platformAmount, uint256 _maxClaimableWithdrawIndex) returns()
func (_Withdraw *WithdrawTransactor) Distribute(opts *bind.TransactOpts, _distributeType uint8, _dealedHeight *big.Int, _userAmount *big.Int, _nodeAmount *big.Int, _platformAmount *big.Int, _maxClaimableWithdrawIndex *big.Int) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "distribute", _distributeType, _dealedHeight, _userAmount, _nodeAmount, _platformAmount, _maxClaimableWithdrawIndex)
}

// Distribute is a paid mutator transaction binding the contract method 0xc980ba89.
//
// Solidity: function distribute(uint8 _distributeType, uint256 _dealedHeight, uint256 _userAmount, uint256 _nodeAmount, uint256 _platformAmount, uint256 _maxClaimableWithdrawIndex) returns()
func (_Withdraw *WithdrawSession) Distribute(_distributeType uint8, _dealedHeight *big.Int, _userAmount *big.Int, _nodeAmount *big.Int, _platformAmount *big.Int, _maxClaimableWithdrawIndex *big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.Distribute(&_Withdraw.TransactOpts, _distributeType, _dealedHeight, _userAmount, _nodeAmount, _platformAmount, _maxClaimableWithdrawIndex)
}

// Distribute is a paid mutator transaction binding the contract method 0xc980ba89.
//
// Solidity: function distribute(uint8 _distributeType, uint256 _dealedHeight, uint256 _userAmount, uint256 _nodeAmount, uint256 _platformAmount, uint256 _maxClaimableWithdrawIndex) returns()
func (_Withdraw *WithdrawTransactorSession) Distribute(_distributeType uint8, _dealedHeight *big.Int, _userAmount *big.Int, _nodeAmount *big.Int, _platformAmount *big.Int, _maxClaimableWithdrawIndex *big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.Distribute(&_Withdraw.TransactOpts, _distributeType, _dealedHeight, _userAmount, _nodeAmount, _platformAmount, _maxClaimableWithdrawIndex)
}

// Init is a paid mutator transaction binding the contract method 0x99e133f9.
//
// Solidity: function init(address _lsdTokenAddress, address _userDepositAddress, address _networkProposalAddress, address _networkBalancesAddress, address _feePoolAddress, address _factoryAddress) returns()
func (_Withdraw *WithdrawTransactor) Init(opts *bind.TransactOpts, _lsdTokenAddress common.Address, _userDepositAddress common.Address, _networkProposalAddress common.Address, _networkBalancesAddress common.Address, _feePoolAddress common.Address, _factoryAddress common.Address) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "init", _lsdTokenAddress, _userDepositAddress, _networkProposalAddress, _networkBalancesAddress, _feePoolAddress, _factoryAddress)
}

// Init is a paid mutator transaction binding the contract method 0x99e133f9.
//
// Solidity: function init(address _lsdTokenAddress, address _userDepositAddress, address _networkProposalAddress, address _networkBalancesAddress, address _feePoolAddress, address _factoryAddress) returns()
func (_Withdraw *WithdrawSession) Init(_lsdTokenAddress common.Address, _userDepositAddress common.Address, _networkProposalAddress common.Address, _networkBalancesAddress common.Address, _feePoolAddress common.Address, _factoryAddress common.Address) (*types.Transaction, error) {
	return _Withdraw.Contract.Init(&_Withdraw.TransactOpts, _lsdTokenAddress, _userDepositAddress, _networkProposalAddress, _networkBalancesAddress, _feePoolAddress, _factoryAddress)
}

// Init is a paid mutator transaction binding the contract method 0x99e133f9.
//
// Solidity: function init(address _lsdTokenAddress, address _userDepositAddress, address _networkProposalAddress, address _networkBalancesAddress, address _feePoolAddress, address _factoryAddress) returns()
func (_Withdraw *WithdrawTransactorSession) Init(_lsdTokenAddress common.Address, _userDepositAddress common.Address, _networkProposalAddress common.Address, _networkBalancesAddress common.Address, _feePoolAddress common.Address, _factoryAddress common.Address) (*types.Transaction, error) {
	return _Withdraw.Contract.Init(&_Withdraw.TransactOpts, _lsdTokenAddress, _userDepositAddress, _networkProposalAddress, _networkBalancesAddress, _feePoolAddress, _factoryAddress)
}

// NodeClaim is a paid mutator transaction binding the contract method 0xfdf435e9.
//
// Solidity: function nodeClaim(uint256 _index, address _account, uint256 _totalRewardAmount, uint256 _totalExitDepositAmount, bytes32[] _merkleProof, uint8 _claimType) returns()
func (_Withdraw *WithdrawTransactor) NodeClaim(opts *bind.TransactOpts, _index *big.Int, _account common.Address, _totalRewardAmount *big.Int, _totalExitDepositAmount *big.Int, _merkleProof [][32]byte, _claimType uint8) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "nodeClaim", _index, _account, _totalRewardAmount, _totalExitDepositAmount, _merkleProof, _claimType)
}

// NodeClaim is a paid mutator transaction binding the contract method 0xfdf435e9.
//
// Solidity: function nodeClaim(uint256 _index, address _account, uint256 _totalRewardAmount, uint256 _totalExitDepositAmount, bytes32[] _merkleProof, uint8 _claimType) returns()
func (_Withdraw *WithdrawSession) NodeClaim(_index *big.Int, _account common.Address, _totalRewardAmount *big.Int, _totalExitDepositAmount *big.Int, _merkleProof [][32]byte, _claimType uint8) (*types.Transaction, error) {
	return _Withdraw.Contract.NodeClaim(&_Withdraw.TransactOpts, _index, _account, _totalRewardAmount, _totalExitDepositAmount, _merkleProof, _claimType)
}

// NodeClaim is a paid mutator transaction binding the contract method 0xfdf435e9.
//
// Solidity: function nodeClaim(uint256 _index, address _account, uint256 _totalRewardAmount, uint256 _totalExitDepositAmount, bytes32[] _merkleProof, uint8 _claimType) returns()
func (_Withdraw *WithdrawTransactorSession) NodeClaim(_index *big.Int, _account common.Address, _totalRewardAmount *big.Int, _totalExitDepositAmount *big.Int, _merkleProof [][32]byte, _claimType uint8) (*types.Transaction, error) {
	return _Withdraw.Contract.NodeClaim(&_Withdraw.TransactOpts, _index, _account, _totalRewardAmount, _totalExitDepositAmount, _merkleProof, _claimType)
}

// NotifyValidatorExit is a paid mutator transaction binding the contract method 0x1e0f4aae.
//
// Solidity: function notifyValidatorExit(uint256 _withdrawCycle, uint256 _ejectedStartCycle, uint256[] _validatorIndexList) returns()
func (_Withdraw *WithdrawTransactor) NotifyValidatorExit(opts *bind.TransactOpts, _withdrawCycle *big.Int, _ejectedStartCycle *big.Int, _validatorIndexList []*big.Int) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "notifyValidatorExit", _withdrawCycle, _ejectedStartCycle, _validatorIndexList)
}

// NotifyValidatorExit is a paid mutator transaction binding the contract method 0x1e0f4aae.
//
// Solidity: function notifyValidatorExit(uint256 _withdrawCycle, uint256 _ejectedStartCycle, uint256[] _validatorIndexList) returns()
func (_Withdraw *WithdrawSession) NotifyValidatorExit(_withdrawCycle *big.Int, _ejectedStartCycle *big.Int, _validatorIndexList []*big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.NotifyValidatorExit(&_Withdraw.TransactOpts, _withdrawCycle, _ejectedStartCycle, _validatorIndexList)
}

// NotifyValidatorExit is a paid mutator transaction binding the contract method 0x1e0f4aae.
//
// Solidity: function notifyValidatorExit(uint256 _withdrawCycle, uint256 _ejectedStartCycle, uint256[] _validatorIndexList) returns()
func (_Withdraw *WithdrawTransactorSession) NotifyValidatorExit(_withdrawCycle *big.Int, _ejectedStartCycle *big.Int, _validatorIndexList []*big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.NotifyValidatorExit(&_Withdraw.TransactOpts, _withdrawCycle, _ejectedStartCycle, _validatorIndexList)
}

// PlatformClaim is a paid mutator transaction binding the contract method 0xaaf82770.
//
// Solidity: function platformClaim(address _recipient) returns()
func (_Withdraw *WithdrawTransactor) PlatformClaim(opts *bind.TransactOpts, _recipient common.Address) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "platformClaim", _recipient)
}

// PlatformClaim is a paid mutator transaction binding the contract method 0xaaf82770.
//
// Solidity: function platformClaim(address _recipient) returns()
func (_Withdraw *WithdrawSession) PlatformClaim(_recipient common.Address) (*types.Transaction, error) {
	return _Withdraw.Contract.PlatformClaim(&_Withdraw.TransactOpts, _recipient)
}

// PlatformClaim is a paid mutator transaction binding the contract method 0xaaf82770.
//
// Solidity: function platformClaim(address _recipient) returns()
func (_Withdraw *WithdrawTransactorSession) PlatformClaim(_recipient common.Address) (*types.Transaction, error) {
	return _Withdraw.Contract.PlatformClaim(&_Withdraw.TransactOpts, _recipient)
}

// SetMerkleRoot is a paid mutator transaction binding the contract method 0x12b81931.
//
// Solidity: function setMerkleRoot(uint256 _dealedEpoch, bytes32 _merkleRoot, string _nodeRewardsFileCid) returns()
func (_Withdraw *WithdrawTransactor) SetMerkleRoot(opts *bind.TransactOpts, _dealedEpoch *big.Int, _merkleRoot [32]byte, _nodeRewardsFileCid string) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "setMerkleRoot", _dealedEpoch, _merkleRoot, _nodeRewardsFileCid)
}

// SetMerkleRoot is a paid mutator transaction binding the contract method 0x12b81931.
//
// Solidity: function setMerkleRoot(uint256 _dealedEpoch, bytes32 _merkleRoot, string _nodeRewardsFileCid) returns()
func (_Withdraw *WithdrawSession) SetMerkleRoot(_dealedEpoch *big.Int, _merkleRoot [32]byte, _nodeRewardsFileCid string) (*types.Transaction, error) {
	return _Withdraw.Contract.SetMerkleRoot(&_Withdraw.TransactOpts, _dealedEpoch, _merkleRoot, _nodeRewardsFileCid)
}

// SetMerkleRoot is a paid mutator transaction binding the contract method 0x12b81931.
//
// Solidity: function setMerkleRoot(uint256 _dealedEpoch, bytes32 _merkleRoot, string _nodeRewardsFileCid) returns()
func (_Withdraw *WithdrawTransactorSession) SetMerkleRoot(_dealedEpoch *big.Int, _merkleRoot [32]byte, _nodeRewardsFileCid string) (*types.Transaction, error) {
	return _Withdraw.Contract.SetMerkleRoot(&_Withdraw.TransactOpts, _dealedEpoch, _merkleRoot, _nodeRewardsFileCid)
}

// SetNodeClaimEnabled is a paid mutator transaction binding the contract method 0xf1583c08.
//
// Solidity: function setNodeClaimEnabled(bool _value) returns()
func (_Withdraw *WithdrawTransactor) SetNodeClaimEnabled(opts *bind.TransactOpts, _value bool) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "setNodeClaimEnabled", _value)
}

// SetNodeClaimEnabled is a paid mutator transaction binding the contract method 0xf1583c08.
//
// Solidity: function setNodeClaimEnabled(bool _value) returns()
func (_Withdraw *WithdrawSession) SetNodeClaimEnabled(_value bool) (*types.Transaction, error) {
	return _Withdraw.Contract.SetNodeClaimEnabled(&_Withdraw.TransactOpts, _value)
}

// SetNodeClaimEnabled is a paid mutator transaction binding the contract method 0xf1583c08.
//
// Solidity: function setNodeClaimEnabled(bool _value) returns()
func (_Withdraw *WithdrawTransactorSession) SetNodeClaimEnabled(_value bool) (*types.Transaction, error) {
	return _Withdraw.Contract.SetNodeClaimEnabled(&_Withdraw.TransactOpts, _value)
}

// SetUserWithdrawLimitAmountPerCycle is a paid mutator transaction binding the contract method 0xdd0cb13f.
//
// Solidity: function setUserWithdrawLimitAmountPerCycle(uint256 _userWithdrawLimitPerCycle) returns()
func (_Withdraw *WithdrawTransactor) SetUserWithdrawLimitAmountPerCycle(opts *bind.TransactOpts, _userWithdrawLimitPerCycle *big.Int) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "setUserWithdrawLimitAmountPerCycle", _userWithdrawLimitPerCycle)
}

// SetUserWithdrawLimitAmountPerCycle is a paid mutator transaction binding the contract method 0xdd0cb13f.
//
// Solidity: function setUserWithdrawLimitAmountPerCycle(uint256 _userWithdrawLimitPerCycle) returns()
func (_Withdraw *WithdrawSession) SetUserWithdrawLimitAmountPerCycle(_userWithdrawLimitPerCycle *big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.SetUserWithdrawLimitAmountPerCycle(&_Withdraw.TransactOpts, _userWithdrawLimitPerCycle)
}

// SetUserWithdrawLimitAmountPerCycle is a paid mutator transaction binding the contract method 0xdd0cb13f.
//
// Solidity: function setUserWithdrawLimitAmountPerCycle(uint256 _userWithdrawLimitPerCycle) returns()
func (_Withdraw *WithdrawTransactorSession) SetUserWithdrawLimitAmountPerCycle(_userWithdrawLimitPerCycle *big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.SetUserWithdrawLimitAmountPerCycle(&_Withdraw.TransactOpts, _userWithdrawLimitPerCycle)
}

// SetWithdrawCycleSeconds is a paid mutator transaction binding the contract method 0x939d1ee4.
//
// Solidity: function setWithdrawCycleSeconds(uint256 _withdrawCycleSeconds) returns()
func (_Withdraw *WithdrawTransactor) SetWithdrawCycleSeconds(opts *bind.TransactOpts, _withdrawCycleSeconds *big.Int) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "setWithdrawCycleSeconds", _withdrawCycleSeconds)
}

// SetWithdrawCycleSeconds is a paid mutator transaction binding the contract method 0x939d1ee4.
//
// Solidity: function setWithdrawCycleSeconds(uint256 _withdrawCycleSeconds) returns()
func (_Withdraw *WithdrawSession) SetWithdrawCycleSeconds(_withdrawCycleSeconds *big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.SetWithdrawCycleSeconds(&_Withdraw.TransactOpts, _withdrawCycleSeconds)
}

// SetWithdrawCycleSeconds is a paid mutator transaction binding the contract method 0x939d1ee4.
//
// Solidity: function setWithdrawCycleSeconds(uint256 _withdrawCycleSeconds) returns()
func (_Withdraw *WithdrawTransactorSession) SetWithdrawCycleSeconds(_withdrawCycleSeconds *big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.SetWithdrawCycleSeconds(&_Withdraw.TransactOpts, _withdrawCycleSeconds)
}

// SetWithdrawLimitAmountPerCycle is a paid mutator transaction binding the contract method 0xfe02cfa4.
//
// Solidity: function setWithdrawLimitAmountPerCycle(uint256 _withdrawLimitPerCycle) returns()
func (_Withdraw *WithdrawTransactor) SetWithdrawLimitAmountPerCycle(opts *bind.TransactOpts, _withdrawLimitPerCycle *big.Int) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "setWithdrawLimitAmountPerCycle", _withdrawLimitPerCycle)
}

// SetWithdrawLimitAmountPerCycle is a paid mutator transaction binding the contract method 0xfe02cfa4.
//
// Solidity: function setWithdrawLimitAmountPerCycle(uint256 _withdrawLimitPerCycle) returns()
func (_Withdraw *WithdrawSession) SetWithdrawLimitAmountPerCycle(_withdrawLimitPerCycle *big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.SetWithdrawLimitAmountPerCycle(&_Withdraw.TransactOpts, _withdrawLimitPerCycle)
}

// SetWithdrawLimitAmountPerCycle is a paid mutator transaction binding the contract method 0xfe02cfa4.
//
// Solidity: function setWithdrawLimitAmountPerCycle(uint256 _withdrawLimitPerCycle) returns()
func (_Withdraw *WithdrawTransactorSession) SetWithdrawLimitAmountPerCycle(_withdrawLimitPerCycle *big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.SetWithdrawLimitAmountPerCycle(&_Withdraw.TransactOpts, _withdrawLimitPerCycle)
}

// Unstake is a paid mutator transaction binding the contract method 0x2e17de78.
//
// Solidity: function unstake(uint256 _lsdTokenAmount) returns()
func (_Withdraw *WithdrawTransactor) Unstake(opts *bind.TransactOpts, _lsdTokenAmount *big.Int) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "unstake", _lsdTokenAmount)
}

// Unstake is a paid mutator transaction binding the contract method 0x2e17de78.
//
// Solidity: function unstake(uint256 _lsdTokenAmount) returns()
func (_Withdraw *WithdrawSession) Unstake(_lsdTokenAmount *big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.Unstake(&_Withdraw.TransactOpts, _lsdTokenAmount)
}

// Unstake is a paid mutator transaction binding the contract method 0x2e17de78.
//
// Solidity: function unstake(uint256 _lsdTokenAmount) returns()
func (_Withdraw *WithdrawTransactorSession) Unstake(_lsdTokenAmount *big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.Unstake(&_Withdraw.TransactOpts, _lsdTokenAmount)
}

// UpgradeTo is a paid mutator transaction binding the contract method 0x3659cfe6.
//
// Solidity: function upgradeTo(address newImplementation) returns()
func (_Withdraw *WithdrawTransactor) UpgradeTo(opts *bind.TransactOpts, newImplementation common.Address) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "upgradeTo", newImplementation)
}

// UpgradeTo is a paid mutator transaction binding the contract method 0x3659cfe6.
//
// Solidity: function upgradeTo(address newImplementation) returns()
func (_Withdraw *WithdrawSession) UpgradeTo(newImplementation common.Address) (*types.Transaction, error) {
	return _Withdraw.Contract.UpgradeTo(&_Withdraw.TransactOpts, newImplementation)
}

// UpgradeTo is a paid mutator transaction binding the contract method 0x3659cfe6.
//
// Solidity: function upgradeTo(address newImplementation) returns()
func (_Withdraw *WithdrawTransactorSession) UpgradeTo(newImplementation common.Address) (*types.Transaction, error) {
	return _Withdraw.Contract.UpgradeTo(&_Withdraw.TransactOpts, newImplementation)
}

// UpgradeToAndCall is a paid mutator transaction binding the contract method 0x4f1ef286.
//
// Solidity: function upgradeToAndCall(address newImplementation, bytes data) payable returns()
func (_Withdraw *WithdrawTransactor) UpgradeToAndCall(opts *bind.TransactOpts, newImplementation common.Address, data []byte) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "upgradeToAndCall", newImplementation, data)
}

// UpgradeToAndCall is a paid mutator transaction binding the contract method 0x4f1ef286.
//
// Solidity: function upgradeToAndCall(address newImplementation, bytes data) payable returns()
func (_Withdraw *WithdrawSession) UpgradeToAndCall(newImplementation common.Address, data []byte) (*types.Transaction, error) {
	return _Withdraw.Contract.UpgradeToAndCall(&_Withdraw.TransactOpts, newImplementation, data)
}

// UpgradeToAndCall is a paid mutator transaction binding the contract method 0x4f1ef286.
//
// Solidity: function upgradeToAndCall(address newImplementation, bytes data) payable returns()
func (_Withdraw *WithdrawTransactorSession) UpgradeToAndCall(newImplementation common.Address, data []byte) (*types.Transaction, error) {
	return _Withdraw.Contract.UpgradeToAndCall(&_Withdraw.TransactOpts, newImplementation, data)
}

// Withdraw is a paid mutator transaction binding the contract method 0x983d95ce.
//
// Solidity: function withdraw(uint256[] _withdrawIndexList) returns()
func (_Withdraw *WithdrawTransactor) Withdraw(opts *bind.TransactOpts, _withdrawIndexList []*big.Int) (*types.Transaction, error) {
	return _Withdraw.contract.Transact(opts, "withdraw", _withdrawIndexList)
}

// Withdraw is a paid mutator transaction binding the contract method 0x983d95ce.
//
// Solidity: function withdraw(uint256[] _withdrawIndexList) returns()
func (_Withdraw *WithdrawSession) Withdraw(_withdrawIndexList []*big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.Withdraw(&_Withdraw.TransactOpts, _withdrawIndexList)
}

// Withdraw is a paid mutator transaction binding the contract method 0x983d95ce.
//
// Solidity: function withdraw(uint256[] _withdrawIndexList) returns()
func (_Withdraw *WithdrawTransactorSession) Withdraw(_withdrawIndexList []*big.Int) (*types.Transaction, error) {
	return _Withdraw.Contract.Withdraw(&_Withdraw.TransactOpts, _withdrawIndexList)
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_Withdraw *WithdrawTransactor) Receive(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Withdraw.contract.RawTransact(opts, nil) // calldata is disallowed for receive function
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_Withdraw *WithdrawSession) Receive() (*types.Transaction, error) {
	return _Withdraw.Contract.Receive(&_Withdraw.TransactOpts)
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_Withdraw *WithdrawTransactorSession) Receive() (*types.Transaction, error) {
	return _Withdraw.Contract.Receive(&_Withdraw.TransactOpts)
}

// WithdrawAdminChangedIterator is returned from FilterAdminChanged and is used to iterate over the raw logs and unpacked data for AdminChanged events raised by the Withdraw contract.
type WithdrawAdminChangedIterator struct {
	Event *WithdrawAdminChanged // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawAdminChangedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawAdminChanged)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawAdminChanged)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawAdminChangedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawAdminChangedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawAdminChanged represents a AdminChanged event raised by the Withdraw contract.
type WithdrawAdminChanged struct {
	PreviousAdmin common.Address
	NewAdmin      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterAdminChanged is a free log retrieval operation binding the contract event 0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f.
//
// Solidity: event AdminChanged(address previousAdmin, address newAdmin)
func (_Withdraw *WithdrawFilterer) FilterAdminChanged(opts *bind.FilterOpts) (*WithdrawAdminChangedIterator, error) {

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "AdminChanged")
	if err != nil {
		return nil, err
	}
	return &WithdrawAdminChangedIterator{contract: _Withdraw.contract, event: "AdminChanged", logs: logs, sub: sub}, nil
}

// WatchAdminChanged is a free log subscription operation binding the contract event 0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f.
//
// Solidity: event AdminChanged(address previousAdmin, address newAdmin)
func (_Withdraw *WithdrawFilterer) WatchAdminChanged(opts *bind.WatchOpts, sink chan<- *WithdrawAdminChanged) (event.Subscription, error) {

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "AdminChanged")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawAdminChanged)
				if err := _Withdraw.contract.UnpackLog(event, "AdminChanged", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseAdminChanged is a log parse operation binding the contract event 0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f.
//
// Solidity: event AdminChanged(address previousAdmin, address newAdmin)
func (_Withdraw *WithdrawFilterer) ParseAdminChanged(log types.Log) (*WithdrawAdminChanged, error) {
	event := new(WithdrawAdminChanged)
	if err := _Withdraw.contract.UnpackLog(event, "AdminChanged", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawBeaconUpgradedIterator is returned from FilterBeaconUpgraded and is used to iterate over the raw logs and unpacked data for BeaconUpgraded events raised by the Withdraw contract.
type WithdrawBeaconUpgradedIterator struct {
	Event *WithdrawBeaconUpgraded // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawBeaconUpgradedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawBeaconUpgraded)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawBeaconUpgraded)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawBeaconUpgradedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawBeaconUpgradedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawBeaconUpgraded represents a BeaconUpgraded event raised by the Withdraw contract.
type WithdrawBeaconUpgraded struct {
	Beacon common.Address
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterBeaconUpgraded is a free log retrieval operation binding the contract event 0x1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e.
//
// Solidity: event BeaconUpgraded(address indexed beacon)
func (_Withdraw *WithdrawFilterer) FilterBeaconUpgraded(opts *bind.FilterOpts, beacon []common.Address) (*WithdrawBeaconUpgradedIterator, error) {

	var beaconRule []interface{}
	for _, beaconItem := range beacon {
		beaconRule = append(beaconRule, beaconItem)
	}

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "BeaconUpgraded", beaconRule)
	if err != nil {
		return nil, err
	}
	return &WithdrawBeaconUpgradedIterator{contract: _Withdraw.contract, event: "BeaconUpgraded", logs: logs, sub: sub}, nil
}

// WatchBeaconUpgraded is a free log subscription operation binding the contract event 0x1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e.
//
// Solidity: event BeaconUpgraded(address indexed beacon)
func (_Withdraw *WithdrawFilterer) WatchBeaconUpgraded(opts *bind.WatchOpts, sink chan<- *WithdrawBeaconUpgraded, beacon []common.Address) (event.Subscription, error) {

	var beaconRule []interface{}
	for _, beaconItem := range beacon {
		beaconRule = append(beaconRule, beaconItem)
	}

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "BeaconUpgraded", beaconRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawBeaconUpgraded)
				if err := _Withdraw.contract.UnpackLog(event, "BeaconUpgraded", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseBeaconUpgraded is a log parse operation binding the contract event 0x1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e.
//
// Solidity: event BeaconUpgraded(address indexed beacon)
func (_Withdraw *WithdrawFilterer) ParseBeaconUpgraded(log types.Log) (*WithdrawBeaconUpgraded, error) {
	event := new(WithdrawBeaconUpgraded)
	if err := _Withdraw.contract.UnpackLog(event, "BeaconUpgraded", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawDistributeRewardsIterator is returned from FilterDistributeRewards and is used to iterate over the raw logs and unpacked data for DistributeRewards events raised by the Withdraw contract.
type WithdrawDistributeRewardsIterator struct {
	Event *WithdrawDistributeRewards // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawDistributeRewardsIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawDistributeRewards)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawDistributeRewards)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawDistributeRewardsIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawDistributeRewardsIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawDistributeRewards represents a DistributeRewards event raised by the Withdraw contract.
type WithdrawDistributeRewards struct {
	DistributeType            uint8
	DealedHeight              *big.Int
	UserAmount                *big.Int
	NodeAmount                *big.Int
	PlatformAmount            *big.Int
	MaxClaimableWithdrawIndex *big.Int
	MvAmount                  *big.Int
	Raw                       types.Log // Blockchain specific contextual infos
}

// FilterDistributeRewards is a free log retrieval operation binding the contract event 0xf10021cf129ec9c5003084ae330dba6d0bd143c47a2677c4d68939a19423206b.
//
// Solidity: event DistributeRewards(uint8 distributeType, uint256 dealedHeight, uint256 userAmount, uint256 nodeAmount, uint256 platformAmount, uint256 maxClaimableWithdrawIndex, uint256 mvAmount)
func (_Withdraw *WithdrawFilterer) FilterDistributeRewards(opts *bind.FilterOpts) (*WithdrawDistributeRewardsIterator, error) {

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "DistributeRewards")
	if err != nil {
		return nil, err
	}
	return &WithdrawDistributeRewardsIterator{contract: _Withdraw.contract, event: "DistributeRewards", logs: logs, sub: sub}, nil
}

// WatchDistributeRewards is a free log subscription operation binding the contract event 0xf10021cf129ec9c5003084ae330dba6d0bd143c47a2677c4d68939a19423206b.
//
// Solidity: event DistributeRewards(uint8 distributeType, uint256 dealedHeight, uint256 userAmount, uint256 nodeAmount, uint256 platformAmount, uint256 maxClaimableWithdrawIndex, uint256 mvAmount)
func (_Withdraw *WithdrawFilterer) WatchDistributeRewards(opts *bind.WatchOpts, sink chan<- *WithdrawDistributeRewards) (event.Subscription, error) {

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "DistributeRewards")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawDistributeRewards)
				if err := _Withdraw.contract.UnpackLog(event, "DistributeRewards", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseDistributeRewards is a log parse operation binding the contract event 0xf10021cf129ec9c5003084ae330dba6d0bd143c47a2677c4d68939a19423206b.
//
// Solidity: event DistributeRewards(uint8 distributeType, uint256 dealedHeight, uint256 userAmount, uint256 nodeAmount, uint256 platformAmount, uint256 maxClaimableWithdrawIndex, uint256 mvAmount)
func (_Withdraw *WithdrawFilterer) ParseDistributeRewards(log types.Log) (*WithdrawDistributeRewards, error) {
	event := new(WithdrawDistributeRewards)
	if err := _Withdraw.contract.UnpackLog(event, "DistributeRewards", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawEtherDepositedIterator is returned from FilterEtherDeposited and is used to iterate over the raw logs and unpacked data for EtherDeposited events raised by the Withdraw contract.
type WithdrawEtherDepositedIterator struct {
	Event *WithdrawEtherDeposited // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawEtherDepositedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawEtherDeposited)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawEtherDeposited)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawEtherDepositedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawEtherDepositedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawEtherDeposited represents a EtherDeposited event raised by the Withdraw contract.
type WithdrawEtherDeposited struct {
	From   common.Address
	Amount *big.Int
	Time   *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterEtherDeposited is a free log retrieval operation binding the contract event 0xef51b4c870b8b0100eae2072e91db01222a303072af3728e58c9d4d2da33127f.
//
// Solidity: event EtherDeposited(address indexed from, uint256 amount, uint256 time)
func (_Withdraw *WithdrawFilterer) FilterEtherDeposited(opts *bind.FilterOpts, from []common.Address) (*WithdrawEtherDepositedIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "EtherDeposited", fromRule)
	if err != nil {
		return nil, err
	}
	return &WithdrawEtherDepositedIterator{contract: _Withdraw.contract, event: "EtherDeposited", logs: logs, sub: sub}, nil
}

// WatchEtherDeposited is a free log subscription operation binding the contract event 0xef51b4c870b8b0100eae2072e91db01222a303072af3728e58c9d4d2da33127f.
//
// Solidity: event EtherDeposited(address indexed from, uint256 amount, uint256 time)
func (_Withdraw *WithdrawFilterer) WatchEtherDeposited(opts *bind.WatchOpts, sink chan<- *WithdrawEtherDeposited, from []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "EtherDeposited", fromRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawEtherDeposited)
				if err := _Withdraw.contract.UnpackLog(event, "EtherDeposited", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseEtherDeposited is a log parse operation binding the contract event 0xef51b4c870b8b0100eae2072e91db01222a303072af3728e58c9d4d2da33127f.
//
// Solidity: event EtherDeposited(address indexed from, uint256 amount, uint256 time)
func (_Withdraw *WithdrawFilterer) ParseEtherDeposited(log types.Log) (*WithdrawEtherDeposited, error) {
	event := new(WithdrawEtherDeposited)
	if err := _Withdraw.contract.UnpackLog(event, "EtherDeposited", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawNodeClaimedIterator is returned from FilterNodeClaimed and is used to iterate over the raw logs and unpacked data for NodeClaimed events raised by the Withdraw contract.
type WithdrawNodeClaimedIterator struct {
	Event *WithdrawNodeClaimed // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawNodeClaimedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawNodeClaimed)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawNodeClaimed)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawNodeClaimedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawNodeClaimedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawNodeClaimed represents a NodeClaimed event raised by the Withdraw contract.
type WithdrawNodeClaimed struct {
	Index            *big.Int
	Account          common.Address
	ClaimableReward  *big.Int
	ClaimableDeposit *big.Int
	ClaimType        uint8
	Raw              types.Log // Blockchain specific contextual infos
}

// FilterNodeClaimed is a free log retrieval operation binding the contract event 0x659e842f0209726671f562e8d7ee3a25d2cef92c2b85dcd268af93ef5d13582c.
//
// Solidity: event NodeClaimed(uint256 index, address account, uint256 claimableReward, uint256 claimableDeposit, uint8 claimType)
func (_Withdraw *WithdrawFilterer) FilterNodeClaimed(opts *bind.FilterOpts) (*WithdrawNodeClaimedIterator, error) {

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "NodeClaimed")
	if err != nil {
		return nil, err
	}
	return &WithdrawNodeClaimedIterator{contract: _Withdraw.contract, event: "NodeClaimed", logs: logs, sub: sub}, nil
}

// WatchNodeClaimed is a free log subscription operation binding the contract event 0x659e842f0209726671f562e8d7ee3a25d2cef92c2b85dcd268af93ef5d13582c.
//
// Solidity: event NodeClaimed(uint256 index, address account, uint256 claimableReward, uint256 claimableDeposit, uint8 claimType)
func (_Withdraw *WithdrawFilterer) WatchNodeClaimed(opts *bind.WatchOpts, sink chan<- *WithdrawNodeClaimed) (event.Subscription, error) {

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "NodeClaimed")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawNodeClaimed)
				if err := _Withdraw.contract.UnpackLog(event, "NodeClaimed", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseNodeClaimed is a log parse operation binding the contract event 0x659e842f0209726671f562e8d7ee3a25d2cef92c2b85dcd268af93ef5d13582c.
//
// Solidity: event NodeClaimed(uint256 index, address account, uint256 claimableReward, uint256 claimableDeposit, uint8 claimType)
func (_Withdraw *WithdrawFilterer) ParseNodeClaimed(log types.Log) (*WithdrawNodeClaimed, error) {
	event := new(WithdrawNodeClaimed)
	if err := _Withdraw.contract.UnpackLog(event, "NodeClaimed", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawNotifyValidatorExitIterator is returned from FilterNotifyValidatorExit and is used to iterate over the raw logs and unpacked data for NotifyValidatorExit events raised by the Withdraw contract.
type WithdrawNotifyValidatorExitIterator struct {
	Event *WithdrawNotifyValidatorExit // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawNotifyValidatorExitIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawNotifyValidatorExit)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawNotifyValidatorExit)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawNotifyValidatorExitIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawNotifyValidatorExitIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawNotifyValidatorExit represents a NotifyValidatorExit event raised by the Withdraw contract.
type WithdrawNotifyValidatorExit struct {
	WithdrawCycle             *big.Int
	EjectedStartWithdrawCycle *big.Int
	EjectedValidators         []*big.Int
	Raw                       types.Log // Blockchain specific contextual infos
}

// FilterNotifyValidatorExit is a free log retrieval operation binding the contract event 0xb83477449e27b4bab4f28c938d033b953557d6a1b9b4469a43d229f78ed6e55c.
//
// Solidity: event NotifyValidatorExit(uint256 withdrawCycle, uint256 ejectedStartWithdrawCycle, uint256[] ejectedValidators)
func (_Withdraw *WithdrawFilterer) FilterNotifyValidatorExit(opts *bind.FilterOpts) (*WithdrawNotifyValidatorExitIterator, error) {

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "NotifyValidatorExit")
	if err != nil {
		return nil, err
	}
	return &WithdrawNotifyValidatorExitIterator{contract: _Withdraw.contract, event: "NotifyValidatorExit", logs: logs, sub: sub}, nil
}

// WatchNotifyValidatorExit is a free log subscription operation binding the contract event 0xb83477449e27b4bab4f28c938d033b953557d6a1b9b4469a43d229f78ed6e55c.
//
// Solidity: event NotifyValidatorExit(uint256 withdrawCycle, uint256 ejectedStartWithdrawCycle, uint256[] ejectedValidators)
func (_Withdraw *WithdrawFilterer) WatchNotifyValidatorExit(opts *bind.WatchOpts, sink chan<- *WithdrawNotifyValidatorExit) (event.Subscription, error) {

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "NotifyValidatorExit")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawNotifyValidatorExit)
				if err := _Withdraw.contract.UnpackLog(event, "NotifyValidatorExit", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseNotifyValidatorExit is a log parse operation binding the contract event 0xb83477449e27b4bab4f28c938d033b953557d6a1b9b4469a43d229f78ed6e55c.
//
// Solidity: event NotifyValidatorExit(uint256 withdrawCycle, uint256 ejectedStartWithdrawCycle, uint256[] ejectedValidators)
func (_Withdraw *WithdrawFilterer) ParseNotifyValidatorExit(log types.Log) (*WithdrawNotifyValidatorExit, error) {
	event := new(WithdrawNotifyValidatorExit)
	if err := _Withdraw.contract.UnpackLog(event, "NotifyValidatorExit", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawSetMerkleRootIterator is returned from FilterSetMerkleRoot and is used to iterate over the raw logs and unpacked data for SetMerkleRoot events raised by the Withdraw contract.
type WithdrawSetMerkleRootIterator struct {
	Event *WithdrawSetMerkleRoot // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawSetMerkleRootIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawSetMerkleRoot)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawSetMerkleRoot)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawSetMerkleRootIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawSetMerkleRootIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawSetMerkleRoot represents a SetMerkleRoot event raised by the Withdraw contract.
type WithdrawSetMerkleRoot struct {
	DealedEpoch        *big.Int
	MerkleRoot         [32]byte
	NodeRewardsFileCid string
	Raw                types.Log // Blockchain specific contextual infos
}

// FilterSetMerkleRoot is a free log retrieval operation binding the contract event 0xec43b2424d0504da473794ad49016df3e06fb0d772bb403d724c9e5d53d8afb8.
//
// Solidity: event SetMerkleRoot(uint256 indexed dealedEpoch, bytes32 merkleRoot, string nodeRewardsFileCid)
func (_Withdraw *WithdrawFilterer) FilterSetMerkleRoot(opts *bind.FilterOpts, dealedEpoch []*big.Int) (*WithdrawSetMerkleRootIterator, error) {

	var dealedEpochRule []interface{}
	for _, dealedEpochItem := range dealedEpoch {
		dealedEpochRule = append(dealedEpochRule, dealedEpochItem)
	}

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "SetMerkleRoot", dealedEpochRule)
	if err != nil {
		return nil, err
	}
	return &WithdrawSetMerkleRootIterator{contract: _Withdraw.contract, event: "SetMerkleRoot", logs: logs, sub: sub}, nil
}

// WatchSetMerkleRoot is a free log subscription operation binding the contract event 0xec43b2424d0504da473794ad49016df3e06fb0d772bb403d724c9e5d53d8afb8.
//
// Solidity: event SetMerkleRoot(uint256 indexed dealedEpoch, bytes32 merkleRoot, string nodeRewardsFileCid)
func (_Withdraw *WithdrawFilterer) WatchSetMerkleRoot(opts *bind.WatchOpts, sink chan<- *WithdrawSetMerkleRoot, dealedEpoch []*big.Int) (event.Subscription, error) {

	var dealedEpochRule []interface{}
	for _, dealedEpochItem := range dealedEpoch {
		dealedEpochRule = append(dealedEpochRule, dealedEpochItem)
	}

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "SetMerkleRoot", dealedEpochRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawSetMerkleRoot)
				if err := _Withdraw.contract.UnpackLog(event, "SetMerkleRoot", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseSetMerkleRoot is a log parse operation binding the contract event 0xec43b2424d0504da473794ad49016df3e06fb0d772bb403d724c9e5d53d8afb8.
//
// Solidity: event SetMerkleRoot(uint256 indexed dealedEpoch, bytes32 merkleRoot, string nodeRewardsFileCid)
func (_Withdraw *WithdrawFilterer) ParseSetMerkleRoot(log types.Log) (*WithdrawSetMerkleRoot, error) {
	event := new(WithdrawSetMerkleRoot)
	if err := _Withdraw.contract.UnpackLog(event, "SetMerkleRoot", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawSetUserWithdrawLimitPerCycleIterator is returned from FilterSetUserWithdrawLimitPerCycle and is used to iterate over the raw logs and unpacked data for SetUserWithdrawLimitPerCycle events raised by the Withdraw contract.
type WithdrawSetUserWithdrawLimitPerCycleIterator struct {
	Event *WithdrawSetUserWithdrawLimitPerCycle // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawSetUserWithdrawLimitPerCycleIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawSetUserWithdrawLimitPerCycle)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawSetUserWithdrawLimitPerCycle)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawSetUserWithdrawLimitPerCycleIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawSetUserWithdrawLimitPerCycleIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawSetUserWithdrawLimitPerCycle represents a SetUserWithdrawLimitPerCycle event raised by the Withdraw contract.
type WithdrawSetUserWithdrawLimitPerCycle struct {
	UserWithdrawLimitPerCycle *big.Int
	Raw                       types.Log // Blockchain specific contextual infos
}

// FilterSetUserWithdrawLimitPerCycle is a free log retrieval operation binding the contract event 0x208ed057768c8997dde633000b59d3a1c2f498337c95bf9ecccc810f698d9194.
//
// Solidity: event SetUserWithdrawLimitPerCycle(uint256 userWithdrawLimitPerCycle)
func (_Withdraw *WithdrawFilterer) FilterSetUserWithdrawLimitPerCycle(opts *bind.FilterOpts) (*WithdrawSetUserWithdrawLimitPerCycleIterator, error) {

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "SetUserWithdrawLimitPerCycle")
	if err != nil {
		return nil, err
	}
	return &WithdrawSetUserWithdrawLimitPerCycleIterator{contract: _Withdraw.contract, event: "SetUserWithdrawLimitPerCycle", logs: logs, sub: sub}, nil
}

// WatchSetUserWithdrawLimitPerCycle is a free log subscription operation binding the contract event 0x208ed057768c8997dde633000b59d3a1c2f498337c95bf9ecccc810f698d9194.
//
// Solidity: event SetUserWithdrawLimitPerCycle(uint256 userWithdrawLimitPerCycle)
func (_Withdraw *WithdrawFilterer) WatchSetUserWithdrawLimitPerCycle(opts *bind.WatchOpts, sink chan<- *WithdrawSetUserWithdrawLimitPerCycle) (event.Subscription, error) {

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "SetUserWithdrawLimitPerCycle")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawSetUserWithdrawLimitPerCycle)
				if err := _Withdraw.contract.UnpackLog(event, "SetUserWithdrawLimitPerCycle", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseSetUserWithdrawLimitPerCycle is a log parse operation binding the contract event 0x208ed057768c8997dde633000b59d3a1c2f498337c95bf9ecccc810f698d9194.
//
// Solidity: event SetUserWithdrawLimitPerCycle(uint256 userWithdrawLimitPerCycle)
func (_Withdraw *WithdrawFilterer) ParseSetUserWithdrawLimitPerCycle(log types.Log) (*WithdrawSetUserWithdrawLimitPerCycle, error) {
	event := new(WithdrawSetUserWithdrawLimitPerCycle)
	if err := _Withdraw.contract.UnpackLog(event, "SetUserWithdrawLimitPerCycle", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawSetWithdrawCycleSecondsIterator is returned from FilterSetWithdrawCycleSeconds and is used to iterate over the raw logs and unpacked data for SetWithdrawCycleSeconds events raised by the Withdraw contract.
type WithdrawSetWithdrawCycleSecondsIterator struct {
	Event *WithdrawSetWithdrawCycleSeconds // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawSetWithdrawCycleSecondsIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawSetWithdrawCycleSeconds)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawSetWithdrawCycleSeconds)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawSetWithdrawCycleSecondsIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawSetWithdrawCycleSecondsIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawSetWithdrawCycleSeconds represents a SetWithdrawCycleSeconds event raised by the Withdraw contract.
type WithdrawSetWithdrawCycleSeconds struct {
	CycleSeconds *big.Int
	Raw          types.Log // Blockchain specific contextual infos
}

// FilterSetWithdrawCycleSeconds is a free log retrieval operation binding the contract event 0xa8bf31f5ff469d988ee50031edcb6b8a44b1cd010a1561d9a7a06d71c2193e6c.
//
// Solidity: event SetWithdrawCycleSeconds(uint256 cycleSeconds)
func (_Withdraw *WithdrawFilterer) FilterSetWithdrawCycleSeconds(opts *bind.FilterOpts) (*WithdrawSetWithdrawCycleSecondsIterator, error) {

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "SetWithdrawCycleSeconds")
	if err != nil {
		return nil, err
	}
	return &WithdrawSetWithdrawCycleSecondsIterator{contract: _Withdraw.contract, event: "SetWithdrawCycleSeconds", logs: logs, sub: sub}, nil
}

// WatchSetWithdrawCycleSeconds is a free log subscription operation binding the contract event 0xa8bf31f5ff469d988ee50031edcb6b8a44b1cd010a1561d9a7a06d71c2193e6c.
//
// Solidity: event SetWithdrawCycleSeconds(uint256 cycleSeconds)
func (_Withdraw *WithdrawFilterer) WatchSetWithdrawCycleSeconds(opts *bind.WatchOpts, sink chan<- *WithdrawSetWithdrawCycleSeconds) (event.Subscription, error) {

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "SetWithdrawCycleSeconds")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawSetWithdrawCycleSeconds)
				if err := _Withdraw.contract.UnpackLog(event, "SetWithdrawCycleSeconds", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseSetWithdrawCycleSeconds is a log parse operation binding the contract event 0xa8bf31f5ff469d988ee50031edcb6b8a44b1cd010a1561d9a7a06d71c2193e6c.
//
// Solidity: event SetWithdrawCycleSeconds(uint256 cycleSeconds)
func (_Withdraw *WithdrawFilterer) ParseSetWithdrawCycleSeconds(log types.Log) (*WithdrawSetWithdrawCycleSeconds, error) {
	event := new(WithdrawSetWithdrawCycleSeconds)
	if err := _Withdraw.contract.UnpackLog(event, "SetWithdrawCycleSeconds", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawSetWithdrawLimitPerCycleIterator is returned from FilterSetWithdrawLimitPerCycle and is used to iterate over the raw logs and unpacked data for SetWithdrawLimitPerCycle events raised by the Withdraw contract.
type WithdrawSetWithdrawLimitPerCycleIterator struct {
	Event *WithdrawSetWithdrawLimitPerCycle // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawSetWithdrawLimitPerCycleIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawSetWithdrawLimitPerCycle)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawSetWithdrawLimitPerCycle)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawSetWithdrawLimitPerCycleIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawSetWithdrawLimitPerCycleIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawSetWithdrawLimitPerCycle represents a SetWithdrawLimitPerCycle event raised by the Withdraw contract.
type WithdrawSetWithdrawLimitPerCycle struct {
	WithdrawLimitPerCycle *big.Int
	Raw                   types.Log // Blockchain specific contextual infos
}

// FilterSetWithdrawLimitPerCycle is a free log retrieval operation binding the contract event 0x8425a2e73ee4ea13649867c99971ddd01b64049295025867a4737f69c671358c.
//
// Solidity: event SetWithdrawLimitPerCycle(uint256 withdrawLimitPerCycle)
func (_Withdraw *WithdrawFilterer) FilterSetWithdrawLimitPerCycle(opts *bind.FilterOpts) (*WithdrawSetWithdrawLimitPerCycleIterator, error) {

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "SetWithdrawLimitPerCycle")
	if err != nil {
		return nil, err
	}
	return &WithdrawSetWithdrawLimitPerCycleIterator{contract: _Withdraw.contract, event: "SetWithdrawLimitPerCycle", logs: logs, sub: sub}, nil
}

// WatchSetWithdrawLimitPerCycle is a free log subscription operation binding the contract event 0x8425a2e73ee4ea13649867c99971ddd01b64049295025867a4737f69c671358c.
//
// Solidity: event SetWithdrawLimitPerCycle(uint256 withdrawLimitPerCycle)
func (_Withdraw *WithdrawFilterer) WatchSetWithdrawLimitPerCycle(opts *bind.WatchOpts, sink chan<- *WithdrawSetWithdrawLimitPerCycle) (event.Subscription, error) {

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "SetWithdrawLimitPerCycle")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawSetWithdrawLimitPerCycle)
				if err := _Withdraw.contract.UnpackLog(event, "SetWithdrawLimitPerCycle", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseSetWithdrawLimitPerCycle is a log parse operation binding the contract event 0x8425a2e73ee4ea13649867c99971ddd01b64049295025867a4737f69c671358c.
//
// Solidity: event SetWithdrawLimitPerCycle(uint256 withdrawLimitPerCycle)
func (_Withdraw *WithdrawFilterer) ParseSetWithdrawLimitPerCycle(log types.Log) (*WithdrawSetWithdrawLimitPerCycle, error) {
	event := new(WithdrawSetWithdrawLimitPerCycle)
	if err := _Withdraw.contract.UnpackLog(event, "SetWithdrawLimitPerCycle", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawUnstakeIterator is returned from FilterUnstake and is used to iterate over the raw logs and unpacked data for Unstake events raised by the Withdraw contract.
type WithdrawUnstakeIterator struct {
	Event *WithdrawUnstake // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawUnstakeIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawUnstake)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawUnstake)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawUnstakeIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawUnstakeIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawUnstake represents a Unstake event raised by the Withdraw contract.
type WithdrawUnstake struct {
	From           common.Address
	LsdTokenAmount *big.Int
	EthAmount      *big.Int
	WithdrawIndex  *big.Int
	Instantly      bool
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterUnstake is a free log retrieval operation binding the contract event 0xc7ccdcb2d25f572c6814e377dbb34ea4318a4b7d3cd890f5cfad699d75327c7c.
//
// Solidity: event Unstake(address indexed from, uint256 lsdTokenAmount, uint256 ethAmount, uint256 withdrawIndex, bool instantly)
func (_Withdraw *WithdrawFilterer) FilterUnstake(opts *bind.FilterOpts, from []common.Address) (*WithdrawUnstakeIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "Unstake", fromRule)
	if err != nil {
		return nil, err
	}
	return &WithdrawUnstakeIterator{contract: _Withdraw.contract, event: "Unstake", logs: logs, sub: sub}, nil
}

// WatchUnstake is a free log subscription operation binding the contract event 0xc7ccdcb2d25f572c6814e377dbb34ea4318a4b7d3cd890f5cfad699d75327c7c.
//
// Solidity: event Unstake(address indexed from, uint256 lsdTokenAmount, uint256 ethAmount, uint256 withdrawIndex, bool instantly)
func (_Withdraw *WithdrawFilterer) WatchUnstake(opts *bind.WatchOpts, sink chan<- *WithdrawUnstake, from []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "Unstake", fromRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawUnstake)
				if err := _Withdraw.contract.UnpackLog(event, "Unstake", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseUnstake is a log parse operation binding the contract event 0xc7ccdcb2d25f572c6814e377dbb34ea4318a4b7d3cd890f5cfad699d75327c7c.
//
// Solidity: event Unstake(address indexed from, uint256 lsdTokenAmount, uint256 ethAmount, uint256 withdrawIndex, bool instantly)
func (_Withdraw *WithdrawFilterer) ParseUnstake(log types.Log) (*WithdrawUnstake, error) {
	event := new(WithdrawUnstake)
	if err := _Withdraw.contract.UnpackLog(event, "Unstake", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawUpgradedIterator is returned from FilterUpgraded and is used to iterate over the raw logs and unpacked data for Upgraded events raised by the Withdraw contract.
type WithdrawUpgradedIterator struct {
	Event *WithdrawUpgraded // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawUpgradedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawUpgraded)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawUpgraded)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawUpgradedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawUpgradedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawUpgraded represents a Upgraded event raised by the Withdraw contract.
type WithdrawUpgraded struct {
	Implementation common.Address
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterUpgraded is a free log retrieval operation binding the contract event 0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b.
//
// Solidity: event Upgraded(address indexed implementation)
func (_Withdraw *WithdrawFilterer) FilterUpgraded(opts *bind.FilterOpts, implementation []common.Address) (*WithdrawUpgradedIterator, error) {

	var implementationRule []interface{}
	for _, implementationItem := range implementation {
		implementationRule = append(implementationRule, implementationItem)
	}

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "Upgraded", implementationRule)
	if err != nil {
		return nil, err
	}
	return &WithdrawUpgradedIterator{contract: _Withdraw.contract, event: "Upgraded", logs: logs, sub: sub}, nil
}

// WatchUpgraded is a free log subscription operation binding the contract event 0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b.
//
// Solidity: event Upgraded(address indexed implementation)
func (_Withdraw *WithdrawFilterer) WatchUpgraded(opts *bind.WatchOpts, sink chan<- *WithdrawUpgraded, implementation []common.Address) (event.Subscription, error) {

	var implementationRule []interface{}
	for _, implementationItem := range implementation {
		implementationRule = append(implementationRule, implementationItem)
	}

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "Upgraded", implementationRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawUpgraded)
				if err := _Withdraw.contract.UnpackLog(event, "Upgraded", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseUpgraded is a log parse operation binding the contract event 0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b.
//
// Solidity: event Upgraded(address indexed implementation)
func (_Withdraw *WithdrawFilterer) ParseUpgraded(log types.Log) (*WithdrawUpgraded, error) {
	event := new(WithdrawUpgraded)
	if err := _Withdraw.contract.UnpackLog(event, "Upgraded", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// WithdrawWithdrawIterator is returned from FilterWithdraw and is used to iterate over the raw logs and unpacked data for Withdraw events raised by the Withdraw contract.
type WithdrawWithdrawIterator struct {
	Event *WithdrawWithdraw // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *WithdrawWithdrawIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(WithdrawWithdraw)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(WithdrawWithdraw)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *WithdrawWithdrawIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *WithdrawWithdrawIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// WithdrawWithdraw represents a Withdraw event raised by the Withdraw contract.
type WithdrawWithdraw struct {
	From              common.Address
	WithdrawIndexList []*big.Int
	Raw               types.Log // Blockchain specific contextual infos
}

// FilterWithdraw is a free log retrieval operation binding the contract event 0x67e9df8b3c7743c9f1b625ba4f2b4e601206dbd46ed5c33c85a1242e4d23a2d1.
//
// Solidity: event Withdraw(address indexed from, uint256[] withdrawIndexList)
func (_Withdraw *WithdrawFilterer) FilterWithdraw(opts *bind.FilterOpts, from []common.Address) (*WithdrawWithdrawIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _Withdraw.contract.FilterLogs(opts, "Withdraw", fromRule)
	if err != nil {
		return nil, err
	}
	return &WithdrawWithdrawIterator{contract: _Withdraw.contract, event: "Withdraw", logs: logs, sub: sub}, nil
}

// WatchWithdraw is a free log subscription operation binding the contract event 0x67e9df8b3c7743c9f1b625ba4f2b4e601206dbd46ed5c33c85a1242e4d23a2d1.
//
// Solidity: event Withdraw(address indexed from, uint256[] withdrawIndexList)
func (_Withdraw *WithdrawFilterer) WatchWithdraw(opts *bind.WatchOpts, sink chan<- *WithdrawWithdraw, from []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _Withdraw.contract.WatchLogs(opts, "Withdraw", fromRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(WithdrawWithdraw)
				if err := _Withdraw.contract.UnpackLog(event, "Withdraw", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseWithdraw is a log parse operation binding the contract event 0x67e9df8b3c7743c9f1b625ba4f2b4e601206dbd46ed5c33c85a1242e4d23a2d1.
//
// Solidity: event Withdraw(address indexed from, uint256[] withdrawIndexList)
func (_Withdraw *WithdrawFilterer) ParseWithdraw(log types.Log) (*WithdrawWithdraw, error) {
	event := new(WithdrawWithdraw)
	if err := _Withdraw.contract.UnpackLog(event, "Withdraw", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
