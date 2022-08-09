import {
	createContext,
	useEffect,
	useState,
	useCallback,
	useMemo,
} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";


const Web3Context = createContext({
	
	loadWeb3Modal: () => {},
	accountAddress: "hey",
});



const Web3ContextProvider = (props) => {
	const [network, setNetwork] = useState("0xaef3");
	const [provider, setProvider] = useState();
	const [signedInAddress, setSignedInAddress] = useState("");

	// const web3Modal = useMemo(() => {
	// 	const web3Modal = new Web3Modal();
	// 	const connection = await web3Modal.connect();
	// 	let provider = new ethers.providers.Web3Provider(connection);
	// 	let s = provider.getSigner();
	// 	let address =  await s.getAddress();
	// 	setSignedInAddress(address)
	// 	// sendDetails(provider, address, s)
	// 	//setAdd(address);
	// }, [network]);

	const web3Modal = useMemo(() => {
		return new Web3Modal();
	}, []);

	// const { web3, contract } = useMemo(() => {
	// 	const web3 = new Web3(
	// 		provider || "https://alfajores-forno.celo-testnet.org/"
	// 	);
	// 	const contract = new web3.eth.Contract(
	// 		abi.abi,
	// 		"0x2D031B84bd6cF242619Bd52542dDbCcb8556b90e"
	// 	);
	// 	return { web3, contract };
	// }, [provider]);

	// Modal Controls - Connect and Disconnect Wallets
	const loadWeb3Modal = useCallback(async () => {
		//console.log("Fun")
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		let provider = new ethers.providers.Web3Provider(connection);
		let s = provider.getSigner();
		let address =  await s.getAddress();
		let singM = s.signMessage("HEllo");
		setSignedInAddress(address)
	});
	// const logoutOfWeb3Modal = useCallback(async () => {
	// 	setSignedInAddress("");
	// 	await web3Modal.clearCachedProvider();
	// 	window.location.reload();
	// }, [web3Modal]);

	// // useEffect(() => {
	// 	console.log(provider);
	// 	if (provider) {
	// 		// Subscribe to accounts change
	// 		provider.on("accountsChanged", (accounts) => {
	// 			console.log("accountsChanged", accounts, provider);
	// 		});
	// 		// Subscribe to chainId change
	// 		provider.on("chainChanged", (chainId) => {
	// 			console.log("Provider Chain Changed", chainId, provider);
	// 		});
	// 		// Subscribe to provider connection
	// 		provider.on("connect", (info) => {
	// 			console.log("Provider Connected", info);
	// 		});
	// 		// Subscribe to provider disconnection
	// 		provider.on("disconnect", (error) => {
	// 			console.log("disconnect", error);
	// 		});
	// 	}
	// }, [provider]);

	return (
		<Web3Context.Provider
			value={{
				loadWeb3Modal,accountAddress:signedInAddress
			}}>
			{props.children}
		</Web3Context.Provider>
	);
};

// export default Web3ContextProvider;
export { Web3Context, Web3ContextProvider as default };
