const { expect } = require("chai")
const { ethers } = require("hardhat")

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"

describe("DortmundSwapExamples", () => {
    let dortmundSwapExamples
    let accounts
    let weth
    let dai
    let usdt

    before(async () => {
        accounts = await ethers.getSigners(1)

        const DortmundSwapExamples = await ethers.getContractFactory("DortmundSwapExamples")
        dortmundSwapExamples = await DortmundSwapExamples.deploy()
        await dortmundSwapExamples.deployed()

        weth = await ethers.getContractAt("IWETH", WETH9)
        dai = await ethers.getContractAt("IERC20", DAI)
        usdt = await ethers.getContractAt("IERC20", USDT)
    })

    it("swapExactInputSingle", async () => {
        const amountIn = 10n ** 18n

        // Deposit WETH
        await weth.deposit({ value: amountIn })
        await weth.approve(dortmundSwapExamples.address, amountIn)

        // Swap
        await dortmundSwapExamples.swapExactInputSingle(amountIn)

        console.log("DAI balance", await dai.balanceOf(accounts[0].address))
    })

    it("swapExactOutputSingle", async () => {
        const wethAmountInMax = 10n ** 18n
        const daiAmountOut = 100n * 10n ** 18n

        // Deposit WETH
        await weth.deposit({ value: wethAmountInMax })
        await weth.approve(dortmundSwapExamples.address, wethAmountInMax)

        // Swap
        await dortmundSwapExamples.swapExactOutputSingle(daiAmountOut, wethAmountInMax)

        console.log("DAI balance", await dai.balanceOf(accounts[0].address))
    })

    it("swapExactInputMultihop", async () => {
        const amountIn = 10n ** 18n

        // Deposit WETH
        await weth.deposit({ value: amountIn })
        await weth.approve(dortmundSwapExamples.address, amountIn)

        // Swap
        await dortmundSwapExamples.swapExactInputMultihop(amountIn)

        console.log("DAI balance", await dai.balanceOf(accounts[0].address))
    })

    it("swapExactOutputMultihop", async () => {
        const wethAmountInMax = 10n ** 18n
        const daiAmountOut = 100n * 10n ** 18n

        // Deposit WETH
        await weth.deposit({ value: wethAmountInMax })
        await weth.approve(dortmundSwapExamples.address, wethAmountInMax)

        // Swap
        await dortmundSwapExamples.swapExactOutputMultihop(daiAmountOut, wethAmountInMax)

        console.log("DAI balance", await dai.balanceOf(accounts[0].address))
    })
})