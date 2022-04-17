import fetch from "node-fetch";
import Command from "../utils/command.js";

class CryptoCommand extends Command {
  constructor() {
    super();
    this.coins = [
      { id: "binancecoin", name: "BNB" },
      { id: "bomber-coin", name: "BCOIN" },
      { id: "smooth-love-potion", name: "SLP" },
      { id: "plant-vs-undead-token", name: "PVU" },
    ];
  }

  async fetchCryptoData(id, currency) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`,
      {
        method: "get",
        headers: { accept: "application/json" },
      }
    );
    return await response.json();
  }

  async concatenateData(array, currency) {
    let output = "";
    for (let i = 0; i < array.length; i++) {
      const value = array[i][this.coins[i]["id"]][currency]
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      output += `**${
        this.coins[i].name
      }:** \`${value} ${currency.toUpperCase()}\`\n`;
    }
    return output;
  }

  async sendCryptoData(object, message, args) {
    try {
      const cryptoData = [];
      const currency = args.length ? args[0] : "php";
      for (let coin of object.coins)
        cryptoData.push(await object.fetchCryptoData(coin.id, currency));

      const description = await object.concatenateData(cryptoData, currency);
      const embedOutput = new object.MessageEmbed()
        .setColor(object.mainColor)
        .setTitle("Cryptocurrency Values")
        .setDescription(description)
        .setFooter({ text: "Data fetched from CoinGecko" });
      message.channel.send({ embeds: [embedOutput] });
    } catch (error) {
      message.channel.send("Unsupported Command Arguments");
    }
  }
}

export default CryptoCommand;
