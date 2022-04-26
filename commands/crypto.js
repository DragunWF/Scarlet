import fetch from "node-fetch";
import Command from "../utils/command.js";

class CryptoCommand extends Command {
  #coins;

  constructor() {
    super();
    this.#coins = [
      { id: "binancecoin", name: "BNB" },
      { id: "bomber-coin", name: "BCOIN" },
      { id: "smooth-love-potion", name: "SLP" },
      { id: "plant-vs-undead-token", name: "PVU" },
    ];
  }

  async executeCommand(message, args) {
    try {
      const cryptoData = [];
      const currency = args.length ? args[0] : "php";
      for (let coin of this.#coins)
        cryptoData.push(await this.#fetchCryptoData(coin.id, currency));

      const description = await this.#concatenateData(cryptoData, currency);
      const embed = new this.MessageEmbed()
        .setColor(this.mainColor)
        .setTitle("Cryptocurrency Values")
        .setDescription(description)
        .setFooter({ text: "Data fetched from CoinGecko" });
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      message.channel.send("Unsupported Command Arguments");
    }
  }

  async #fetchCryptoData(id, currency) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`,
      {
        method: "get",
        headers: { accept: "application/json" },
      }
    );
    return await response.json();
  }

  async #concatenateData(array, currency) {
    let output = "";
    for (let i = 0; i < array.length; i++) {
      const value = array[i][this.#coins[i]["id"]][currency]
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      output += `**${
        this.#coins[i].name
      }:** \`${value} ${currency.toUpperCase()}\`\n`;
    }
    return output;
  }
}

export default CryptoCommand;
